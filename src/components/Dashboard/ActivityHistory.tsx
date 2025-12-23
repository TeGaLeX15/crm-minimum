import { X, Plus, Edit2, ArrowRight, Trash2 } from "lucide-react";
import type { Activity } from "../../types";

interface ActivityHistoryProps {
  activities: Activity[];
  onClose: () => void;
}

const ACTIVITY_ICONS = {
  created: Plus,
  updated: Edit2,
  moved: ArrowRight,
  deleted: Trash2,
};

const ACTIVITY_LABELS = {
  created: "Создан",
  updated: "Обновлен",
  moved: "Перемещен",
  deleted: "Удален",
};

export function ActivityHistory({ activities, onClose }: ActivityHistoryProps) {
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-neutral-200 shadow-lg z-50 flex flex-col">
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
        <h2>История действий</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {sortedActivities.map((activity) => {
            const Icon = ACTIVITY_ICONS[activity.type];
            return (
              <div key={activity.id} className="flex gap-3">
                <div className="shrink-0 w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-neutral-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-neutral-900">
                      {activity.leadName}
                    </span>
                    <span className="text-neutral-500">
                      {ACTIVITY_LABELS[activity.type]}
                    </span>
                  </div>

                  {activity.description && (
                    <p className="text-neutral-600 mt-1">
                      {activity.description}
                    </p>
                  )}

                  <p className="text-neutral-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}

          {activities.length === 0 && (
            <p className="text-center text-neutral-400 py-8">Нет записей</p>
          )}
        </div>
      </div>
    </div>
  );
}
