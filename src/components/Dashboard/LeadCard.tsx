import { Mail, Phone, Building2, DollarSign } from "lucide-react";
import type { Lead } from "../../types";

interface LeadCardProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
}

export function LeadCard({ lead, onEdit }: LeadCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("leadId", lead.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onEdit(lead)}
      className="bg-white rounded-lg p-4 border border-neutral-200 cursor-pointer hover:border-neutral-300 transition-colors"
    >
      <div className="mb-3">
        <h4>{lead.name}</h4>
      </div>

      <div className="space-y-2">
        {lead.company && (
          <div className="flex items-center gap-2 text-neutral-600">
            <Building2 className="w-4 h-4" />
            <span>{lead.company}</span>
          </div>
        )}

        {lead.email && (
          <div className="flex items-center gap-2 text-neutral-600">
            <Mail className="w-4 h-4" />
            <span className="truncate">{lead.email}</span>
          </div>
        )}

        {lead.phone && (
          <div className="flex items-center gap-2 text-neutral-600">
            <Phone className="w-4 h-4" />
            <span>{lead.phone}</span>
          </div>
        )}

        {lead.value && (
          <div className="flex items-center gap-2 text-neutral-900">
            <DollarSign className="w-4 h-4" />
            <span>{lead.value.toLocaleString()} ₽</span>
          </div>
        )}
      </div>
    </div>
  );
}
