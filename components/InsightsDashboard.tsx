import React from 'react';
import { BarChart2, Zap, Clock, Users, Target, Shield, ArrowUpRight } from 'lucide-react';

export const InsightsDashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Analytics & Insights</h2>
        <p className="text-gray-400">Performance metrics proving the efficacy of the Gen Z OS model.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Motivation Insights */}
        <div className="bg-surface border border-white/5 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-primary/20 rounded-lg text-primary">
              <Zap size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Motivation</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Avg Energy Level</span>
               <span className="text-lg font-bold text-white">7.8/10</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Workload Spikes</span>
               <span className="text-sm font-medium text-accent">Tue, Thu</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Stress Zone</span>
               <span className="text-sm font-medium text-secondary">Low (12%)</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
             <p className="text-xs text-gray-400">Your energy is highest during morning sprints.</p>
          </div>
        </div>

        {/* Decision Insights */}
        <div className="bg-surface border border-white/5 p-6 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
              <Target size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Decisions</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Avg Decision Time</span>
               <span className="text-lg font-bold text-white">1.2 days</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Avg Confidence</span>
               <span className="text-sm font-medium text-secondary">88%</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Best Type</span>
               <span className="text-sm font-medium text-white">Resource Alloc.</span>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
             <p className="text-xs text-gray-400">Decision speed improved by 23% this month.</p>
          </div>
        </div>

        {/* Team Insights */}
        <div className="bg-surface border border-white/5 p-6 rounded-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
           <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-2 bg-white/10 rounded-lg text-white">
              <Users size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Team</h3>
          </div>
          
          <div className="space-y-4 relative z-10">
             <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Alignment Score</span>
               <span className="text-lg font-bold text-white">9.2/10</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Workload Balance</span>
               <span className="text-sm font-medium text-accent">Action Needed</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-gray-400">Fatigue Risk</span>
               <span className="text-sm font-medium text-yellow-500">Moderate</span>
            </div>
          </div>
           <div className="mt-6 pt-4 border-t border-white/5">
             <p className="text-xs text-gray-400">Marketing team showing signs of underutilization.</p>
          </div>
        </div>

      </div>

      <div className="bg-surface border border-white/5 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-6">Productivity KPIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="p-4 bg-black/20 rounded-lg">
             <div className="text-xs text-muted uppercase tracking-wider mb-2">Reduction in Decision Time</div>
             <div className="text-2xl font-bold text-secondary flex items-center gap-2">
                 -4.5h <ArrowUpRight className="rotate-45" size={16} />
             </div>
           </div>
           <div className="p-4 bg-black/20 rounded-lg">
             <div className="text-xs text-muted uppercase tracking-wider mb-2">Task Completion Efficacy</div>
             <div className="text-2xl font-bold text-primary flex items-center gap-2">
                 92% <ArrowUpRight size={16} />
             </div>
           </div>
           <div className="p-4 bg-black/20 rounded-lg">
             <div className="text-xs text-muted uppercase tracking-wider mb-2">Alignment Score</div>
             <div className="text-2xl font-bold text-white flex items-center gap-2">
                 9.2 <span className="text-sm text-muted font-normal">/10</span>
             </div>
           </div>
           <div className="p-4 bg-black/20 rounded-lg">
             <div className="text-xs text-muted uppercase tracking-wider mb-2">Focus Sprints</div>
             <div className="text-2xl font-bold text-white flex items-center gap-2">
                 12 <span className="text-sm text-muted font-normal">this week</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};