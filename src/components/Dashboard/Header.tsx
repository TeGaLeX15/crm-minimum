import { Plus, Bell, Clock, LogOut, Palette } from 'lucide-react';

interface HeaderProps {
  user: { email: string };
  onLogout: () => void;
  onNewLead: () => void;
  onShowReminders: () => void;
  onShowHistory: () => void;
  onShowThemes: () => void;
  reminderCount: number;
}

export function Header({
  user,
  onLogout,
  onNewLead,
  onShowReminders,
  onShowHistory,
  onShowThemes,
  reminderCount,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="px-8 py-4 flex items-center justify-between">
        <h1>CRM Лиды</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={onNewLead}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--theme-primary, #171717)', color: '#ffffff' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-primary-dark, #0a0a0a)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--theme-primary, #171717)';
            }}
          >
            <Plus className="w-4 h-4" />
            Новый лид
          </button>

          <button
            onClick={onShowReminders}
            className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {reminderCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {reminderCount}
              </span>
            )}
          </button>

          <button
            onClick={onShowHistory}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Clock className="w-5 h-5" />
          </button>

          <button
            onClick={onShowThemes}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Palette className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-neutral-200" />

          <div className="flex items-center gap-3">
            <span className="text-neutral-600">{user.email}</span>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}