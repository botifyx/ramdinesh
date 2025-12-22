
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Zap, Shield, Download, Sparkles, RefreshCcw, User, Terminal, Share2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const IdentityGenerator: React.FC = () => {
  const [name, setName] = useState('');
  const [intent, setIntent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    id: string;
    auraUrl: string;
    persona: string;
    clearance: string;
  } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isGenerating) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 1. Generate Persona Text
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a futuristic "Strategic Identity" for a person named ${name} who is focused on ${intent}. 
        Return a JSON object with:
        - persona: (one short, enigmatic sentence about their digital role)
        - clearance: (a high-tech sounding security level like 'LEVEL_9_ARCHITECT')
        `,
        config: { responseMimeType: "application/json" }
      });

      const { persona, clearance } = JSON.parse(textResponse.text || '{}');

      // 2. Generate Aura Image
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: `A futuristic, abstract neural aura visualization for the persona: ${persona}. Neon colors, deep black background, technical glitch art, high-tech pulse patterns, 8k.` }],
        config: { imageConfig: { aspectRatio: "1:1" } }
      });

      let auraUrl = '';
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          auraUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }

      setResult({
        id: `UID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        auraUrl,
        persona,
        clearance
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="id-gen" className="py-32 bg-void relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(204,255,0,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-neon"></div>
              <span className="font-mono text-neon text-[10px] uppercase tracking-[0.4em]">Grid_Onboarding_v1.2</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
              GENERATE YOUR <br />
              <span className="text-slate-500">NEURAL IDENTITY</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-10 max-w-md">
              Establish your presence in the Architect's domain. Your digital signature will be synthesized based on your intent.
            </p>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Subject_Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your identifier..."
                  className="w-full bg-surface border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-neon/50 transition-all font-mono text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest">Primary_Intent</label>
                <input 
                  type="text" 
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  placeholder="E.g. Disrupting Logistics, Scalable AI..."
                  className="w-full bg-surface border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-neon/50 transition-all font-mono text-sm"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isGenerating || !name.trim()}
                className="w-full bg-neon text-black font-bold py-5 rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    SYNTHESIZING...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    INITIATE_IDENTITY_SYNC
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="flex justify-center items-center">
            <AnimatePresence mode="wait">
              {!result && !isGenerating ? (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 group"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <User className="w-10 h-10 text-slate-700" />
                  </div>
                  <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.3em]">Identity Hub Standby</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-sm aspect-[3/4] bg-surface border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center overflow-hidden relative"
                >
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10"
                   >
                     <div className="w-full h-full border-[40px] border-dotted border-white/20 rounded-full scale-150"></div>
                   </motion.div>
                   <Terminal className="w-12 h-12 text-neon mb-6 animate-pulse" />
                   <div className="space-y-4 w-full">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-neon"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Compiling Neural Data</span>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 50, rotateY: 30 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  className="w-full max-w-sm aspect-[3/4] bg-surface border border-neon/30 rounded-[2.5rem] shadow-[0_0_50px_rgba(204,255,0,0.15)] p-1 relative group"
                >
                   <div className="bg-void h-full w-full rounded-[2.4rem] p-8 flex flex-col relative overflow-hidden">
                      {/* Aura Background */}
                      <div className="absolute top-0 left-0 w-full aspect-square opacity-30 blur-3xl pointer-events-none">
                        <img src={result.auraUrl} className="w-full h-full object-cover" />
                      </div>

                      <div className="flex justify-between items-start mb-8 relative z-10">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-mono text-neon font-bold uppercase tracking-widest">{result.clearance}</span>
                           <span className="text-[9px] font-mono text-slate-500 mt-1">{result.id}</span>
                        </div>
                        <Shield className="w-5 h-5 text-neon" />
                      </div>

                      <div className="aspect-square w-full rounded-2xl overflow-hidden mb-8 border border-white/10 relative z-10">
                        <img src={result.auraUrl} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                           <Sparkles className="w-3 h-3 text-neon" />
                           <span className="text-[8px] font-mono text-white uppercase tracking-widest">Neural Aura Confirmed</span>
                        </div>
                      </div>

                      <div className="relative z-10 flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">{name}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed font-light italic">
                          "{result.persona}"
                        </p>
                      </div>

                      <div className="relative z-10 pt-6 border-t border-white/5 flex gap-2">
                        <button className="flex-1 py-3 bg-white text-black rounded-xl text-[10px] font-bold font-mono hover:bg-neon transition-all flex items-center justify-center gap-2">
                           <Download className="w-3 h-3" /> EXPORT
                        </button>
                        <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">
                           <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IdentityGenerator;
