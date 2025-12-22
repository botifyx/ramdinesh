
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Globe, Rocket, Terminal, Activity } from 'lucide-react';

const predictions = [
  {
    year: "2025",
    signal: "Agent Swarms",
    verdict: "The transition from 'Tools' to 'Teammates'. Autonomous systems handle multi-step reasoning with human-in-the-loop oversight.",
    probability: 98,
    icon: Brain,
    color: "text-blue-400"
  },
  {
    year: "2026",
    signal: "Real-time World Models",
    verdict: "AI develops intuitive physics and spatial awareness. Robotics and simulation achieve hyper-fidelity, enabling digital-twin testing for everything.",
    probability: 85,
    icon: Globe,
    color: "text-emerald-400"
  },
  {
    year: "2027",
    signal: "Edge Intelligence",
    verdict: "LLMs shrink to gigabytes while maintaining capability. Every IoT device becomes a decision-making node. Privacy-first, localized AI.",
    probability: 92,
    icon: Cpu,
    color: "text-neon"
  },
  {
    year: "2028",
    signal: "Bio-Synthetic Fusion",
    verdict: "AI interfaces directly with organic data streams. Precision medicine and neuro-tech accelerate via high-bandwidth machine interaction.",
    probability: 60,
    icon: Activity,
    color: "text-rose-500"
  },
  {
    year: "2030",
    signal: "Neural Sovereignty",
    verdict: "Distributed AI networks manage global resource allocation. The Architect's vision: Technology becomes the invisible infrastructure of existence.",
    probability: 45,
    icon: Rocket,
    color: "text-purple-500"
  }
];

const FutureHorizon: React.FC = () => {
  return (
    <section id="future-horizon" className="py-32 bg-void relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3 text-neon" /> Temporal_Forecasting
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
            NEURAL <span className="text-slate-500">HORIZON 2030</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mt-6 text-lg font-light">
            An architect's projection of the technological convergence. Signals interpreted from current research and trajectory.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon/50 via-blue-500/20 to-transparent"></div>

          <div className="space-y-24">
            {predictions.map((p, idx) => (
              <motion.div 
                key={p.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-start gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Year Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-void border-2 border-neon shadow-[0_0_10px_rgba(204,255,0,0.5)] z-10 mt-1.5 md:mt-10"></div>
                
                {/* Content Card */}
                <div className="flex-1 ml-16 md:ml-0 md:w-1/2">
                   <div className="group relative bg-surface border border-white/5 p-8 rounded-3xl hover:border-white/20 transition-all duration-500">
                      <div className={`text-5xl font-bold mb-4 ${p.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                        {p.year}
                      </div>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-3 bg-white/5 rounded-xl ${p.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                          <p.icon className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-white group-hover:text-neon transition-colors uppercase tracking-tight">{p.signal}</h3>
                           <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Status: Active Trend</div>
                        </div>
                      </div>

                      <p className="text-slate-300 font-light leading-relaxed mb-8 border-l border-white/10 pl-4 group-hover:border-neon/30 transition-colors">
                        {p.verdict}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Confidence Rating</div>
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                              <motion.div 
                                className={`h-full ${p.color.replace('text-', 'bg-')}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${p.probability}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                              />
                           </div>
                           <span className="text-xs font-bold text-white font-mono">{p.probability}%</span>
                        </div>
                      </div>
                   </div>
                </div>

                {/* Empty spacer for grid alignment */}
                <div className="hidden md:block md:flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
            <div className="p-8 border border-white/5 bg-surface/50 backdrop-blur-md rounded-[2.5rem] max-w-2xl mx-auto flex flex-col items-center gap-6">
               <Terminal className="w-10 h-10 text-slate-700" />
               <p className="text-slate-400 font-mono text-sm leading-relaxed">
                  "The best way to predict the future is to architect it." <br />
                  <span className="text-white">— Ramdinesh Boopalan</span>
               </p>
               <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FutureHorizon;
