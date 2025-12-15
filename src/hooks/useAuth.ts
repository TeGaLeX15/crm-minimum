import { useState } from 'react';

interface User {
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('crm_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    const mockUser = { email };
    console.log(password); // УДАЛИТЬ
    setUser(mockUser);
    localStorage.setItem('crm_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
  };

  return { user, login, logout };
}
