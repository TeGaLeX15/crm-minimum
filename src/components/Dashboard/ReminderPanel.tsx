import { useState } from "react";
import { X, Plus, Check } from "lucide-react";
import type { Reminder, Lead } from "../../types";

interface ReminderPanelProps {
  reminders: Reminder[];
  leads: Lead[];
  onClose: () => void;
  onAddReminder: (reminder: Omit<Reminder, "id" | "completed">) => void;
  onMarkComplete: (id: string) => void;
}

export function ReminderPanel({
  reminders,
  leads,
  onClose,
  onAddReminder,
  onMarkComplete,
}: ReminderPanelProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leadId: "",
    title: "",
    datetime: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReminder(formData);
    setFormData({ leadId: "", title: "", datetime: "", notes: "" });
    setShowForm(false);
  };

  const getLeadName = (leadId: string) => {
    return leads.find((l) => l.id === leadId)?.name || "Неизвестный лид";
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
  });

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-neutral-200 shadow-lg z-50 flex flex-col">
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
        <h2>Напоминания</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {sortedReminders.map((reminder) => (
          <div
            key={reminder.id}
            className={`p-4 border rounded-lg ${
              reminder.completed
                ? "bg-neutral-50 border-neutral-200"
                : "bg-white border-neutral-300"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onMarkComplete(reminder.id)}
                className={`mt-1 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  reminder.completed
                    ? "bg-neutral-900 border-neutral-900"
                    : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                {reminder.completed && <Check className="w-3 h-3 text-white" />}
              </button>

              <div className="flex-1 min-w-0">
                <h4
                  className={
                    reminder.completed ? "line-through text-neutral-400" : ""
                  }
                >
                  {reminder.title}
                </h4>
                <p className="text-neutral-500 mt-1">
                  {getLeadName(reminder.leadId)}
                </p>
                <p className="text-neutral-400 mt-1">
                  {new Date(reminder.datetime).toLocaleString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {reminder.notes && (
                  <p className="text-neutral-600 mt-2">{reminder.notes}</p>
                )}
              </div>
            </div>
          </div>
        ))}

        {reminders.length === 0 && (
          <p className="text-center text-neutral-400 py-8">Нет напоминаний</p>
        )}
      </div>

      <div className="p-6 border-t border-neutral-200">
        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <select
              value={formData.leadId}
              onChange={(e) =>
                setFormData({ ...formData, leadId: e.target.value })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              required
            >
              <option value="">Выберите лид</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              placeholder="Название"
              required
            />

            <input
              type="datetime-local"
              value={formData.datetime}
              onChange={(e) =>
                setFormData({ ...formData, datetime: e.target.value })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              required
            />

            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              placeholder="Заметки (опционально)"
              rows={2}
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 text-white py-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--theme-primary, #171717)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--theme-primary-dark, #0a0a0a)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--theme-primary, #171717)";
                }}
              >
                Создать
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full flex items-center justify-center gap-2 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Добавить напоминание
          </button>
        )}
      </div>
    </div>
  );
}
