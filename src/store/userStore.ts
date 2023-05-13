import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  userId: number;
  name: string;
  email: string;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

interface IUserStoreState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<IUserStoreState>(
    (set) => ({
      user: null,
      setUser: (newUser: IUser) => {
        set({ user: newUser });
      },
      clearUser: () => {
        set({ user: null });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
