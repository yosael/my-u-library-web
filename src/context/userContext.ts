import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isAuth: boolean;
};

export type UserContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
    isAuth: true,
  },
  login: async (username: string, password: string) => {},
  logout: () => {},
});
