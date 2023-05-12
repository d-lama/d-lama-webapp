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

const clearData = {
  UserId: 0,
  name: "",
  email: "",
  jti: "",
  IsAdmin: false,
  nbf: 0,
  exp: 0,
  iat: 0,
  iss: "",
  aud: "",
};

export const useAuthStore = create(
  persist<IAuthStoreState>(
    (set) => ({
      token: "",
      decodedData: clearData,
      setToken: (newToken: string) => {
        set({
          token: newToken,
          decodedData: decodeJwt(newToken) as unknown as IJwtData,
        });
      },
      clearToken: () => {
        set({ token: "", decodedData: clearData });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
