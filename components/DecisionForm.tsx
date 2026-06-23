import React, { useState } from 'react';
import { Target, Clock, AlertTriangle, Check, ArrowLeft } from 'lucide-react';
import { DecisionInput } from '../types';

interface DecisionFormProps {
  onSubmit: (data: DecisionInput) => void;
  onCancel: () => void;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<DecisionInput>({
    goal: '',
    constraints: '',
    timeHorizon: '',
    resources: '',
    successCriteria: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-4 animate-fade-in">
      <button onClick={onCancel} className="flex items-center text-sm text-muted hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </button>

      <div className="bg-surface/50 border border-white/10 rounded-xl p-8 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
            <Target size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">New Decision Matrix</h2>
            <p className="text-sm text-gray-400">Initialize the 80% Agile Decision Engine</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Decision Goal</label>
            <input
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g. Choose a marketing channel for Q3"
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Constraints</label>
              <input
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                placeholder="e.g. $5k budget, 2 weeks"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Time Horizon</label>
              <input
                name="timeHorizon"
                value={formData.timeHorizon}
                onChange={handleChange}
                placeholder="e.g. Impact needed within 30 days"
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors"
                required
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-300 mb-2">Available Resources</label>
             <input
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              placeholder="e.g. 1 Designer, 2 Devs, Myself"
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Success Criteria</label>
            <textarea
              name="successCriteria"
              value={formData.successCriteria}
              onChange={handleChange}
              rows={3}
              placeholder="What does a good outcome look like?"
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50 transition-colors resize-none"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              Generate Options (80% Confidence)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};