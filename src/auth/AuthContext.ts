import { createContext } from "react";
import type { User } from "../types";

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
