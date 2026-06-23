import React from 'react';
import { FileText, Calendar, AlertTriangle } from 'lucide-react';
import { MotivationLog } from '../types';

interface HistoryLogProps {
  logs: MotivationLog[];
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ logs }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Previous Plans</h2>
        <p className="text-gray-400">Archive of your daily strategies and pulse checks.</p>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log.id} className="bg-surface border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Calendar size={16} />
                <span className="text-sm">{log.date}</span>
              </div>
              <div className="flex gap-2">
                {log.flags.map((flag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-accent/10 text-accent rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle size={10} /> {flag}
                  </span>
                ))}
              </div>
            </div>
            
            <h3 className="text-white font-semibold mb-2">{log.summary}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              <span className="text-xs font-bold text-muted uppercase mr-2">Strategy:</span>
              {log.strategy}
            </p>
          </div>
        ))}
        {logs.length === 0 && (
            <div className="text-center text-gray-500 py-10">No history available yet.</div>
        )}
      </div>
    </div>
  );
};