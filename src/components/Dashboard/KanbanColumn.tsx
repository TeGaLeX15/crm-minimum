import { LeadCard } from "./LeadCard";
import type { Lead, LeadStatus } from "../../types";

interface KanbanColumnProps {
  title: string;
  status: LeadStatus;
  leads: Lead[];
  onMoveLead: (leadId: string, newStatus: LeadStatus) => void;
  onEditLead: (lead: Lead) => void;
}

export function KanbanColumn({
  title,
  status,
  leads,
  onMoveLead,
  onEditLead,
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    if (leadId) {
      onMoveLead(leadId, status);
    }
  };

  return (
    <div
      className="shrink-0 w-80 bg-neutral-100 rounded-lg p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neutral-600">{title}</h3>
        <span className="px-2 py-1 bg-white rounded text-neutral-500">
          {leads.length}
        </span>
      </div>

      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onEdit={onEditLead} />
        ))}
      </div>
    </div>
  );
}
