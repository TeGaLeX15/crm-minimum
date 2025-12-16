// src/theme/ThemeContext.ts
import { createContext } from 'react';
import { type Theme } from './themes';

export interface ThemeContextType {
  currentTheme: Theme;
  changeTheme: (id: string) => void;
  themes: Theme[];
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
