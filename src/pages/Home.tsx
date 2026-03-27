import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Activity, Navigation, Zap, Waves, Brain, Shield, Info, Compass, Lock, FileText, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg selection:bg-orange-500/30 text-white overflow-hidden font-sans">
      {/* Futuristic Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 left-10 right-10 z-50 border border-white/20 bg-bg/40 backdrop-blur-xl py-6 rounded-[32px] shadow-[0_0_30px_rgba(255,255,255,0.05)] ring-1 ring-white/10">
        <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 rounded-xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
                  <Compass className="w-7 h-7 animate-[spin_15s_linear_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-orange-600 rotate-45" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-black tracking-tighter uppercase italic leading-none bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
                  LifePilot
                </span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">AI Mission Control Active</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <button 
              onClick={() => {
                const element = document.getElementById("about");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors hidden md:block"
            >
              About
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("policy");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors hidden md:block"
            >
              Policy
            </button>
            <button 
              onClick={() => navigate(user ? "/dashboard" : "/login")}
              className="px-8 py-3 rounded-xl bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:bg-orange-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
            >
              {user ? "Go to Cockpit" : "Sign In"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-10 pt-48 pb-12">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 relative inline-block"
          >
            <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full animate-pulse" />
            <div className="relative w-24 h-24 mx-auto bg-white/[0.03] border border-white/10 rounded-[32px] flex items-center justify-center animate-float shadow-2xl">
              <div className="relative">
                <Brain className="w-12 h-12 text-white animate-[pulse_3s_infinite]" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-4 border-bg" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-xl"
          >
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Advanced AI Chat Interface</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-[84px] font-black tracking-tighter leading-[0.85] mb-10 uppercase italic"
          >
            AI MISSION <br />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,78,0,0.3)]">CONTROL.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-white/30 max-w-2xl mx-auto mb-12 leading-relaxed font-bold uppercase tracking-tight"
          >
            A high-performance AI Chat interface for the modern age. Precision assistance for study, career, and life's complex missions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 relative z-50"
          >
            <Link 
              to={user ? "/dashboard" : "/login"}
              className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white text-xl font-black uppercase tracking-[0.3em] rounded-2xl hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(255,78,0,0.3)] active:scale-95 flex items-center gap-4 overflow-hidden z-50"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-4">
                Start Solving <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
            <button 
              onClick={() => {
                const element = document.getElementById("about");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-12 py-6 bg-white/[0.03] border border-white/10 text-white/60 rounded-2xl text-sm font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all"
            >
              View Capabilities
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 shadow-[0_0_20px_rgba(255,78,0,0.1)]">
                  <Info className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.4em] text-orange-500">Mission Intel</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-none">
                Meet <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Nova.</span>
              </h2>
              <p className="text-xl text-white/40 font-bold leading-relaxed mb-10 uppercase tracking-tight max-w-xl">
                Nova is a specialized AI problem-solving engine designed to help you navigate the complexities of modern life with precision and speed.
              </p>

              <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/10 backdrop-blur-3xl mb-16 max-w-xl">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] mb-4">Critical Disclaimer</p>
                <p className="text-xs text-white/30 font-bold uppercase tracking-tight leading-relaxed">
                  LifePilot is an experimental AI system. Nova's models are designed for practical assistance. They are not enterprise-grade professional intelligence and should not be used for high-stakes legal, medical, or financial decisions without human verification.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] hover:border-orange-500/20 transition-colors">
                  <Shield className="w-10 h-10 text-orange-500 mb-8" />
                  <h4 className="text-xl font-black uppercase mb-4 tracking-tight">Practical Focus</h4>
                  <p className="text-sm text-white/30 font-bold uppercase tracking-tight leading-relaxed">No generic advice. Nova provides actionable steps, plans, and direct solutions.</p>
                </div>
                <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[40px] hover:border-pink-500/20 transition-colors">
                  <Activity className="w-10 h-10 text-pink-500 mb-8" />
                  <h4 className="text-xl font-black uppercase mb-4 tracking-tight">Multi-Mode Intel</h4>
                  <p className="text-sm text-white/30 font-bold uppercase tracking-tight leading-relaxed">Switch between Spark, Flow, and Pulse modes to match the complexity of your mission.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full grid grid-cols-1 gap-8">
              {[
                { 
                  id: "spark", 
                  name: "Spark (Basic)", 
                  icon: <Zap className="w-6 h-6" />, 
                  desc: "Fast, lightweight, and simple. Best for quick fixes, short explanations, and immediate next steps.",
                  color: "bg-orange-500/10",
                  borderColor: "border-orange-500/20",
                  textColor: "text-orange-500",
                  shadowColor: "shadow-orange-500/5"
                },
                { 
                  id: "flow", 
                  name: "Flow (Intermediate)", 
                  icon: <Waves className="w-6 h-6" />, 
                  desc: "Structured reasoning and advanced planning. Best for study plans, career growth, and routines.",
                  color: "bg-pink-500/10",
                  borderColor: "border-pink-500/20",
                  textColor: "text-pink-500",
                  shadowColor: "shadow-pink-500/5"
                },
                { 
                  id: "pulse", 
                  name: "Pulse (Advanced)", 
                  icon: <Activity className="w-6 h-6" />, 
                  desc: "Deep reasoning and strategic mastery. Best for complex decisions, high-stakes moves, and long-term systems.",
                  color: "bg-red-500/10",
                  borderColor: "border-red-500/20",
                  textColor: "text-red-500",
                  shadowColor: "shadow-red-500/5"
                }
              ].map((mode) => (
                <div key={mode.id} className="p-10 bg-white/[0.03] border border-white/5 rounded-[48px] flex items-start gap-8 group hover:bg-white/[0.05] transition-all duration-500">
                  <div className={`w-16 h-16 rounded-2xl ${mode.color} border ${mode.borderColor} flex items-center justify-center ${mode.textColor} group-hover:scale-110 transition-transform shadow-lg ${mode.shadowColor}`}>
                    {mode.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase mb-3 italic tracking-tighter">{mode.name}</h4>
                    <p className="text-sm text-white/40 font-bold uppercase tracking-tight leading-relaxed">{mode.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Section */}
      <section id="policy" className="py-48 px-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 mb-10">
                <Lock className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Privacy & Security</span>
              </div>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none mb-10">Our Policy</h2>
              <p className="text-xl text-white/40 font-bold leading-relaxed uppercase tracking-tight">
                We prioritize your data sovereignty. LifePilot is built with a privacy-first architecture.
              </p>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { icon: <Shield className="w-8 h-8 text-pink-500" />, title: "Data Sovereignty", desc: "Your data is never sold or used for training without explicit consent." },
                { icon: <Lock className="w-8 h-8 text-red-500" />, title: "End-to-End Logic", desc: "Advanced encryption protocols protect every interaction with Nova." },
                { icon: <FileText className="w-8 h-8 text-orange-500" />, title: "Transparent Terms", desc: "Clear, human-readable terms that put you in control of your digital life." },
                { icon: <Heart className="w-8 h-8 text-pink-500" />, title: "Human-Centric", desc: "Designed to empower human decision-making, not replace it." }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="mb-8">{item.icon}</div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-sm text-white/40 font-bold uppercase tracking-tight leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-10 border-t border-white/5 relative z-10 bg-bg">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-20">
          <div className="flex items-center gap-6 group">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl">
                <Compass className="w-8 h-8" />
              </div>
            </div>
            <span className="font-display text-4xl font-black uppercase italic tracking-tighter">LifePilot</span>
          </div>
          
          <div className="flex flex-col items-center gap-12 text-center max-w-3xl">
            <div className="p-10 rounded-[48px] bg-red-500/5 border border-red-500/10 backdrop-blur-3xl">
              <p className="text-[11px] font-black text-red-500 uppercase tracking-[0.5em] mb-6">Critical Disclaimer</p>
              <p className="text-sm text-white/30 font-bold uppercase tracking-tight leading-relaxed">
                LifePilot is an experimental AI navigation system. Nova's models (Spark, Flow, Pulse) are designed for practical assistance and daily problem-solving. They are not enterprise-grade professional intelligence and should not be used for high-stakes legal, medical, or financial decisions without human verification.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.6em]">
                Developed by a Senior Full-Stack Engineer
              </p>
              <div className="flex gap-12 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
                <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
                <a href="#" className="hover:text-red-500 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
