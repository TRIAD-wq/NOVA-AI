import { LogOut, User, Brain, MessageSquare, Zap, Shield, Heart, Search, Settings, Bell, ChevronRight, Plus, LifeBuoy, Calendar, Coffee, GraduationCap, Briefcase, Wallet, LayoutGrid, Sparkles, Waves, Activity, Clock, ArrowRight, Navigation, Compass } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState<"spark" | "flow" | "pulse">("spark");

  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/sessions`;
    const q = query(collection(db, path), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSessions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

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

  return (
    <div className="min-h-screen bg-bg text-white flex selection:bg-accent/30 font-sans overflow-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-bg/30 backdrop-blur-2xl p-8 relative z-10">
        <div className="flex items-center gap-3 mb-12 px-2 group cursor-pointer" onClick={() => navigate("/")}>
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
            <span className="font-display text-xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
              LifePilot
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { label: "Overview", icon: <Zap className="w-4 h-4" />, active: true, path: "/dashboard" },
            { label: "Chat with Nova", icon: <MessageSquare className="w-4 h-4" />, path: "/inbox" },
            { label: "Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" }
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.path || "/dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                item.active ? "bg-accent text-white shadow-lg shadow-accent/20" : "text-white/40 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-border">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Bar */}
        <header className="h-24 border-b border-border flex items-center justify-between px-10 bg-bg/50 backdrop-blur-md">
          <div className="relative w-[400px] hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search history, missions, or insights..." 
              className="w-full bg-white/[0.03] border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 pl-8 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black uppercase tracking-tight leading-none">{user?.displayName}</p>
                <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mt-1.5">Elite Navigator</p>
              </div>
              <img 
                src={user?.photoURL || `https://www.gstatic.com/images/branding/product/2x/avatar_anonymous_64dp.png`} 
                className="w-11 h-11 rounded-xl border border-border shadow-2xl" 
                alt="" 
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Welcome & Start Solving */}
            <section className="flex flex-col lg:flex-row items-center justify-between gap-10 bg-accent/5 border border-accent/10 p-10 rounded-[32px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
              
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1 rounded-full bg-accent text-[10px] font-black uppercase tracking-widest">Nova v2.5</div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-border text-[10px] font-bold text-white/40 uppercase tracking-widest">System Online</div>
                </div>
                <h2 className="font-display text-4xl font-black mb-4 tracking-tight leading-tight">Welcome back, <br /><span className="text-accent">{user?.displayName?.split(' ')[0]}</span></h2>
                <p className="text-white/40 font-medium text-lg leading-relaxed">Your mission control is ready. What complex challenge shall we navigate today?</p>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-6 relative z-10 w-full lg:w-auto">
                <div className="flex p-1.5 rounded-2xl bg-white/[0.03] border border-border w-full lg:w-[400px] relative">
                  {/* Sliding Background */}
                  <motion.div 
                    className={`absolute top-1.5 bottom-1.5 rounded-xl shadow-xl z-0 ${
                      selectedModel === 'spark' ? 'bg-orange-500 shadow-orange-500/20' :
                      selectedModel === 'flow' ? 'bg-pink-500 shadow-pink-500/20' :
                      'bg-red-500 shadow-red-500/20'
                    }`}
                    initial={false}
                    animate={{
                      left: selectedModel === 'spark' ? '6px' : selectedModel === 'flow' ? '33.33%' : '66.66%',
                      right: selectedModel === 'spark' ? '66.66%' : selectedModel === 'flow' ? '33.33%' : '6px'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {[
                    { id: "spark", label: "Spark" },
                    { id: "flow", label: "Flow" },
                    { id: "pulse", label: "Pulse" }
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m.id as any)}
                      className={`relative z-10 flex-1 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                        selectedModel === m.id 
                          ? "text-white" 
                          : "text-white/40 hover:text-white"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    startNewChat();
                  }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-xl text-lg font-black uppercase italic tracking-tighter hover:scale-105 transition-all shadow-2xl shadow-pink-500/20 active:scale-95 cursor-pointer flex items-center gap-3 text-white"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Solving <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                </button>
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Quick Navigation</h3>
                <div className="h-px flex-1 mx-8 bg-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Study Mission", desc: "Optimize your learning path", icon: <GraduationCap className="w-6 h-6" />, color: "blue" },
                  { title: "Career Pivot", desc: "Navigate professional growth", icon: <Briefcase className="w-6 h-6" />, color: "purple" },
                  { title: "Budget Control", desc: "Precision financial planning", icon: <Wallet className="w-6 h-6" />, color: "emerald" }
                ].map((action, i) => (
                  <button key={i} className="glass-card p-8 text-left hover:bg-white/[0.04] hover:border-accent/30 transition-all group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {action.icon}
                    </div>
                    <h4 className="text-lg font-bold mb-2">{action.title}</h4>
                    <p className="text-sm text-white/40 font-medium">{action.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Solutions */}
            <section id="history">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/20">Mission Logs</h3>
                <div className="h-px flex-1 mx-8 bg-border" />
              </div>
              
              <div className="grid gap-4">
                {sessions.slice(0, 8).map((s) => (
                  <motion.div 
                    key={s.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/inbox/${s.id}`)}
                    className="group p-6 bg-white/[0.01] border border-border rounded-2xl flex items-center justify-between hover:bg-accent/5 hover:border-accent/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-border flex items-center justify-center text-white/20 group-hover:text-accent transition-colors">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-white/80 group-hover:text-white transition-colors">{s.title || "Untitled Mission"}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {s.createdAt?.toDate().toLocaleDateString()}
                          </span>
                          <div className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                            {s.model || "spark"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity items-center gap-2 text-[10px] font-black text-accent uppercase tracking-[0.2em]">
                        Resume Mission <ArrowRight className="w-4 h-4" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {sessions.length === 0 && (
                  <div className="p-24 text-center border-2 border-dashed border-border rounded-[32px] bg-white/[0.01]">
                    <div className="w-20 h-20 bg-white/[0.03] border border-border rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <Clock className="w-10 h-10 text-white/10" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">No missions logged yet</h4>
                    <p className="text-white/20 font-medium max-w-xs mx-auto">Start your first problem-solving mission with Nova to see your history here.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
