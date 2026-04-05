import { create } from "zustand";
import { api } from "../lib/api";
import type { Question } from "../types";

type QuizState = {
  currentQuestion: Question | null;
  selectedOption: string;
  questionNumber: number;
  expiresAt: string | null;
  openedAt: string | null;
  answeredCount: number;
  quizCompleted: boolean;
  loading: boolean;
  setSelectedOption: (value: string) => void;
  fetchStatus: () => Promise<void>;
  fetchNextQuestion: () => Promise<boolean>;
  submitCurrentAnswer: () => Promise<boolean>;
  resetQuiz: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: null,
  selectedOption: "",
  questionNumber: 1,
  expiresAt: null,
  openedAt: null,
  answeredCount: 0,
  quizCompleted: false,
  loading: false,

  setSelectedOption: (value) => set({ selectedOption: value }),

  fetchStatus: async () => {
    const data = await api.quizStatus();
    set({
      answeredCount: data.answeredCount,
      quizCompleted: data.completed,
      expiresAt: data.currentQuestionExpiresAt,
    });
  },

  fetchNextQuestion: async () => {
    set({ loading: true, selectedOption: "" });
    try {
      const data = await api.nextQuestion();

      if (data.completed || !data.question) {
        set({
          currentQuestion: null,
          quizCompleted: true,
          expiresAt: null,
          openedAt: null,
        });
        return true;
      }

      set({
        currentQuestion: data.question,
        questionNumber: data.questionNumber ?? 1,
        expiresAt: data.expiresAt ?? null,
        openedAt: data.openedAt ?? null,
        quizCompleted: false,
      });

      return false;
    } finally {
      set({ loading: false });
    }
  },

  submitCurrentAnswer: async () => {
    const selectedOption = get().selectedOption || null;
    set({ loading: true });

    try {
      const data = await api.submitAnswer(selectedOption);

      const nextAnsweredCount = get().answeredCount + 1;

      set({
        selectedOption: "",
        answeredCount: nextAnsweredCount,
        quizCompleted: data.completed,
      });

      return data.completed;
    } finally {
      set({ loading: false });
    }
  },

  resetQuiz: () =>
    set({
      currentQuestion: null,
      selectedOption: "",
      questionNumber: 1,
      expiresAt: null,
      openedAt: null,
      answeredCount: 0,
      quizCompleted: false,
      loading: false,
    }),
}));
