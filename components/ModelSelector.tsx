'use client';

import { MODELS } from '@/lib/models';

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function ModelSelector({ value, onChange, label }: ModelSelectorProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">選擇模型 / Select Model</option>
        {MODELS.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name} - {model.description}
          </option>
        ))}
      </select>
    </div>
  );
}
