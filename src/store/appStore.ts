import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  user_name: string;
}

interface AuthState {
  currentUser: User | null;
  login: (id: string, email: string, user_name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      login: (id, email, user_name) => set({ currentUser: { id, email, user_name } }),
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "auth-store",
    }
  )
);
