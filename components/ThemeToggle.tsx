
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: theme === 'dark' ? "0 0 20px rgba(255, 255, 255, 0.1)" : "0 0 20px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed bottom-24 left-6 z-40 p-3 rounded-xl backdrop-blur-md border transition-all duration-300 group flex items-center justify-center ${
        theme === 'dark' 
          ? 'bg-surface/80 border-white/10 text-white hover:border-white/30' 
          : 'bg-white/80 border-slate-200 text-slate-900 hover:border-slate-400 shadow-lg'
      }`}
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Sun className="w-6 h-6 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Moon className="w-6 h-6 text-indigo-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Tooltip */}
      <span className={`absolute left-full ml-3 px-2 py-1 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border rounded uppercase tracking-tighter ${
        theme === 'dark' ? 'bg-black text-white border-white/10' : 'bg-white text-black border-slate-200 shadow-sm'
      }`}>
        {theme === 'dark' ? 'Toggle Clarity' : 'Toggle Stealth'}
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
