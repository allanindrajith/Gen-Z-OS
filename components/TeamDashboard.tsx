import React from 'react';
import { Users, Battery, AlertTriangle, TrendingUp, Brain, Clock, Activity } from 'lucide-react';

export const TeamDashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Team OS Dashboard</h2>
          <p className="text-gray-400">Real-time workforce diagnostics and optimization.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-muted flex items-center gap-2">
           <Activity size={14} className="text-secondary animate-pulse" />
           Last Sync: 2 mins ago
        </div>
      </div>

      {/* Top Metrics - Updated to match specific requirements */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Battery size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Avg Team Energy</span>
          </div>
          <div className="text-2xl font-bold text-white">7.2 <span className="text-sm text-muted font-normal">/ 10</span></div>
          <div className="text-xs text-secondary mt-1">↑ 12% this week</div>
        </div>

        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-accent mb-2">
            <AlertTriangle size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Burnout Risk</span>
          </div>
          <div className="text-2xl font-bold text-white">2 Members</div>
          <div className="text-xs text-muted mt-1">Flagged for check-in</div>
        </div>

        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <Brain size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Common Decision</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">Resource Allocation</div>
          <div className="text-xs text-muted mt-1">45% of logs</div>
        </div>

        <div className="bg-surface border border-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Clock size={18} />
            <span className="text-xs font-bold uppercase tracking-wide">Bottleneck</span>
          </div>
          <div className="text-sm font-bold text-white mt-1">Budget Approval</div>
          <div className="text-xs text-muted mt-1">Avg 2.5 days delay</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Team Motivation Trend */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-muted" />
            Weekly Team Motivation Trend
          </h3>
          
          <div className="h-48 flex items-end gap-3 px-2">
            {[65, 70, 60, 55, 75, 80, 78].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-white/5 rounded-t-lg relative hover:bg-primary/20 transition-colors" style={{ height: `${h}%` }}>
                   <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-white/10 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                     {h/10}/10
                   </div>
                </div>
                <span className="text-xs text-muted font-mono">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
             <h4 className="text-xs font-bold text-primary uppercase mb-1">AI Recommendation</h4>
             <p className="text-sm text-gray-300">Mid-week slump detected (Thursday). Suggest implementing a "No-Meeting Thursday" to boost focus time and recovery.</p>
          </div>
        </div>

        {/* Right Column - Workload Distribution */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Workload Balance</h3>
          
          <div className="space-y-6">
             <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Engineering</span>
                    <span className="text-accent font-bold">High</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[90%]"></div>
                </div>
             </div>

             <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Design</span>
                    <span className="text-secondary font-bold">Optimal</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[70%]"></div>
                </div>
             </div>

             <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Product</span>
                    <span className="text-primary font-bold">Normal</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[60%]"></div>
                </div>
             </div>

             <div className="pt-4 border-t border-white/5">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upcoming Decisions</div>
               <ul className="space-y-2">
                 <li className="text-sm text-white">• Q3 Hiring Plan</li>
                 <li className="text-sm text-white">• Tech Stack Migration</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};