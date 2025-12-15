import { useState } from 'react';
import type { Reminder } from '../types';

export function useReminders() {
  // сразу читаем из localStorage при инициализации
  const stored = localStorage.getItem('crm_reminders');
  const initialReminders: Reminder[] = stored ? JSON.parse(stored) : [];

  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const saveReminders = (newReminders: Reminder[]) => {
    setReminders(newReminders);
    localStorage.setItem('crm_reminders', JSON.stringify(newReminders));
  };

  const addReminder = (reminderData: Omit<Reminder, 'id' | 'completed'>) => {
    const newReminder: Reminder = {
      ...reminderData,
      id: Date.now().toString(),
      completed: false,
    };
    saveReminders([...reminders, newReminder]);
  };

  const markReminderComplete = (id: string) => {
    const newReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    );
    saveReminders(newReminders);
  };

  return { reminders, addReminder, markReminderComplete };
}
