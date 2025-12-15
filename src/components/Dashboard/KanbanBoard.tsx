import { KanbanColumn } from './KanbanColumn';
import type { Lead, LeadStatus } from '../../types';

interface KanbanBoardProps {
  leads: Lead[];
  onMoveLead: (leadId: string, newStatus: LeadStatus) => void;
  onEditLead: (lead: Lead) => void;
}

const COLUMNS: { status: LeadStatus; title: string }[] = [
  { status: 'new', title: 'Новые' },
  { status: 'contacted', title: 'Контакт' },
  { status: 'qualified', title: 'Квалификация' },
  { status: 'proposal', title: 'Предложение' },
  { status: 'won', title: 'Закрыто' },
];

export function KanbanBoard({ leads, onMoveLead, onEditLead }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {COLUMNS.map((column) => {
        const columnLeads = leads.filter((lead) => lead.status === column.status);
        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            leads={columnLeads}
            onMoveLead={onMoveLead}
            onEditLead={onEditLead}
          />
        );
      })}
    </div>
  );
}
