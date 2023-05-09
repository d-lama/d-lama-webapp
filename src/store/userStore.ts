import { decodeJwt } from "jose";
import { create } from "zustand";

interface IUserData {
  UserId: number;
  name: string;
  email: string;
  jti: string;
  IsAdmin: boolean;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

interface IUserStoreState {
  user: IUserData | null;
  token: string;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

export const useUserStore = create<IUserStoreState>((set) => ({
  token: "",
  user: null,
  setToken: (newToken: string) => {
    set((state) => ({
      ...state,
      token: newToken,
      user: decodeJwt(newToken) as unknown as IUserData,
    }));
  },
  clearToken: () => {
    set({ token: "", user: null });
  },
}));
