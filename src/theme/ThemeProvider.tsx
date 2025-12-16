// src/theme/ThemeProvider.tsx
import { useState, useEffect, type ReactNode, type FC } from 'react';
import { ThemeContext } from './ThemeContext';
import { type Theme, THEMES } from './themes';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const storedThemeId = localStorage.getItem('crm_theme');
  const initialTheme: Theme = THEMES.find(t => t.id === storedThemeId) ?? THEMES[0];

  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    const { primary, primaryLight, primaryDark, accent } = currentTheme.colors;

    root.style.setProperty('--theme-primary', primary);
    root.style.setProperty('--theme-primary-light', primaryLight);
    root.style.setProperty('--theme-primary-dark', primaryDark);
    root.style.setProperty('--theme-accent', accent);

    localStorage.setItem('crm_theme', currentTheme.id);
  }, [currentTheme]);

  const changeTheme = (id: string): void => {
    const theme = THEMES.find(t => t.id === id);
    if (theme) setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
