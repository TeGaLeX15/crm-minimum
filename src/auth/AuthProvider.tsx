import { useState } from 'react'
import { AuthContext, type AuthContextType } from './AuthContext'
import type { User } from '../types'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('crm_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      localStorage.removeItem('crm_user')
      return null
    }
  })

  const login = (email: string) => {
    const user = { email }
    setUser(user)
    localStorage.setItem('crm_user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('crm_user')
  }

  const value: AuthContextType = {
    user,
    isAuth: Boolean(user),
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext }

