import { useState } from "react";
import type { Lead, LeadStatus } from "../types";
import { useActivity } from "./useActivity";

const INITIAL_LEADS: Lead[] = [
  {
    id: "1",
    name: "Александр Петров",
    email: "a.petrov@example.com",
    phone: "+7 (999) 123-45-67",
    company: "ООО «Технологии»",
    value: 150000,
    status: "new",
    notes: "Интересуется корпоративным решением",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Мария Смирнова",
    email: "m.smirnova@example.com",
    company: "ИП Смирнова",
    value: 75000,
    status: "contacted",
    notes: "Назначена встреча на следующей неделе",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Дмитрий Козлов",
    email: "d.kozlov@example.com",
    phone: "+7 (999) 765-43-21",
    company: "АО «Инновации»",
    value: 300000,
    status: "qualified",
    notes: "Готов к обсуждению условий",
    createdAt: new Date().toISOString(),
  },
];

export function useLeads() {
  const { addActivity } = useActivity();

  // сразу инициализируем из localStorage
  const stored = localStorage.getItem("crm_leads");
  const initialLeads: Lead[] = stored ? JSON.parse(stored) : INITIAL_LEADS;

  if (!stored) {
    localStorage.setItem("crm_leads", JSON.stringify(INITIAL_LEADS));
  }

  const [leads, setLeads] = useState<Lead[]>(initialLeads);

  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    localStorage.setItem("crm_leads", JSON.stringify(newLeads));
  };

  const addLead = (leadData: Partial<Lead>) => {
    const newLead: Lead = {
      id: Date.now().toString(),
      name: leadData.name || "",
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      value: leadData.value,
      status: leadData.status || "new",
      notes: leadData.notes,
      createdAt: new Date().toISOString(),
    };
    const newLeads = [...leads, newLead];
    saveLeads(newLeads);
    addActivity({
      type: "created",
      leadId: newLead.id,
      leadName: newLead.name,
      description: `Новый лид добавлен в систему`,
    });
  };

  const updateLead = (id: string, leadData: Partial<Lead>) => {
    const newLeads = leads.map((lead) =>
      lead.id === id ? { ...lead, ...leadData } : lead
    );
    saveLeads(newLeads);
    const lead = newLeads.find((l) => l.id === id);
    if (lead) {
      addActivity({
        type: "updated",
        leadId: id,
        leadName: lead.name,
        description: "Информация обновлена",
      });
    }
  };

  const moveLead = (id: string, newStatus: LeadStatus) => {
    const lead = leads.find((l) => l.id === id);
    if (lead && lead.status !== newStatus) {
      const newLeads = leads.map((l) =>
        l.id === id ? { ...l, status: newStatus } : l
      );
      saveLeads(newLeads);
      addActivity({
        type: "moved",
        leadId: id,
        leadName: lead.name,
        description: `Статус изменен на "${getStatusLabel(newStatus)}"`,
      });
    }
  };

  return { leads, addLead, updateLead, moveLead };
}

function getStatusLabel(status: LeadStatus): string {
  const labels = {
    new: "Новые",
    contacted: "Контакт",
    qualified: "Квалификация",
    proposal: "Предложение",
    won: "Закрыто",
  };
  return labels[status];
}
