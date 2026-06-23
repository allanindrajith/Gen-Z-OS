import React, { useState } from 'react';
import { Terminal, Zap, Target, Users, BarChart2, ChevronDown, ChevronRight, LayoutDashboard, History, PlayCircle, Settings, FileText, PieChart, UserCircle } from 'lucide-react';
import { View, AppMode } from '../types';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View, mode?: AppMode) => void;
  onReset: () => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onReset, isOpen }) => {
  const [motivationOpen, setMotivationOpen] = useState(true);
  const [decisionOpen, setDecisionOpen] = useState(true);

  const isActive = (view: View) => currentView === view;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-surface border-r border-white/5 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      flex flex-col
    `}>
      <div className="p-6 h-full flex flex-col overflow-y-auto custom-scrollbar">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => onNavigate(View.DASHBOARD)}>
          <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Terminal className="text-white w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-white">Gen Z OS</h1>
        </div>

        {/* Navigation */}
        <div className="space-y-6 flex-1">
          
          {/* Dashboard */}
          <button
            onClick={() => onNavigate(View.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(View.DASHBOARD) ? 'bg-white/10 text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>

          {/* User Profile */}
          <button
            onClick={() => onNavigate(View.USER_PROFILE)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(View.USER_PROFILE) ? 'bg-white/10 text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
          >
            <UserCircle size={18} />
            <span className="text-sm font-medium">My Profile</span>
          </button>

          {/* Motivation Coach Section */}
          <div>
            <button 
              onClick={() => setMotivationOpen(!motivationOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-muted hover:text-white transition-colors mb-1"
            >
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-primary" />
                <span className="text-sm font-semibold text-gray-200">Motivation Coach</span>
              </div>
              {motivationOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {motivationOpen && (
              <div className="pl-9 space-y-1">
                <button 
                  onClick={() => onNavigate(View.CHAT, AppMode.MOTIVATION)}
                  className="w-full text-left py-1.5 text-xs font-medium text-muted hover:text-primary transition-colors flex items-center gap-2"
                >
                  <PlayCircle size={12} /> Initiate Pulse Scan
                </button>
                <button 
                  onClick={() => onNavigate(View.MOTIVATION_HISTORY)}
                  className={`w-full text-left py-1.5 text-xs font-medium transition-colors flex items-center gap-2 ${isActive(View.MOTIVATION_HISTORY) ? 'text-white' : 'text-muted hover:text-primary'}`}
                >
                  <FileText size={12} /> Previous Plans
                </button>
                <button 
                  onClick={() => onNavigate(View.WORK_PREFERENCES)}
                  className={`w-full text-left py-1.5 text-xs font-medium transition-colors flex items-center gap-2 ${isActive(View.WORK_PREFERENCES) ? 'text-white' : 'text-muted hover:text-primary'}`}
                >
                  <Settings size={12} /> Work Preferences
                </button>
              </div>
            )}
          </div>

          {/* Decision Engine Section */}
          <div>
            <button 
              onClick={() => setDecisionOpen(!decisionOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-muted hover:text-white transition-colors mb-1"
            >
              <div className="flex items-center gap-3">
                <Target size={18} className="text-secondary" />
                <span className="text-sm font-semibold text-gray-200">Decision Engine</span>
              </div>
              {decisionOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
            
            {decisionOpen && (
              <div className="pl-9 space-y-1">
                <button 
                  onClick={() => onNavigate(View.DECISION_FORM)}
                  className="w-full text-left py-1.5 text-xs font-medium text-muted hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <PlayCircle size={12} /> Start New Decision
                </button>
                <button 
                   onClick={() => onNavigate(View.DECISION_HISTORY)}
                   className={`w-full text-left py-1.5 text-xs font-medium transition-colors flex items-center gap-2 ${isActive(View.DECISION_HISTORY) ? 'text-white' : 'text-muted hover:text-secondary'}`}
                >
                  <History size={12} /> Review Past Results
                </button>
                <button className="w-full text-left py-1.5 text-xs font-medium text-muted hover:text-secondary transition-colors flex items-center gap-2 opacity-50 cursor-not-allowed">
                  <PieChart size={12} /> Risk Profile
                </button>
              </div>
            )}
          </div>

          {/* Enterprise Features */}
          <div className="pt-4 border-t border-white/5 space-y-1">
            <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Enterprise</div>
            
            <button
              onClick={() => onNavigate(View.TEAM)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(View.TEAM) ? 'bg-white/10 text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
            >
              <Users size={18} />
              <span className="text-sm font-medium">Team OS</span>
            </button>

            <button
              onClick={() => onNavigate(View.INSIGHTS)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive(View.INSIGHTS) ? 'bg-white/10 text-white' : 'text-muted hover:text-white hover:bg-white/5'}`}
            >
              <BarChart2 size={18} />
              <span className="text-sm font-medium">Insights</span>
            </button>
          </div>

        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
           <button 
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg text-xs font-mono text-muted hover:text-white hover:bg-white/5 transition-colors border border-white/5 hover:border-white/10"
          >
            <PlayCircle size={14} /> New Session
          </button>
        </div>
      </div>
    </aside>
  );
};