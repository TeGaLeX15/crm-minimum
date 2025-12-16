export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won';

export interface User {
  email: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  value?: number;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  leadId: string;
  title: string;
  datetime: string;
  notes?: string;
  completed: boolean;
}

export type ActivityType = 'created' | 'updated' | 'moved' | 'deleted';

export interface Activity {
  id: string;
  type: ActivityType;
  leadId: string;
  leadName: string;
  description?: string;
  timestamp: string;
}
