import React from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import { DecisionLog } from '../types';

interface DecisionHistoryProps {
  logs: DecisionLog[];
}

export const DecisionHistory: React.FC<DecisionHistoryProps> = ({ logs }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full animate-fade-in">
       <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Decision History</h2>
        <p className="text-gray-400">Track record of your 80% Agile decisions and outcomes.</p>
      </div>

      <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4 font-semibold">Goal / Topic</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Confidence</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-white">{log.goal}</div>
                </td>
                <td className="p-4 text-sm text-muted">{log.date}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary" style={{ width: `${log.confidence}%` }}></div>
                    </div>
                    <span className="text-xs font-mono text-secondary">{log.confidence}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide ${
                    log.status === 'Completed' ? 'bg-secondary/10 text-secondary' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {log.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {log.outcome || '-'}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">No decisions logged yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};