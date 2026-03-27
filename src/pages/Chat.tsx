import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Send, ArrowLeft, User, Sparkles, MoreVertical, Globe, Shield, Cpu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../hooks/useChat";

export default function ChatPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { messages, isTyping, sessionData, sendMessage } = useChat(sessionId);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const content = input;
    setInput("");
    await sendMessage(content);
  };

  return (
    <div className="h-screen bg-[#020203] text-white flex flex-col selection:bg-indigo-500/30 font-sans overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Header */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-[#020203]/50 backdrop-blur-md shrink-0 relative z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm leading-none">
                Nova ({sessionData?.model?.toUpperCase() || "SPARK"})
              </h1>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Active Session</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
            <Shield className="w-3 h-3" />
            Secure
          </div>
          <button className="p-2 text-white/20 hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide relative z-10">
        <div className="max-w-4xl mx-auto space-y-10 pb-10">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 pt-20">
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Mission Initialized</h2>
                <p className="text-white/30 text-sm max-w-xs mx-auto font-medium">
                  Describe your current challenge. Nova is ready to calculate the optimal path.
                </p>
              </div>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((m, i) => (
              <motion.div
                key={m.id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col gap-3 ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] px-1">
                  {m.role === "user" ? <User className="w-3 h-3" /> : <Sparkles className="w-3 h-3 text-indigo-400" />}
                  {m.role === "user" ? "You" : "Nova"}
                </div>
                <div className={`p-6 rounded-xl text-sm leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                  m.role === "user" 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" 
                    : "bg-white/5 border border-white/10 text-white/80"
                }`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] px-1">
                  <Sparkles className="w-3 h-3" />
                  Generating...
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl w-20 flex justify-center">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Input Area */}
      <footer className="p-6 md:p-12 bg-gradient-to-t from-[#020203] to-transparent shrink-0 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-indigo-600/20 rounded-xl blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex items-center">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask Nova anything..."
              rows={1}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-8 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all pr-20 resize-none overflow-hidden min-h-[60px] max-h-[200px]"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="absolute right-3 p-4 rounded-lg bg-white text-black hover:bg-indigo-50 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between px-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                <Globe className="w-3 h-3" /> Grounded Search
              </div>
            </div>
            <p className="text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">
              LifePilot AI • Nova ({sessionData?.model?.toUpperCase() || "SPARK"})
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
