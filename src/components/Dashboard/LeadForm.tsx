import { useState } from 'react';
import { X } from 'lucide-react';
import type { Lead, LeadStatus } from '../../types';

interface LeadFormProps {
  lead?: Lead | null;
  onSave: (data: Partial<Lead>) => void;
  onClose: () => void;
}

export function LeadForm({ lead, onSave, onClose }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: lead?.name || '',
    email: lead?.email || '',
    phone: lead?.phone || '',
    company: lead?.company || '',
    value: lead?.value || '',
    status: lead?.status || 'new' as LeadStatus,
    notes: lead?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      value: formData.value ? Number(formData.value) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <h2>{lead ? 'Редактировать лид' : 'Новый лид'}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block mb-2 text-neutral-600">
                Имя *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-600">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-600">
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="+7 (999) 123-45-67"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-600">
                Компания
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="ООО «Компания»"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-600">
                Сумма сделки (₽)
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="100000"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-neutral-600">
                Статус
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
              >
                <option value="new">Новый</option>
                <option value="contacted">Контакт</option>
                <option value="qualified">Квалификация</option>
                <option value="proposal">Предложение</option>
                <option value="won">Закрыто</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-neutral-600">
                Заметки
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 min-h-25"
                placeholder="Дополнительная информация..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 text-white py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--theme-primary, #171717)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary-dark, #0a0a0a)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary, #171717)';
              }}
            >
              {lead ? 'Сохранить' : 'Создать'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}