import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Settings, 
  Plus, 
  Send, 
  Paperclip, 
  MoreVertical, 
  User, 
  Sparkles, 
  Zap, 
  Waves, 
  Activity, 
  GraduationCap, 
  Briefcase, 
  Wallet, 
  LifeBuoy, 
  LayoutGrid, 
  ChevronDown, 
  Bell,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Types
type Agent = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

type Model = {
  id: "spark" | "flow" | "pulse";
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const AGENTS: Agent[] = [
  { id: "study", name: "Study Agent", description: "Deep learning and academic support", icon: <GraduationCap className="w-5 h-5" />, color: "cyan" },
  { id: "career", name: "Career Agent", description: "Professional growth and job guidance", icon: <Briefcase className="w-5 h-5" />, color: "pink" },
  { id: "budget", name: "Budget Agent", description: "Financial planning and saving strategies", icon: <Wallet className="w-5 h-5" />, color: "blue" },
  { id: "problem", name: "Problem Solver", description: "Practical solutions for daily life", icon: <LifeBuoy className="w-5 h-5" />, color: "orange" },
  { id: "productivity", name: "Productivity Agent", description: "Efficiency and time management", icon: <LayoutGrid className="w-5 h-5" />, color: "purple" },
];

const MODELS: Model[] = [
  { id: "spark", name: "Spark", description: "Fast & Basic", icon: <Zap className="w-4 h-4" />, color: "cyan" },
  { id: "flow", name: "Flow", description: "Structured & Thoughtful", icon: <Waves className="w-4 h-4" />, color: "blue" },
  { id: "pulse", name: "Pulse", description: "Deep Reasoning & Advanced", icon: <Activity className="w-4 h-4" />, color: "purple" },
];

export default function InboxPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I'm your ${selectedAgent.name} (running on ${selectedModel.name} model). How can I help you with your ${selectedAgent.id} related questions today?`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const startNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-cyan-500/30 font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:relative z-50 w-72 h-full flex flex-col border-r border-white/[0.05] bg-[#0A0A0A] p-6 shrink-0"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">Spark & Flow</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden ml-auto p-2 text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* New Chat Button */}
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl mb-8"
            >
              <Plus className="w-4 h-4" /> New Chat
            </button>

            {/* Agents List */}
            <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
              <h3 className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 mb-4">AI Agents</h3>
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    selectedAgent.id === agent.id 
                      ? "bg-white/5 text-white border border-white/10 shadow-lg" 
                      : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-${agent.color}-500/10 flex items-center justify-center text-${agent.color}-400`}>
                    {agent.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-bold leading-none mb-1">{agent.name}</p>
                    <p className="text-[10px] text-white/20 font-medium truncate w-32">{agent.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* User Profile */}
            <div className="pt-6 mt-6 border-t border-white/[0.05]">
              <div className="flex items-center gap-3 px-2 mb-4">
                <img 
                  src={user?.photoURL || "https://picsum.photos/seed/user/100/100"} 
                  className="w-10 h-10 rounded-xl border border-white/10" 
                  alt="User" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{user?.displayName || "User Profile"}</p>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest truncate">Free Plan</p>
                </div>
                <button className="p-2 text-white/20 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505] relative">
        {/* Top Header */}
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-6 md:px-8 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-${selectedAgent.color}-500/10 border border-${selectedAgent.color}-500/20 flex items-center justify-center text-${selectedAgent.color}-400`}>
                {selectedAgent.icon}
              </div>
              <div>
                <h1 className="font-bold text-sm leading-none">{selectedAgent.name}</h1>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{selectedAgent.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Model Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                <div className={`text-${selectedModel.color}-400`}>{selectedModel.icon}</div>
                {selectedModel.name}
                <ChevronDown className={`w-3 h-3 transition-transform ${isModelDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isModelDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-2xl glass border border-white/10 shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setIsModelDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          selectedModel.id === model.id ? "bg-white/5 text-white" : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-${model.color}-500/10 flex items-center justify-center text-${model.color}-400`}>
                          {model.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-none mb-1">{model.name}</p>
                          <p className="text-[9px] text-white/20 font-medium">{model.description}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <button className="p-2 text-white/20 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/20 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/20 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Messages List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide"
        >
          <div className="max-w-3xl mx-auto space-y-10 pb-10">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 rounded-[2.5rem] glass flex items-center justify-center relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-2xl rounded-full" />
                  <Sparkles className="w-10 h-10 text-white relative z-10" />
                </motion.div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-display font-bold">How can I help you today?</h2>
                  <p className="text-white/30 text-sm max-w-sm mx-auto leading-relaxed">
                    I'm your {selectedAgent.name}, powered by {selectedModel.name}. Ask me anything about {selectedAgent.id} or daily life challenges.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                  {[
                    "How do I optimize my study schedule?",
                    "What are some career growth tips?",
                    "Help me plan a monthly budget.",
                    "How to handle a difficult conversation?"
                  ].map((suggestion, i) => (
                    <button 
                      key={i}
                      onClick={() => setInput(suggestion)}
                      className="glass p-5 rounded-[1.5rem] text-xs font-medium text-white/40 hover:text-white hover:bg-white/5 transition-all text-left border border-white/5 hover:border-white/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col gap-3 ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-2">
                      {m.role === "user" ? <User className="w-3 h-3" /> : selectedAgent.icon}
                      {m.role === "user" ? "You" : selectedAgent.name}
                      <span className="ml-2 font-medium opacity-50 lowercase">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className={`
                      p-6 rounded-[2rem] max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap shadow-xl
                      ${m.role === "user" 
                        ? "bg-white text-black font-medium rounded-tr-none" 
                        : "bg-white/[0.03] border border-white/10 text-white/80 rounded-tl-none backdrop-blur-sm"
                      }
                    `}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-3 items-start"
                  >
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-2 text-${selectedModel.color}-400`}>
                      {selectedModel.icon}
                      {selectedAgent.name} is thinking...
                    </div>
                    <div className={`bg-${selectedModel.color}-500/5 border border-${selectedModel.color}-500/20 p-6 rounded-[2rem] rounded-tl-none w-24 flex justify-center shadow-lg`}>
                      <div className="flex gap-1.5">
                        <div className={`w-1.5 h-1.5 bg-${selectedModel.color}-400 rounded-full animate-bounce`} />
                        <div className={`w-1.5 h-1.5 bg-${selectedModel.color}-400 rounded-full animate-bounce [animation-delay:0.2s]`} />
                        <div className={`w-1.5 h-1.5 bg-${selectedModel.color}-400 rounded-full animate-bounce [animation-delay:0.4s]`} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Input */}
        <footer className="p-6 md:p-10 bg-gradient-to-t from-[#050505] to-transparent shrink-0">
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              <div className="absolute left-6 flex items-center gap-3">
                <button className="p-2 text-white/20 hover:text-white transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your problem here..."
                className="w-full bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] pl-16 pr-20 py-6 text-sm focus:outline-none focus:border-white/20 transition-all shadow-2xl"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="absolute right-3 p-4 rounded-3xl bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:scale-100 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6">
               <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">
                {selectedModel.name} AI Assistant • {selectedModel.description}
              </p>
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                <div className="w-1 h-1 rounded-full bg-green-500" />
                System Online
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
