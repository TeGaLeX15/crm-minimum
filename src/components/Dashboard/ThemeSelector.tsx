import { X, Check } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';

interface ThemeSelectorProps {
  themes: Theme[];
  currentTheme: Theme;
  onSelectTheme: (themeId: string) => void;
  onClose: () => void;
}

export function ThemeSelector({
  themes,
  currentTheme,
  onSelectTheme,
  onClose,
}: ThemeSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <h2>Выбор темы</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className="relative group"
              >
                <div className="aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: currentTheme.id === theme.id ? theme.colors.primary : 'transparent',
                  }}
                >
                  <div className="grid grid-cols-2 h-full">
                    <div style={{ backgroundColor: theme.colors.primary }} />
                    <div style={{ backgroundColor: theme.colors.primaryLight }} />
                    <div style={{ backgroundColor: theme.colors.primaryDark }} />
                    <div style={{ backgroundColor: theme.colors.accent }} />
                  </div>
                  
                  {currentTheme.id === theme.id && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5" style={{ color: theme.colors.primary }} />
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="mt-2 text-center text-neutral-700">{theme.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
