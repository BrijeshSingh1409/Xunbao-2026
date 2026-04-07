import { create } from "zustand";
import { authClient } from "../lib/auth-client";
import { api } from "../lib/api";

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  universityRollNo?: string;
  college?: string;
  branch?: string;
  mobileNumber?: string;
};

type CompleteProfilePayload = {
  universityRollNo: string;
  college: string;
  branch: string;
  mobileNumber: string;
};

type AuthState = {
  user: SessionUser | null;
  loading: boolean;
  initialized: boolean;
  profileCompleted: boolean;
  initSession: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  completeProfile: (payload: CompleteProfilePayload) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  initialized: false,
  profileCompleted: false,

  initSession: async () => {
    try {
      const data = await api.me();
      set({
        user: data.session?.user ?? null,
        initialized: true,
        profileCompleted: data.profileCompleted,
      });
    } catch {
      set({
        user: null,
        initialized: true,
        profileCompleted: false,
      });
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true });
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/start`,
      });
    } finally {
      set({ loading: false });
    }
  },

  completeProfile: async (payload) => {
    set({ loading: true });
    try {
      await api.completeProfile(payload);
      const data = await api.me();
      set({
        user: data.session?.user ?? null,
        profileCompleted: data.profileCompleted,
      });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    await authClient.signOut();
    set({
      user: null,
      profileCompleted: false,
    });
  },

  logout: () => {
    set({
      user: null,
      profileCompleted: false,
    });
  },
}));
