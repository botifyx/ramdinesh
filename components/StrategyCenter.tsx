
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Cpu, Terminal, ChevronRight, BarChart3, Binary, Search, RefreshCcw, FileText } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type AuditStatus = 'IDLE' | 'SCANNING' | 'ANALYZING' | 'SYNTHESIZING' | 'COMPLETE';

const StrategyCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<AuditStatus>('IDLE');
  const [result, setResult] = useState<{
    signal: number;
    feasibility: string;
    risk: string;
    stack: string[];
    summary: string;
  } | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status !== 'IDLE') return;

    setStatus('SCANNING');
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Artificial delay for "Scanning" feel
      await new Promise(r => setTimeout(r, 1500));
      setStatus('ANALYZING');

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Audit this project idea: "${input}". 
        Return a JSON object with:
        - signal: (number 0-100 representing market potential)
        - feasibility: (short phrase about technical viability)
        - risk: (primary technical blocker)
        - stack: (array of 4 recommended modern technologies)
        - summary: (2-sentence high-level architectural strategy)`,
        config: {
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 15000 }
        }
      });

      setStatus('SYNTHESIZING');
      await new Promise(r => setTimeout(r, 1000));
      
      const data = JSON.parse(response.text || '{}');
      setResult(data);
      setStatus('COMPLETE');
    } catch (error) {
      console.error(error);
      setStatus('IDLE');
    }
  };

  return (
    <section id="strategy-center" className="py-32 bg-void relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.05),transparent)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-neon"></div>
              <span className="font-mono text-neon text-[10px] uppercase tracking-[0.4em]">Audit_Engine_v1.0</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
              STRATEGIC <br />
              <span className="text-slate-500">COMMAND CENTER</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-md">
              Submit your project vision for an autonomous technical audit. The engine evaluates signal strength and identifies structural risks.
            </p>

            <form onSubmit={handleAudit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-surface border border-white/10 rounded-2xl p-2 flex items-center gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your project intent..."
                  disabled={status !== 'IDLE'}
                  className="flex-1 bg-transparent border-none py-4 px-6 text-white font-mono text-sm focus:ring-0 placeholder:text-slate-700"
                />
                <button 
                  type="submit"
                  disabled={status !== 'IDLE' || !input.trim()}
                  className="bg-neon text-black px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {status === 'IDLE' ? (
                    <>RUN_AUDIT <ChevronRight className="w-4 h-4" /></>
                  ) : (
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {status === 'IDLE' ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-32 h-32 border border-white/5 rounded-full flex items-center justify-center mx-auto relative">
                    <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-spin-slow"></div>
                    <Cpu className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 tracking-[0.5em] uppercase">Standing By for Signal</div>
                </motion.div>
              ) : status !== 'COMPLETE' ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md p-8 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                    <motion.div 
                      className="h-full bg-neon shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-mono text-neon uppercase tracking-widest">{status}...</span>
                    <Activity className="w-4 h-4 text-neon animate-pulse" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-white/10"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <div className="text-[8px] font-mono text-slate-600">DECRYPTING_NEURAL_NODES</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md bg-surface border border-neon/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(204,255,0,0.1)] relative"
                >
                  <div className="absolute -top-4 -right-4 bg-neon text-black p-3 rounded-2xl shadow-xl">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Signal Strength</div>
                      <div className="text-4xl font-bold text-white tabular-nums">{result?.signal}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Feasibility</div>
                      <div className="text-sm font-bold text-neon uppercase">{result?.feasibility}</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2 flex items-center gap-2">
                        <Binary className="w-3 h-3" /> Technical_Risk
                      </div>
                      <p className="text-xs text-rose-400 font-mono leading-relaxed">{result?.risk}</p>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-3">Recommended_Stack</div>
                      <div className="flex flex-wrap gap-2">
                        {result?.stack.map(s => (
                          <span key={s} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Architect's Summary</div>
                      <p className="text-sm text-slate-200 leading-relaxed font-light">{result?.summary}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setStatus('IDLE')}
                    className="w-full mt-8 py-4 border border-white/10 rounded-xl text-[10px] font-mono font-bold text-slate-500 hover:text-white hover:border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-3 h-3" /> RE-INITIALIZE_SYSTEM
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StrategyCenter;
