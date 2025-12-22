
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Zap, Target } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const NeuralSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user query is: "${query}". 
        The available section IDs in this portfolio are: [hero, id-gen, about, ventures, oracle, portfolio, strategy-center, experience, future-horizon, network, creative, writing, contact].
        Based on semantic meaning, which ONE section ID is the best match?
        Return ONLY the raw section ID as text.`,
      });

      const targetId = response.text?.trim() || 'hero';
      const element = document.getElementById(targetId);
      if (element) {
        setIsOpen(false);
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        
        // Brief visual highlight
        element.classList.add('ring-2', 'ring-neon', 'ring-offset-8', 'ring-offset-void');
        setTimeout(() => element.classList.remove('ring-2', 'ring-neon', 'ring-offset-8', 'ring-offset-void'), 2000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-void/80 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <Search className={`w-5 h-5 ${isSearching ? 'text-neon animate-pulse' : 'text-slate-500'}`} />
              </div>
              <input 
                autoFocus
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Semantic routing... (e.g. 'Show me his AI tools')"
                className="w-full bg-transparent border-none py-6 pl-16 pr-24 text-white text-lg focus:ring-0 font-light placeholder:text-slate-700"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 border border-white/10 px-2 py-1 rounded">ESC to Close</span>
                {query && !isSearching && (
                  <button type="submit" className="bg-neon text-black p-1.5 rounded-lg hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-neon" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Flash_Enabled</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Target className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Semantic_Mapping</span>
                 </div>
              </div>
              <div className="text-[10px] font-mono text-slate-600">
                PROMPT_LATENCY: <span className="text-neon">~0.4s</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuralSearch;
