import React from 'react';
import { Settings, Clock, CheckSquare, Zap, BookOpen, Save } from 'lucide-react';
import { WorkPreferences as WorkPreferencesType } from '../types';

interface WorkPreferencesProps {
  preferences: WorkPreferencesType;
  onUpdate: (prefs: WorkPreferencesType) => void;
}

export const WorkPreferences: React.FC<WorkPreferencesProps> = ({ preferences, onUpdate }) => {
  const [formData, setFormData] = React.useState<WorkPreferencesType>(preferences);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert("Preferences Saved!");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto w-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Work Preferences</h2>
        <p className="text-gray-400">Customize how Gen Z OS plans your day.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-white/5 rounded-xl p-8 space-y-8">
        
        {/* Work Hours */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <Clock size={16} className="text-primary" /> Preferred Work Hours
          </label>
          <input 
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-primary/50"
            placeholder="e.g. 10am - 6pm, or 'Late Night Sprints'"
          />
          <p className="text-xs text-muted mt-2">The AI will structure your Morning/Mid-day/Recovery strategies around this.</p>
        </div>

        {/* Task Types */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <CheckSquare size={16} className="text-secondary" /> Preferred Task Types
          </label>
          <input 
            name="taskTypes" 
            value={formData.taskTypes}
            onChange={(e) => setFormData({...formData, taskTypes: e.target.value.split(',')})}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-secondary/50"
            placeholder="e.g. Deep Work, Creative Writing, No Meetings (Comma separated)"
          />
        </div>

        {/* Stress Triggers */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <Zap size={16} className="text-accent" /> Stress Triggers
          </label>
          <input 
             name="stressTriggers"
             value={formData.stressTriggers}
             onChange={(e) => setFormData({...formData, stressTriggers: e.target.value.split(',')})}
             className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-accent/50"
             placeholder="e.g. Back-to-back meetings, Admin work (Comma separated)"
          />
        </div>

         {/* Learning Goals */}
         <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
            <BookOpen size={16} className="text-blue-400" /> Learning Goals
          </label>
          <input 
             name="learningGoals"
             value={formData.learningGoals}
             onChange={(e) => setFormData({...formData, learningGoals: e.target.value.split(',')})}
             className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-400/50"
             placeholder="e.g. React Native, Public Speaking (Comma separated)"
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-violet-600 text-white font-bold rounded-lg transition-colors">
            <Save size={18} /> Save Preferences
          </button>
        </div>

      </form>
    </div>
  );
};