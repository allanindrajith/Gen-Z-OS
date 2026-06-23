import React, { useState, useEffect, useRef } from 'react';
import { Send, Menu, Loader2, Bell } from 'lucide-react';
import { geminiService } from './services/geminiService';
import { Message, MessageRole, AppMode, PulseData, View, DecisionInput, UserProfile, WorkPreferences as WorkPreferencesType, MotivationLog, DecisionLog } from './types';
import { ChatBubble } from './components/ChatBubble';
import { PulseScanner } from './components/PulseScanner';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { DecisionForm } from './components/DecisionForm';
import { TeamDashboard } from './components/TeamDashboard';
import { InsightsDashboard } from './components/InsightsDashboard';
import { HistoryLog } from './components/HistoryLog';
import { DecisionHistory } from './components/DecisionHistory';
import { WorkPreferences } from './components/WorkPreferences';
import { UserProfile as UserProfileComponent } from './components/UserProfile';
import { LOADING_MESSAGES } from './constants';
import { TypewriterEffect } from './components/TypewriterEffect';

// --- MOCK DATA ---
const INITIAL_PROFILE: UserProfile = {
  name: "Eigirdas Žemaitis",
  role: "Entrepreneurship and Innovation Program Director",
  skills: ["Innovation Strategy", "Program Management", "Mentorship", "Ecosystem Building"],
  drivers: ["Impact", "Growth", "Innovation"],
  avatar: "https://www.ism.lt/wp-content/uploads/Eigirdas-Zemaitis-1.png"
};

const INITIAL_PREFERENCES: WorkPreferencesType = {
  workHours: "9am - 6pm",
  taskTypes: ["Deep Work", "Strategic Planning"],
  stressTriggers: ["Micromanagement", "Unclear Goals"],
  learningGoals: ["AI Engineering", "Leadership"]
};

const MOCK_MOTIVATION_LOGS: MotivationLog[] = [
    { id: '1', date: 'Oct 24', summary: 'High Energy / Low Focus', strategy: 'Focus Sprints', flags: ['Distraction Risk'] },
    { id: '2', date: 'Oct 23', summary: 'Low Energy / High Purpose', strategy: 'Creative Flow', flags: [] },
    { id: '3', date: 'Oct 22', summary: 'Balanced State', strategy: 'Execution Mode', flags: [] },
];

