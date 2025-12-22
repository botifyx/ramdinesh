
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 20px rgba(204, 255, 0, 0.4)",
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-surface/80 backdrop-blur-md border border-neon/30 text-neon shadow-lg transition-colors hover:border-neon hover:text-white group"
          aria-label="Back to Top"
        >
          <div className="relative">
            <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
            {/* Minimalist scanner line effect */}
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-neon/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
          
          {/* Tooltip for desktop */}
          <span className="absolute left-full ml-3 px-2 py-1 bg-black text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 rounded uppercase tracking-tighter">
            Return to Apex
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
