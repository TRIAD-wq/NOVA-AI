import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Sparkles, ArrowLeft, Shield } from "lucide-react";

export default function LoginPage() {
  const { user, loginWithGoogle, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-bg text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-accent/30 font-sans">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <button 
        onClick={() => navigate("/")}
        className="absolute top-12 left-12 flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all group p-3 bg-white/[0.03] border border-border rounded-xl"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to base
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] relative z-10"
      >
        <div className="glass-card p-16 rounded-[48px] shadow-2xl relative overflow-hidden border border-border">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent via-indigo-500 to-accent opacity-50" />
          
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="w-20 h-20 bg-accent rounded-[24px] flex items-center justify-center shadow-2xl shadow-accent/20 animate-float">
              <Sparkles className="text-white w-10 h-10" />
            </div>
            
            <div className="space-y-4">
              <h1 className="font-display text-4xl font-black tracking-tight leading-none uppercase">Mission <br /><span className="text-accent">Access</span></h1>
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-xs mx-auto">
                Authorize your identity to continue navigating your life's missions.
              </p>
            </div>

            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-4 px-8 py-5 rounded-2xl bg-white text-black font-black text-lg hover:bg-indigo-50 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
                  Authorize with Google
                </>
              )}
            </button>

            <div className="pt-6 flex items-center justify-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
              <Shield className="w-4 h-4" />
              Secure Protocol Active
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-[10px] font-bold text-white/10 uppercase tracking-[0.3em] leading-relaxed">
          By authorizing, you agree to LifePilot's <br />
          <a href="#" className="text-white/30 hover:text-accent transition-colors">Terms of Service</a> and <a href="#" className="text-white/30 hover:text-accent transition-colors">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
