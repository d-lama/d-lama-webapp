import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  UserId: number;
  name: string;
  email: string;
  IsAdmin: boolean;
  isAuthenticated: boolean;
}

interface IUserStoreState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

const clearData = {
  UserId: 0,
  name: "",
  email: "",
  IsAdmin: false,
  isAuthenticated: false,
};

export const useUserStore = create(
  persist<IUserStoreState>(
    (set) => ({
      user: clearData,
      setUser: (newUser: IUser) => {
        set({
          user: newUser,
        });
      },
      clearUser: () => {
        set({ user: clearData });
      },
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
