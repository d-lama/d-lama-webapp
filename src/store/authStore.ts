import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IAuthStoreState {
  token: string;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create(
  persist<IAuthStoreState>(
    (set) => ({
      token: "",
      setToken: (newToken: string) => {
        set({ token: newToken });
      },
      clearToken: () => {
        set({ token: "" });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
