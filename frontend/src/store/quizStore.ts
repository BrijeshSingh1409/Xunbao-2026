import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";
import type { Question } from "../types";

type QuizState = {
  currentQuestion: Question | null;
  selectedOption: string;
  questionIndex: number;
  quizCompleted: boolean;
  loading: boolean;
  setSelectedOption: (value: string) => void;
  fetchNextQuestion: (token: string) => Promise<boolean>;
  submitCurrentAnswer: (token: string) => Promise<boolean>;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get, store) => ({
      currentQuestion: null,
      selectedOption: "",
      questionIndex: 0,
      quizCompleted: false,
      loading: false,

      setSelectedOption: (value) => set({ selectedOption: value }),

      fetchNextQuestion: async (token) => {
        if (get().quizCompleted) return true;

        set({ loading: true, selectedOption: "" });
        try {
          const data = await api.nextQuestion(token);

          if (data.completed || !data.question) {
            set({ quizCompleted: true, currentQuestion: null });
            return true;
          }

          set({ currentQuestion: data.question });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      submitCurrentAnswer: async (token) => {
        const { currentQuestion, selectedOption, questionIndex } = get();

        if (!currentQuestion) return true;

        set({ loading: true });
        try {
          const data = await api.submitAnswer(token, {
            questionId: currentQuestion.id,
            selectedOption,
          });

          const nextIndex = questionIndex + 1;
          const completed = data.completed || nextIndex >= 15;

          set({
            questionIndex: nextIndex,
            selectedOption: "",
            quizCompleted: completed,
            currentQuestion: completed ? null : currentQuestion,
          });

          return completed;
        } finally {
          set({ loading: false });
        }
      },

      resetQuiz: () => set(store.getInitialState()),
    }),
    {
      name: "xunbao-quiz",
      partialize: (state) => ({
        questionIndex: state.questionIndex,
        quizCompleted: state.quizCompleted,
      }),
    }
  )
);
