import { useState } from "react";
import type { Activity } from "../types";

export function useActivity() {
  const stored = localStorage.getItem("crm_activities");
  const initialActivities: Activity[] = stored ? JSON.parse(stored) : [];

  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const saveActivities = (newActivities: Activity[]) => {
    setActivities(newActivities);
    localStorage.setItem("crm_activities", JSON.stringify(newActivities));
  };

  const addActivity = (activityData: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    saveActivities([newActivity, ...activities]);
  };

  return { activities, addActivity };
}
