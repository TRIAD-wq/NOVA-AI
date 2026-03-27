import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { 
  Settings, 
  Plus, 
  Send, 
  Paperclip, 
  User, 
  Sparkles, 
  Zap, 
  Waves, 
  Activity, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  ArrowRight,
  Globe,
  Cpu,
  Shield,
  ChevronRight,
  Navigation,
  Brain,
  Compass
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../firebase";
import { useChat } from "../hooks/useChat";

export default function LifePilotPage() {
  const { sessionId: urlSessionId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | undefined>(urlSessionId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputText, setInputText] = useState("");
  const [selectedModel, setSelectedModel] = useState<"spark" | "flow" | "pulse">("spark");
  
  const { messages, isTyping, sessionData, sendMessage } = useChat(activeSessionId);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch all sessions for the sidebar
  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/sessions`;
    const q = query(collection(db, path), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSessions(fetchedSessions);
      
      // If we are on /inbox and there are sessions, pick the first one if none is active
      if (!activeSessionId && fetchedSessions.length > 0 && !urlSessionId) {
        setActiveSessionId(fetchedSessions[0].id);
        navigate(`/inbox/${fetchedSessions[0].id}`, { replace: true });
      }
    });
    return () => unsubscribe();
  }, [user, activeSessionId, urlSessionId, navigate]);

  // Sync activeSessionId with URL
  useEffect(() => {
    if (urlSessionId) {
      setActiveSessionId(urlSessionId);
    }
  }, [urlSessionId]);

  const startNewChat = async () => {
    if (!user) return;
    try {
      const sessionsRef = collection(db, `users/${user.uid}/sessions`);
      const newSession = await addDoc(sessionsRef, {
        uid: user.uid,
        category: "general",
        model: selectedModel,
        title: "New Session",
        createdAt: serverTimestamp(),
        status: "active"
      });
      navigate(`/inbox/${newSession.id}`);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeSessionId) return;
    const content = inputText;
    setInputText("");
    await sendMessage(content, selectedModel);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const modelModes = [
    { id: "spark", name: "Spark (Basic)", icon: <Zap className="w-4 h-4" />, color: "orange" },
    { id: "flow", name: "Flow (Intermediate)", icon: <Waves className="w-4 h-4" />, color: "pink" },
    { id: "pulse", name: "Pulse (Advanced)", icon: <Activity className="w-4 h-4" />, color: "red" },
  ] as const;

  const suggestedPrompts = [
    "Help me build a 4-week study plan for exams.",
    "I need to negotiate my salary. How do I start?",
    "Create a simple budget for a $3000 monthly income.",
    "How do I stop procrastinating on my project?"
  ];

  return (
    <div className="flex h-screen bg-bg text-white selection:bg-accent/30 font-sans overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* --- Sidebar --- */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative z-20 flex flex-col bg-bg/20 backdrop-blur-2xl border-r border-border overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="p-8 pt-24 flex flex-col gap-10 shrink-0">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
                <Compass className="w-6 h-6 animate-[spin_15s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-orange-600 rotate-45" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent whitespace-nowrap">
                LifePilot
              </span>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-white/40 hover:text-white self-end">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-8 mb-8">
          <button 
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white/[0.03] border border-border rounded-xl text-xs font-bold hover:bg-white/[0.08] transition-all group cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
            New Mission
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-6 space-y-2 scrollbar-hide">
          <p className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6">Mission History</p>
          {sessions.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/inbox/${chat.id}`)}
              className={`w-full text-left p-5 rounded-2xl transition-all group border ${
                activeSessionId === chat.id 
                  ? "bg-accent/10 border-accent/30 shadow-lg shadow-accent/5" 
                  : "bg-transparent border-transparent hover:bg-white/[0.02] hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold truncate ${activeSessionId === chat.id ? "text-accent" : "text-white/60"}`}>
                  {chat.title || "Untitled Mission"}
                </span>
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                  {chat.createdAt?.toDate().toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p className="text-[10px] text-white/30 truncate font-bold uppercase tracking-widest group-hover:text-white/40 transition-colors">
                {chat.model || "spark"} mode
              </p>
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-8 border-t border-border bg-bg/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <img 
              src={user?.photoURL || `https://www.gstatic.com/images/branding/product/2x/avatar_anonymous_64dp.png`} 
              className="w-11 h-11 rounded-xl border border-border shadow-2xl" 
              alt="" 
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black uppercase tracking-tight truncate">{user?.displayName}</p>
              <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mt-1">Elite Navigator</p>
            </div>
            <button onClick={logout} className="p-2.5 text-white/20 hover:text-red-400 transition-colors bg-white/[0.03] border border-border rounded-xl">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* --- Main Chat Area --- */}
      <main className="relative z-10 flex-1 flex flex-col min-w-0 bg-bg/10">
        {/* Header */}
        <header className="h-20 border-b border-border flex items-center justify-between px-6 bg-bg/20 backdrop-blur-2xl shrink-0">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white/40 hover:text-white bg-white/[0.03] border border-border rounded-lg">
                <Menu className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-xl blur-lg opacity-40" />
                <div className="relative w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white shadow-lg">
                  <Brain className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h1 className="text-sm font-black uppercase italic tracking-tighter leading-none">Nova Assistant</h1>
                <p className="text-[9px] text-white/30 font-black uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                  Active • {selectedModel.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-white/40 hover:text-white transition-colors bg-white/[0.03] border border-border rounded-xl">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center pt-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-accent/10 animate-float"
                >
                  <Sparkles className="w-10 h-10 text-accent" />
                </motion.div>
                <h2 className="font-display text-4xl font-black mb-4 tracking-tight">Welcome, <span className="text-accent">{user?.displayName?.split(' ')[0]}</span></h2>
                <p className="text-white/40 text-lg max-w-md mx-auto mb-10 font-medium leading-relaxed">
                  I'm Nova. Your high-performance navigator for life's complex missions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInputText(prompt)}
                      className="p-6 bg-white/[0.01] border border-border rounded-2xl text-left text-xs text-white/60 hover:text-white hover:bg-accent/5 hover:border-accent/30 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <p className="line-clamp-2 font-medium leading-relaxed">{prompt}</p>
                      <div className="mt-4 flex items-center gap-2 text-[9px] font-black text-accent uppercase tracking-[0.3em]">
                        Initialize Mission
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col gap-2 ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-center gap-2 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] px-2">
                      {m.role === "user" ? <User className="w-3 h-3" /> : <MessageSquare className="w-3 h-3 text-accent" />}
                      {m.role === "user" ? "Navigator" : "Nova AI"}
                      <span className="ml-2 opacity-40 font-bold">
                        {m.timestamp?.toDate?.() ? m.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"}
                      </span>
                    </div>
                    <div className={`p-5 rounded-2xl text-sm leading-relaxed max-w-[90%] whitespace-pre-wrap shadow-xl ${
                      m.role === "user" 
                        ? "bg-accent text-white shadow-accent/20 rounded-tr-none" 
                        : "bg-white/[0.03] border border-border text-white/90 rounded-tl-none"
                    }`}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[9px] font-black text-accent uppercase tracking-[0.3em] px-2">
                      <MessageSquare className="w-3 h-3 animate-spin-slow" />
                      Processing Mission...
                    </div>
                    <div className="bg-white/[0.03] border border-border p-5 rounded-2xl rounded-tl-none w-20 flex justify-center">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Bar */}
        <footer className="p-6 md:p-12 bg-gradient-to-t from-bg to-transparent shrink-0">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute -inset-2 bg-accent/20 rounded-[32px] blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <div className={`relative flex items-end gap-6 border rounded-[32px] p-2 bg-bg/50 transition-all duration-500 ${
              selectedModel === 'spark' ? 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]' :
              selectedModel === 'flow' ? 'border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.2)]' :
              'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
            }`}>
              {/* Model Selector */}
              <div className="relative group/model">
                <button className="p-4 rounded-xl bg-white/[0.03] border border-border text-white/30 hover:text-white transition-colors flex items-center justify-center">
                  <div className="flex flex-col gap-1">
                    <div className="w-1 h-1 rounded-full bg-current" />
                    <div className="w-1 h-1 rounded-full bg-current" />
                    <div className="w-1 h-1 rounded-full bg-current" />
                  </div>
                </button>
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-bg border border-border rounded-2xl p-2 opacity-0 group-hover/model:opacity-100 transition-opacity pointer-events-none group-hover/model:pointer-events-auto">
                  {[
                    { id: "spark", name: "Spark", icon: <Zap className="w-4 h-4" /> },
                    { id: "flow", name: "Flow", icon: <Waves className="w-4 h-4" /> },
                    { id: "pulse", name: "Pulse", icon: <Activity className="w-4 h-4" /> },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedModel(mode.id as any)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-colors ${
                        selectedModel === mode.id ? "text-accent bg-accent/10" : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {mode.icon}
                      {mode.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative flex items-center">
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Brief Nova on your challenge..."
                  rows={1}
                  className="w-full bg-white/[0.03] border border-border rounded-[28px] pl-8 pr-20 py-7 text-base focus:outline-none focus:border-accent/50 transition-all resize-none overflow-hidden min-h-[80px] max-h-[300px] font-medium placeholder:text-white/10"
                  style={{ height: 'auto' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="absolute right-4 p-3 rounded-xl bg-white text-black hover:bg-indigo-50 active:scale-90 transition-all shadow-2xl disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-8 px-6">
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
