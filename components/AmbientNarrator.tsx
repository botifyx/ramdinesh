
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Cpu, Terminal as TerminalIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AmbientNarratorProps {
  initialBoot?: boolean;
}

const AmbientNarrator: React.FC<AmbientNarratorProps> = ({ initialBoot }) => {
  const [commentary, setCommentary] = useState("Monitoring neural flow...");
  const [isUpdating, setIsUpdating] = useState(false);
  const lastSection = useRef('');

  useEffect(() => {
    if (initialBoot) {
      setCommentary("Neural link established. Access granted.");
    }

    const sections = ['hero', 'id-gen', 'about', 'ventures', 'oracle', 'portfolio', 'strategy-center', 'experience', 'future-horizon', 'network'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && entry.target.id !== lastSection.current) {
          lastSection.current = entry.target.id;
          await generateCommentary(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [initialBoot]);

  const generateCommentary = async (sectionId: string) => {
    setIsUpdating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: `Context: User is viewing the "${sectionId}" section of Ramdinesh's portfolio. 
        Ramdinesh is an AI Architect/CTO. 
        Generate a 1-sentence, tech-noir, enigmatic observation about this transition. 
        Tone: Blade Runner style. Short. Max 12 words.`,
      });
      setCommentary(response.text?.trim() || "Signal re-routed.");
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 lg:right-24 z-40">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 w-72 lg:w-80 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-0.5 bg-neon/30 w-full overflow-hidden">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="h-full bg-neon w-1/3"
          />
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Radio className={`w-4 h-4 ${isUpdating ? 'text-neon animate-pulse' : 'text-slate-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Ambient_Narrator_v2</span>
              <span className="text-[9px] font-mono text-neon uppercase font-black">Live</span>
            </div>
            <p className="text-[11px] font-mono text-slate-200 leading-relaxed min-h-[3em]">
              {isUpdating ? (
                <span className="opacity-50">Decoding signals...</span>
              ) : (
                commentary
              )}
            </p>
          </div>
        </div>
        
        {/* Subtle HUD scanline pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
      </motion.div>
    </div>
  );
};

export default AmbientNarrator;
