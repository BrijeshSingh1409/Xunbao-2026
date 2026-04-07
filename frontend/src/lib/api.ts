import type { LeaderboardItem, Question } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}

export const api = {
  me: () =>
    request<{
      authenticated: boolean;
      session: {
        user: {
          id: string;
          email: string;
          name?: string;
          universityRollNo?: string;
          college?: string;
          branch?: string;
          mobileNumber?: string;
        };
      } | null;
      profileCompleted: boolean;
    }>("/me"),

  completeProfile: (body: {
    universityRollNo: string;
    college: string;
    branch: string;
    mobileNumber: string;
  }) =>
    request<{ success: true }>("/profile/complete", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  quizStatus: () =>
    request<{
      completed: boolean;
      answeredCount: number;
      currentQuestionId: string | null;
      currentQuestionExpiresAt: string | null;
    }>("/quiz/status"),

  nextQuestion: () =>
    request<{
      completed: boolean;
      question: Question | null;
      openedAt?: string | null;
      expiresAt?: string | null;
      questionNumber?: number;
    }>("/quiz/next"),

  submitAnswer: (selectedOption: string | null) =>
    request<{ completed: boolean }>("/quiz/answer", {
      method: "POST",
      body: JSON.stringify({ selectedOption }),
    }),

  leaderboard: () => request<{ items: LeaderboardItem[] }>("/leaderboard/live"),
};
