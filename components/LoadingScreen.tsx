
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Zap, Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "INITIALIZING CORE...",
    "INGESTING SIGNALS...",
    "MAPPING ARCHITECTURE...",
    "OPTIMIZING NEURAL LINKS...",
    "SYNCHRONIZING INTERFACE...",
    "BOOTING INTELLIGENCE..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 120);

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 1500);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void overflow-hidden"
    >
      {/* Background Matrix-like Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      
      {/* Animated Scanline */}
      <motion.div 
        animate={{ translateY: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent h-1/2 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Logo Animation */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-12"
        >
          <div className="relative flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(204,255,0,0.1)]">
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4V20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M7 11H12C14.2 11 16 9.2 16 7C16 4.8 14.2 3 12 3H7" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M12 11L17 19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="17" cy="19" r="2" className="fill-neon" />
              <circle cx="12" cy="7" r="1.5" className="fill-neon" />
            </svg>
            
            {/* Spinning Rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-neon/20 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-8 border border-dotted border-white/5 rounded-full"
            />
          </div>
        </motion.div>

        {/* Text Metrics */}
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <Bot className="w-4 h-4 text-neon" />
            <h1 className="text-2xl font-bold tracking-[0.2em] text-white">RAMDINESH</h1>
          </motion.div>
          <p className="font-mono text-[10px] text-slate-500 tracking-[0.4em] uppercase mb-8">Architecting Intelligence</p>

          {/* Progress Section */}
          <div className="w-64 space-y-3">
            <div className="flex justify-between items-end font-mono">
              <span className="text-[10px] text-neon animate-pulse">{statuses[statusIndex]}</span>
              <span className="text-sm font-bold text-white">{Math.min(progress, 100)}%</span>
            </div>
            
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-neon shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            <div className="flex justify-between text-[8px] font-mono text-slate-600 tracking-tighter">
              <div className="flex gap-2">
                <span className="flex items-center gap-1"><Cpu className="w-2 h-2" /> VEO_3.1_CORE</span>
                <span className="flex items-center gap-1"><Activity className="w-2 h-2" /> NEURAL_LOAD</span>
              </div>
              <div className="flex gap-2">
                <Zap className="w-2 h-2 text-neon" />
                SECURE_LINK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Log Details (Bottom Right) */}
      <div className="absolute bottom-8 right-8 hidden md:block text-right">
        <div className="font-mono text-[9px] text-slate-700 leading-relaxed uppercase">
          {["System.io.initialize();", "Kernel.Neural.Sync();", "Payload.Manifest.Verify();"].map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.5 }}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
