import { createContext } from 'react'

interface User {
  email: string
}

export interface AuthContextType {
  user: User | null
  isAuth: boolean
  login: (email: string, password: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
