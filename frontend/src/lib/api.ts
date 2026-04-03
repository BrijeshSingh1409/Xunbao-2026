const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Request failed");
  }

  return res.json();
}

export const api = {
  signUp: (body: unknown) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  verifyOtp: (body: unknown) =>
    request<{ token: string; email: string; username: string }>("/auth/verify", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  signIn: (body: unknown) =>
    request<{ token: string; email: string; username: string }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  quizStatus: (token: string) =>
    request<{ completed: boolean; answeredCount: number }>("/quiz/status", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  nextQuestion: (token: string) =>
    request<{ question: import("../types").Question | null; completed: boolean }>("/quiz/next", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  submitAnswer: (token: string, body: unknown) =>
    request<{ completed: boolean }>("/quiz/answer", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    }),

  leaderboard: () =>
    request<{ items: import("../types").LeaderboardItem[] }>("/leaderboard/live"),
};
