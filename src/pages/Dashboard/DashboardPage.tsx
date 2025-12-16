// src/pages/Dashboard/DashboardPage.tsx
import { useState } from 'react';
import { KanbanBoard } from '../../components/Dashboard/KanbanBoard';
import { LeadForm } from '../../components/Dashboard/LeadForm';
import { ReminderPanel } from '../../components/Dashboard/ReminderPanel';
import { ActivityHistory } from '../../components/Dashboard/ActivityHistory';
import { Header } from '../../components/Dashboard/Header';
import { ThemeSelector } from '../../components/Dashboard/ThemeSelector';
import { useAuth } from '../../auth/useAuth';
import { useLeads } from '../../hooks/useLeads';
import { useReminders } from '../../hooks/useReminders';
import { useActivity } from '../../hooks/useActivity';
import { useTheme } from '../../theme/useTheme';
import type { Lead } from '../../types';

export default function DashboardPage() {
  const { user, logout } = useAuth(); // <- исправлено
  const { leads, addLead, updateLead, moveLead } = useLeads();
  const { reminders, addReminder, markReminderComplete } = useReminders();
  const { activities } = useActivity();
  const { currentTheme, changeTheme, themes } = useTheme();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [showReminders, setShowReminders] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  const handleSaveLead = (leadData: Partial<Lead>) => {
    if (editingLead) {
      updateLead(editingLead.id, leadData);
    } else {
      addLead(leadData);
    }
    setIsFormOpen(false);
    setEditingLead(null);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header
        user={user ?? { email: '' }}
        onLogout={logout}
        onNewLead={() => setIsFormOpen(true)}
        onShowReminders={() => setShowReminders(!showReminders)}
        onShowHistory={() => setShowHistory(!showHistory)}
        onShowThemes={() => setShowThemes(true)}
        reminderCount={reminders.filter(r => !r.completed).length}
      />

      <main className="px-8 py-6">
        <KanbanBoard
          leads={leads}
          onMoveLead={moveLead}
          onEditLead={handleEditLead}
        />
      </main>

      {isFormOpen && (
        <LeadForm
          lead={editingLead}
          onSave={handleSaveLead}
          onClose={() => {
            setIsFormOpen(false);
            setEditingLead(null);
          }}
        />
      )}

      {showReminders && (
        <ReminderPanel
          reminders={reminders}
          leads={leads}
          onClose={() => setShowReminders(false)}
          onAddReminder={addReminder}
          onMarkComplete={markReminderComplete}
        />
      )}

      {showHistory && (
        <ActivityHistory
          activities={activities}
          onClose={() => setShowHistory(false)}
        />
      )}

      {showThemes && (
        <ThemeSelector
          themes={themes}
          currentTheme={currentTheme}
          onSelectTheme={changeTheme}
          onClose={() => setShowThemes(false)}
        />
      )}
    </div>
  );
}
