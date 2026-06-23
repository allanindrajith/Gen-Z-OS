import React from 'react';
import { Zap, Target, ArrowRight, CheckCircle2, Clock, UserCircle, AlertTriangle } from 'lucide-react';
import { AppMode, UserProfile } from '../types';

interface DashboardProps {
  onStartMode: (mode: AppMode) => void;
  userProfile: UserProfile;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartMode, userProfile }) => {
  return (
    <div className="p-8 max-w-5xl mx-auto w-full animate-fade-in">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {userProfile.name}.</h2>
          <p className="text-gray-400">Gen Z OS Initialized. Your workflow, motivation status, and decisions have been synchronized.</p>
        </div>
        <div className="flex items-center gap-4 hidden md:flex">
            <div className="text-right">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">Current Role</div>
                <div className="text-sm font-medium text-white">{userProfile.role}</div>
            </div>
            {userProfile.avatar && (
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-lg shrink-0">
                     <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                </div>
            )}
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <button 
          onClick={() => onStartMode(AppMode.MOTIVATION)}
          className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-primary/50 transition-all text-left hover:shadow-2xl hover:shadow-primary/10"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={100} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Motivation Coach</h3>
            <p className="text-sm text-gray-400 mb-6">Initiate Pulse Scan to optimize your daily workflow and energy management based on your preferences.</p>
            <div className="flex items-center text-sm font-medium text-primary">
              Initiate Pulse Scan <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>

        <button 
          onClick={() => onStartMode(AppMode.DECISION)}
          className="group relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-secondary/50 transition-all text-left hover:shadow-2xl hover:shadow-secondary/10"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Target size={100} />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-secondary group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Decision Engine</h3>
            <p className="text-sm text-gray-400 mb-6">Launch the 80% Agile Model. Input constraints and let AI generate 3 confident scenarios.</p>
            <div className="flex items-center text-sm font-medium text-secondary">
              Launch Assistant <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      </div>

      {/* System Status Grid */}
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <CheckCircle2 size={20} className="text-secondary" /> System Status
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-surface border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Engine Health</h4>
          </div>
          <p className="text-sm text-white font-medium">Optimal (98%)</p>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-muted" />
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Last Sync</h4>
          </div>
          <p className="text-sm text-white font-medium">Just now</p>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-white/5">
           <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-accent" />
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Active Decisions</h4>
           </div>
           <p className="text-sm text-white font-medium">3 Pending</p>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-white/5">
           <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-yellow-500" />
            <h4 className="text-xs font-semibold text-gray-400 uppercase">Anomalies</h4>
           </div>
           <p className="text-sm text-white font-medium">None Detected</p>
        </div>

      </div>
    </div>
  );
};