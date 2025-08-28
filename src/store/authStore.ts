import { create } from "zustand";
import { IUserProfile } from "@/types/interfaces";

interface AuthState {
  user: IUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: IUserProfile | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  loadUserProfile: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),

  loadUserProfile: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await fetch("/perfil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const apiResponse = await response.json();

        if (apiResponse.status === "success" && apiResponse.data) {
          const userProfile = apiResponse.data;

          set({
            user: userProfile,
            isAuthenticated: true,
          });
        } else {
          get().logout();
        }
      } else {
        get().logout();
      }
    } catch (error) {
      get().logout();
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuthStatus: async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      await get().loadUserProfile();
    } else {
      set({ isAuthenticated: false, user: null });
    }
  },
}));