const MOCK_DECISION_LOGS: DecisionLog[] = [
    { id: '1', date: 'Oct 20', goal: 'Q4 Marketing Channel', confidence: 85, status: 'Completed', outcome: 'Selected LinkedIn Ads' },
    { id: '2', date: 'Oct 18', goal: 'Hire Freelancer vs Agency', confidence: 78, status: 'Pending' },
];

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  
  // Navigation & View State
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [mode, setMode] = useState<AppMode>(AppMode.NEUTRAL);
  const [showPulseScanner, setShowPulseScanner] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Data State
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [preferences, setPreferences] = useState<WorkPreferencesType>(INITIAL_PREFERENCES);
  const [motivationLogs, setMotivationLogs] = useState<MotivationLog[]>(MOCK_MOTIVATION_LOGS);
  const [decisionLogs, setDecisionLogs] = useState<DecisionLog[]>(MOCK_DECISION_LOGS);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat logic
    geminiService.initChat();
    
    // Simulate Notification
    setTimeout(() => {
        setNotifications(prev => [...prev, "Low energy detected in mid-week trends. Modify workload?"]);
    }, 5000);
  }, []);

  useEffect(() => {
    if (view === View.CHAT) {
      scrollToBottom();
    }
  }, [messages, view]);

  const scrollToBottom = () => {
    setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Loading Message Cycle Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isStreaming) {
      const msgs = mode === AppMode.MOTIVATION 
        ? LOADING_MESSAGES.motivation 
        : mode === AppMode.DECISION 
          ? LOADING_MESSAGES.decision 
          : LOADING_MESSAGES.general;
      
      let i = 0;
      setLoadingText(msgs[0]);
      interval = setInterval(() => {
        i = (i + 1) % msgs.length;
        setLoadingText(msgs[i]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isStreaming, mode]);

  const handleSendMessage = async (text: string, silent = false) => {
    if ((!text.trim() && !silent) || isStreaming) return;

    if (!silent) {
      const userMsg: Message = {
        id: Date.now().toString(),
        role: MessageRole.USER,
        text: text,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, userMsg]);
    }

    setInputValue('');
    setIsStreaming(true);

    // Inject User Context & Preferences into prompt invisibly
    const contextPrompt = `
User Profile: ${JSON.stringify(userProfile)}
User Work Preferences: ${JSON.stringify(preferences)}
Current Request: ${text}
`;

    try {
      const stream = await geminiService.sendMessageStream(contextPrompt);
      
      const botMsgId = (Date.now() + 1).toString();
      let accumulatedText = '';

      // Create a placeholder message for the bot
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: MessageRole.MODEL,
        text: '',
        timestamp: Date.now()
      }]);

      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
        ));
      }
    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: MessageRole.SYSTEM,
        text: "Error: Connection interrupted. Please try again.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsStreaming(false);
    }
  };

  const startSession = (selectedMode: AppMode) => {
    setMode(selectedMode);
    setMessages([]); 

    if (selectedMode === AppMode.MOTIVATION) {
      setShowPulseScanner(true);
    } else if (selectedMode === AppMode.DECISION) {
        setView(View.DECISION_FORM);
    } else {
        setView(View.CHAT);
    }
  };

  const handlePulseSubmit = (data: PulseData) => {
    setShowPulseScanner(false);
    setView(View.CHAT);
    setMode(AppMode.MOTIVATION);
    
    // Add to local log
    const newLog: MotivationLog = {
        id: Date.now().toString(),
        date: 'Today',
        summary: `E:${data.energy} W:${data.workload} P:${data.purpose}`,
        strategy: 'Generating...',
        flags: data.energy < 4 ? ['Low Energy'] : []
    };
    setMotivationLogs(prev => [newLog, ...prev]);

    const prompt = `Motivation Mode. Running Pulse Scan...
Energy level: ${data.energy}/10
Workload level: ${data.workload}/10
Sense of purpose: ${data.purpose}/10
Desire to learn/grow: ${data.learning}/10`;
    
    setMessages([{
        id: Date.now().toString(),
        role: MessageRole.SYSTEM,
        text: `**Pulse Scan Initiated**\nEnergy: ${data.energy}/10 • Workload: ${data.workload}/10 • Purpose: ${data.purpose}/10`,
        timestamp: Date.now()
    }]);

    handleSendMessage(prompt, true);
  };

  const handleDecisionSubmit = (data: DecisionInput) => {
      setView(View.CHAT);
      setMode(AppMode.DECISION);

      // Add to local log
      const newLog: DecisionLog = {
          id: Date.now().toString(),
          date: 'Today',
          goal: data.goal,
          confidence: 80, // Target
          status: 'Pending'
      };
      setDecisionLogs(prev => [newLog, ...prev]);

      const prompt = `Decision Mode.
Goal: ${data.goal}
Constraints: ${data.constraints}
Time Horizon: ${data.timeHorizon}
Resources: ${data.resources}
Success Criteria: ${data.successCriteria}`;

      setMessages([{
          id: Date.now().toString(),
          role: MessageRole.SYSTEM,
          text: `**Decision Engine Initialized**\nGoal: ${data.goal}`,
          timestamp: Date.now()
      }]);

      handleSendMessage(prompt, true);
  };

  const resetSession = () => {
    geminiService.resetChat();
    setMessages([]);
    setMode(AppMode.NEUTRAL);
    setView(View.DASHBOARD);
    setSidebarOpen(false);
  };

  const handleNavigate = (targetView: View, targetMode?: AppMode) => {
    setView(targetView);
    if (targetMode) {
      if (targetMode === AppMode.MOTIVATION) {
          setMode(AppMode.MOTIVATION);
          setShowPulseScanner(true);
      } else if (targetMode === AppMode.DECISION) {
          setMode(AppMode.DECISION);
      }
    }
    setSidebarOpen(false);
  };

  // Render Content based on View
  const renderContent = () => {
    switch (view) {
        case View.DASHBOARD:
            return <Dashboard onStartMode={startSession} userProfile={userProfile} />;
        case View.TEAM:
            return <TeamDashboard />;
        case View.INSIGHTS:
            return <InsightsDashboard />;
        case View.DECISION_FORM:
            return <DecisionForm onSubmit={handleDecisionSubmit} onCancel={() => setView(View.DASHBOARD)} />;
        case View.MOTIVATION_HISTORY:
            return <HistoryLog logs={motivationLogs} />;
        case View.DECISION_HISTORY:
            return <DecisionHistory logs={decisionLogs} />;
        case View.WORK_PREFERENCES:
            return <WorkPreferences preferences={preferences} onUpdate={setPreferences} />;
        case View.USER_PROFILE:
            return <UserProfileComponent profile={userProfile} />;
        case View.CHAT:
            return (
                <div className="flex flex-col h-full relative">
                     {/* Chat Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur p-2 text-center border-b border-white/5">
                        <span className="text-xs font-mono text-muted uppercase tracking-widest">
                            {mode === AppMode.MOTIVATION ? 'Dynamic Drive Loop' : mode === AppMode.DECISION ? '80% Agile Decision Engine' : 'Gen Z OS Chat'}
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-10 space-y-4">
                        <div className="max-w-3xl mx-auto w-full pb-20">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-10">
                                   {mode === AppMode.MOTIVATION ? "Analyzing Pulse Data..." : "Processing Decision Matrix..."}
                                </div>
                            )}
                            {messages.map((msg) => (
                                <ChatBubble key={msg.id} message={msg} />
                            ))}
                            {isStreaming && (
                                <div className="flex items-center gap-3 text-muted text-sm ml-4 animate-pulse">
                                   <Loader2 className="animate-spin" size={16} />
                                   <TypewriterEffect text={loadingText} speed={50} />
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 md:p-6 bg-background/95 backdrop-blur border-t border-white/5">
                        <div className="max-w-3xl mx-auto relative">
                            <form 
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                            className="relative flex items-center"
                            >
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your response..."
                                className="w-full bg-surface border border-white/10 rounded-xl py-4 pl-5 pr-12 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent shadow-lg transition-all"
                                disabled={isStreaming}
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isStreaming}
                                className="absolute right-3 p-2 rounded-lg text-primary hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                            >
                                <Send size={20} />
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        default:
            return <Dashboard onStartMode={startSession} userProfile={userProfile} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentView={view} 
        onNavigate={handleNavigate} 
        onReset={resetSession}
        isOpen={sidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header with Notifications */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/5 bg-background/80 backdrop-blur z-20">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
          <span className="font-semibold text-sm tracking-wide text-gray-200">
            GEN Z OS
          </span>
          <div className="w-6" />
        </header>

        {/* Desktop Notification Area */}
        <div className="absolute top-4 right-8 z-50 flex flex-col gap-2 items-end pointer-events-none">
            {notifications.map((note, i) => (
                <div key={i} className="bg-surface border border-white/10 shadow-xl rounded-lg p-3 flex items-center gap-3 text-sm animate-fade-in pointer-events-auto max-w-xs">
                    <Bell size={16} className="text-accent" />
                    <span className="text-gray-200">{note}</span>
                    <button onClick={() => setNotifications(prev => prev.filter((_, idx) => idx !== i))} className="text-muted hover:text-white">×</button>
                </div>
            ))}
        </div>

        {renderContent()}

        {/* Modal: Pulse Scanner */}
        {showPulseScanner && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <PulseScanner 
              onSubmit={handlePulseSubmit} 
              onCancel={() => {
                  setShowPulseScanner(false);
                  if (view !== View.CHAT) setView(View.DASHBOARD);
              }} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;