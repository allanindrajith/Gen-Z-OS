export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
}

export enum AppMode {
  NEUTRAL = 'NEUTRAL',
  MOTIVATION = 'MOTIVATION',
  DECISION = 'DECISION'
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  TEAM = 'TEAM',
  INSIGHTS = 'INSIGHTS',
  DECISION_FORM = 'DECISION_FORM',
  MOTIVATION_HISTORY = 'MOTIVATION_HISTORY',
  WORK_PREFERENCES = 'WORK_PREFERENCES',
  DECISION_HISTORY = 'DECISION_HISTORY',
  USER_PROFILE = 'USER_PROFILE'
}

export interface PulseData {
  energy: number;
  workload: number;
  purpose: number;
  learning: number;
}

export interface DecisionInput {
  goal: string;
  constraints: string;
  timeHorizon: string;
  resources: string;
  successCriteria: string;
}

export interface UserProfile {
  name: string;
  role: string;
  skills: string[];
  drivers: string[];
  avatar?: string;
}

export interface WorkPreferences {
  workHours: string;
  taskTypes: string[];
  stressTriggers: string[];
  learningGoals: string[];
}

export interface MotivationLog {
  id: string;
  date: string;
  summary: string;
  strategy: string;
  flags: string[];
}

export interface DecisionLog {
  id: string;
  date: string;
  goal: string;
  confidence: number;
  status: 'Pending' | 'Completed';
  outcome?: string;
}