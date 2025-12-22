
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Cpu, ShieldAlert, TrendingUp, Search, RefreshCw, Layers, Key } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const industries = ["Fintech", "HealthTech", "Supply Chain", "LegalTech", "CyberSecurity", "EdTech"];

const IndustryOracle: React.FC = () => {
  const [selected, setSelected] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [insight, setInsight] = useState<{
    disruption: string;
    risk: string;
    opportunity: string;
    timeline: string;
  } | null>(null);

  const handleScan = async (industry: string) => {
    setSelected(industry);
    setIsScanning(true);
    setInsight(null);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Provide a strategic AI disruption forecast for the ${industry} industry. 
        Return JSON with:
        - disruption: (2-sentence core technological shift)
        - risk: (primary industry blocker)
        - opportunity: (high-leverage move for founders)
        - timeline: (e.g. "Q4 2025 - Q2 2026")`,
        config: { responseMimeType: "application/json" }
      });
      setInsight(JSON.parse(response.text || '{}'));
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes("Requested entity was not found") || e.status === 404) {
        setError("PRO_MODEL_NOT_FOUND: Ensure your selected API key has access to gemini-3-pro-preview.");
      } else {
        setError("UPLINK_FAILURE: Core intelligence unreachable.");
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleKeySelect = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setError(null);
    }
  };

  return (
    <section id="oracle" className="py-32 bg-void relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6">
              <BrainCircuit className="w-3 h-3" /> Industry_Forecast_Link
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
              THE <span className="text-slate-500">INDUSTRY ORACLE</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-md">
              Target a sector to view its neural disruption roadmap. The Oracle resolves current signals into crystalline strategy.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {industries.map(ind => (
                <button
                  key={ind}
                  onClick={() => handleScan(ind)}
                  disabled={isScanning}
                  className={`px-6 py-3 rounded-xl border font-mono text-xs transition-all ${
                    selected === ind ? 'bg-blue-500 border-blue-400 text-white shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
                  <div className="font-mono text-[10px] text-blue-400 uppercase tracking-[0.4em] animate-pulse">Scanning_Network_Nerves</div>
                </motion.div>
              ) : error ? (
                <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full bg-surface border border-rose-500/30 p-8 rounded-3xl text-center">
                   <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                   <p className="text-xs font-mono text-slate-300 mb-6">{error}</p>
                   <button 
                    onClick={handleKeySelect}
                    className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-rose-500 text-white rounded-xl text-[10px] font-bold font-mono hover:bg-rose-600 transition-all"
                   >
                     <Key className="w-4 h-4" /> RE-SELECT_API_KEY
                   </button>
                </motion.div>
              ) : insight ? (
                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full bg-surface border border-blue-500/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-2xl font-bold text-white uppercase">{selected}</div>
                    <div className="text-[10px] font-mono text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">{insight.timeline}</div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg h-fit"><Cpu className="w-5 h-5 text-blue-400" /></div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Core_Disruption</div>
                        <p className="text-sm text-slate-200 font-light">{insight.disruption}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2 bg-rose-500/10 rounded-lg h-fit"><ShieldAlert className="w-5 h-5 text-rose-400" /></div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Structural_Risk</div>
                        <p className="text-sm text-slate-200 font-light">{insight.risk}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="p-2 bg-emerald-500/10 rounded-lg h-fit"><TrendingUp className="w-5 h-5 text-emerald-400" /></div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Strategic_Opportunity</div>
                        <p className="text-sm text-slate-200 font-light">{insight.opportunity}</p>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setInsight(null)} className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono text-slate-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <RefreshCw className="w-3 h-3" /> RESET_ORACLE
                  </button>
                </motion.div>
              ) : (
                <div className="text-center opacity-20">
                  <Layers className="w-20 h-20 text-slate-600 mx-auto mb-6" />
                  <div className="font-mono text-[10px] uppercase tracking-widest">Oracle_Standby</div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryOracle;
