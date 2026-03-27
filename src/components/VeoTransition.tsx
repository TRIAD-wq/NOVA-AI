import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Cpu, Sparkles } from 'lucide-react';

export default function VeoTransition() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsTransitioning(true);
      setPrevPath(location.pathname);
      
      // Transition duration
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#020203] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Video (Simulated Veo Graphic) */}
          <div className="absolute inset-0 opacity-40">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              {/* Using a high-quality futuristic abstract video as a placeholder for Veo generation */}
              <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-circuit-board-4430-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#020203] via-transparent to-[#020203]" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-600/20 blur-2xl rounded-full animate-pulse" />
              <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                <Cpu className="w-10 h-10 text-indigo-400 animate-pulse" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black tracking-[0.2em] uppercase text-white">Calculating Path</h2>
              <div className="flex items-center justify-center gap-2">
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>

          {/* Scanning Line */}
          <motion.div 
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 right-0 h-px bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
