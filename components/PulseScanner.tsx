import React, { useState } from 'react';
import { PulseData } from '../types';
import { Activity, Battery, BookOpen, Target } from 'lucide-react';

interface PulseScannerProps {
  onSubmit: (data: PulseData) => void;
  onCancel: () => void;
}

export const PulseScanner: React.FC<PulseScannerProps> = ({ onSubmit, onCancel }) => {
  const [data, setData] = useState<PulseData>({
    energy: 5,
    workload: 5,
    purpose: 5,
    learning: 5,
  });

  const handleChange = (key: keyof PulseData, value: number) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const renderSlider = (
    key: keyof PulseData, 
    label: string, 
    icon: React.ReactNode, 
    minLabel: string, 
    maxLabel: string
  ) => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center gap-2 text-sm font-medium text-text">
          {icon}
          {label}
        </label>
        <span className="text-primary font-mono font-bold">{data[key]}</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={data[key]}
        onChange={(e) => handleChange(key, parseInt(e.target.value))}
        className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary hover:accent-violet-400 transition-all"
      />
      <div className="flex justify-between text-xs text-muted mt-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-surface/50 border border-white/10 p-6 rounded-xl backdrop-blur-md shadow-2xl max-w-md w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        <Activity className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-bold text-white tracking-tight">Dynamic Pulse Scan</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderSlider('energy', 'Energy Level', <Battery className="w-4 h-4"/>, 'Drained', 'Charged')}
        {renderSlider('workload', 'Current Workload', <Activity className="w-4 h-4"/>, 'Light', 'Overwhelmed')}
        {renderSlider('purpose', 'Sense of Purpose', <Target className="w-4 h-4"/>, 'Lost', 'Driven')}
        {renderSlider('learning', 'Desire to Learn', <BookOpen className="w-4 h-4"/>, 'Routine', 'Curious')}

        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 px-4 rounded-lg text-sm font-bold bg-primary text-white hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
          >
            Run Diagnostics
          </button>
        </div>
      </form>
    </div>
  );
};
