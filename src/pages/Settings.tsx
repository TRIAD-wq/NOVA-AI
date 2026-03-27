import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { LogOut, User, Settings as SettingsIcon, Bell, Shield, Moon, ArrowLeft, Sparkles, Mail, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col selection:bg-cyan-500/30">
      {/* Header */}
      <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-6 bg-white/[0.01] shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/dashboard")}
            className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg">Settings</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Profile Section */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">Profile</h3>
            <div className="glass p-8 rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-8">
              <img 
                src={user?.photoURL || ""} 
                className="w-24 h-24 rounded-[2rem] border-2 border-white/10 shadow-2xl" 
                alt="Profile" 
              />
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h4 className="text-2xl font-bold">{user?.displayName}</h4>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-white/40 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined March 2026
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">Preferences</h3>
            <div className="glass rounded-[2.5rem] overflow-hidden">
              {[
                { icon: <Bell className="w-5 h-5" />, label: "Notifications", desc: "Manage your alerts and updates", toggle: true },
                { icon: <Moon className="w-5 h-5" />, label: "Dark Mode", desc: "Always on for premium experience", toggle: true, checked: true, disabled: true },
                { icon: <Shield className="w-5 h-5" />, label: "Privacy", desc: "Control your data and visibility", toggle: false }
              ].map((item, i) => (
                <div key={i} className={`p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${i !== 2 ? "border-b border-white/[0.05]" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-white/20 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle && (
                    <div className={`w-10 h-5 rounded-full p-1 transition-colors ${item.checked ? "bg-cyan-500" : "bg-white/10"}`}>
                      <div className={`w-3 h-3 bg-white rounded-full transition-transform ${item.checked ? "translate-x-5" : "translate-x-0"}`} />
                    </div>
                  )}
                  {!item.toggle && <ChevronRight className="w-4 h-4 text-white/20" />}
                </div>
              ))}
            </div>
          </section>

          {/* Account Management */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/20">Account</h3>
            <div className="glass rounded-[2.5rem] overflow-hidden">
              <button 
                onClick={logout}
                className="w-full p-6 flex items-center justify-between hover:bg-red-500/5 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-red-400">Sign Out</p>
                    <p className="text-xs text-red-500/40 mt-0.5">Logout from your current session</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-500/20 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </section>

          {/* Footer Info */}
          <div className="text-center space-y-4 pt-12">
            <div className="flex items-center justify-center gap-2 text-white/10">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Spark AI Assistant v1.0.0</span>
            </div>
            <p className="text-[10px] text-white/20 max-w-xs mx-auto leading-relaxed">
              Your fast and simple AI assistant for life's daily challenges. 
              Designed for clarity, speed, and beginner-friendly solutions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
