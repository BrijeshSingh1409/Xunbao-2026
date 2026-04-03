import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../lib/api";
import type { User } from "../types";

type SignUpPayload = {
  email: string;
  password: string;
  username: string;
  universityRollNo: string;
  college: string;
  branch: string;
  mobileNumber: string;
};

type AuthState = {
  user: User | null;
  pendingEmail: string;
  loading: boolean;
  setPendingEmail: (email: string) => void;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      pendingEmail: "",
      loading: false,

      setPendingEmail: (email) => set({ pendingEmail: email }),

      signUp: async (payload) => {
        set({ loading: true });
        try {
          await api.signUp(payload);
          set({ pendingEmail: payload.email });
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email, password) => {
        set({ loading: true });
        try {
          const data = await api.signIn({ email, password });
          set({ user: data });
        } finally {
          set({ loading: false });
        }
      },

      verifyOtp: async (otp) => {
        const email = get().pendingEmail;
        set({ loading: true });
        try {
          const data = await api.verifyOtp({ email, otp });
          set({ user: data, pendingEmail: "" });
        } finally {
          set({ loading: false });
        }
      },

      logout: () => set({ user: null, pendingEmail: "" }),
    }),
    { name: "xunbao-auth" }
  )
);
