import React from 'react';
import { UserCircle, BadgeCheck, Briefcase, Zap, Shield } from 'lucide-react';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  profile: UserProfileType;
}

export const UserProfile: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto w-full animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-violet-900 flex items-center justify-center text-white shadow-2xl overflow-hidden border-2 border-white/10 shrink-0">
          {profile.avatar ? (
             <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
             <UserCircle size={48} />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
          <div className="flex items-center gap-2 text-gray-400 mt-1">
             <Briefcase size={14} />
             <span>{profile.role}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills Wallet */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
             <Shield size={20} className="text-secondary" />
             <h3 className="text-lg font-bold text-white">Skill Wallet</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Motivational Drivers */}
        <div className="bg-surface border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
             <Zap size={20} className="text-accent" />
             <h3 className="text-lg font-bold text-white">Drivers</h3>
          </div>
           <div className="space-y-3">
            {profile.drivers.map((driver, index) => (
              <div key={index} className="flex items-center gap-3">
                 <BadgeCheck size={16} className="text-primary" />
                 <span className="text-sm text-gray-300">{driver}</span>
              </div>
            ))}
           </div>
        </div>

         {/* Stats */}
         <div className="md:col-span-2 bg-surface border border-white/5 rounded-xl p-6 flex justify-between">
            <div className="text-center">
                <div className="text-2xl font-bold text-white">87%</div>
                <div className="text-xs text-muted uppercase">Workflow Match</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs text-muted uppercase">Decisions Logged</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">4.5</div>
                <div className="text-xs text-muted uppercase">Avg Confidence</div>
            </div>
         </div>
      </div>
    </div>
  );
};