import { decodeJwt } from "jose";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IJwtData {
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

interface IAuthStoreState {
  token: string;
  decodedData: IJwtData | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create(
  persist<IAuthStoreState>(
    (set) => ({
      token: "",
      decodedData: null,
      setToken: (newToken: string) => {
        set({
          token: newToken,
          decodedData: decodeJwt(newToken) as unknown as IJwtData,
        });
      },
      clearToken: () => {
        set({ token: "", decodedData: null });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
