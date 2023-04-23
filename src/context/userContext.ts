import { createContext } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isAuth: boolean;
}

export const UserContext = createContext<User | null>(null);
