import { create } from "zustand";
import { authClient } from "../lib/auth-client";
import { api } from "../lib/api";

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  username?: string;
  college?: string;
};

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
  user: SessionUser | null;
  pendingEmail: string;
  loading: boolean;
  initialized: boolean;
  initSession: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  pendingEmail: "",
  loading: false,
  initialized: false,

  initSession: async () => {
    try {
      const data = await api.me();
      set({
        user: data.session?.user ?? null,
        initialized: true,
      });
    } catch {
      set({
        user: null,
        initialized: true,
      });
    }
  },

  signUp: async (payload) => {
    set({ loading: true });
    try {
      await authClient.signUp.email({
        email: payload.email,
        password: payload.password,
        name: payload.username,
        username: payload.username,
        universityRollNo: payload.universityRollNo,
        college: payload.college,
        branch: payload.branch,
        mobileNumber: payload.mobileNumber,
      } as never);

      await authClient.emailOtp.sendVerificationOtp({
        email: payload.email,
        type: "email-verification",
      });

      set({ pendingEmail: payload.email });
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      await authClient.signIn.email({
        email,
        password,
      });

      const data = await api.me();
      set({ user: data.session?.user ?? null });
    } finally {
      set({ loading: false });
    }
  },

  verifyOtp: async (otp) => {
    set({ loading: true });
    try {
      const email = get().pendingEmail;

      await authClient.emailOtp.verifyEmail({
        email,
        otp,
      });

      set({ pendingEmail: "" });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    await authClient.signOut();
    set({ user: null, pendingEmail: "" });
  },
}));
