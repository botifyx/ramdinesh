import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Cpu, CheckCircle2, Activity, Layers, GitCommit } from 'lucide-react';

const ModelTraining: React.FC = () => {
  const [currentLog, setCurrentLog] = useState(0);
  
  const logs = [
    "> INITIATING_SEQUENCE: DATA_INGESTION_V4",
    "> LOADING_DATASET: 'LEGAL_CORPUS_50K'",
    "> TOKENIZATION_PROGRESS: 100% [||||||||||]",
    "> ARCHITECTURE: TRANSFORMER_ENCODER_LARGE",
    "> OPTIMIZER: ADAM_W | LR: 2e-5",
    "> EPOCH 1/5: LOSS=0.452 ACC=0.78",
    "> EPOCH 2/5: LOSS=0.310 ACC=0.85",
    "> EPOCH 3/5: LOSS=0.199 ACC=0.91",
    "> VALIDATING_CHECKPOINT: INTELLIGENCE_REACHED",
    "> MODEL_SAVED: /artifacts/weights/legal_lens_v2.bin"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLog(prev => (prev + 1) % logs.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const models = [
    {
      title: "LegalLens BERT",
      type: "Discriminative Model",
      data: "50k Proprietary Legal Clauses",
      process: "Domain-Adaptive Pre-training (DAPT) + Fine-tuning",
      outcome: "94% F1 Score in Risk Classification",
      status: "Deployed",
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
    },
    {
      title: "Botify Orchestrator 7B",
      type: "Generative Model (LLM)",
      data: "100k Workflow Execution Logs",
      process: "QLoRA (Quantized Low-Rank Adaptation) on Llama 3",
      outcome: "Reduced Function Calling Latency by 40%",
      status: "Training",
      color: "border-blue-500/30 text-blue-400 bg-blue-500/5"
    }
  ];

  const pipelineSteps = [
    { icon: Database, title: "Curation", desc: "Synthetic Data Gen & Cleaning" },
    { icon: Layers, title: "Tokenization", desc: "Custom Vocab & Embeddings" },
    { icon: Cpu, title: "Fine-Tuning", desc: "Multi-GPU Cluster (A100s)" },
    { icon: Activity, title: "Evaluation", desc: "Human-in-the-loop (RLHF)" },
  ];

  return (
    <section className="py-24 bg-void border-y border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
             <div className="h-[1px] w-12 bg-blue-500"></div>
             <span className="font-mono text-blue-500 tracking-widest text-xs uppercase">Neural Forge</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            TRAINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">INTELLIGENCE</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
             Using proprietary datasets to build domain-specific models. From predictive risk analysis to autonomous agent orchestration, the focus is on <span className="text-white">data quality</span> and <span className="text-white">evaluation metrics</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
           
           {/* Left: Terminal Simulation - Forced Dark Mode for Aesthetic */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-absolute-black border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm relative h-full min-h-[300px]"
           >
              <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-slate-500" />
                 <span className="text-slate-500 text-xs">training_cluster_01 — ssh — 80x24</span>
              </div>
              <div className="p-6 space-y-3">
                 {logs.map((log, i) => (
                    <div key={i} className={`${i === currentLog ? 'text-blue-400' : 'text-slate-400'} transition-colors duration-300`}>
                       <span className="mr-2 opacity-50">$</span>
                       {log}
                       {i === currentLog && <span className="animate-pulse inline-block w-2 h-4 bg-blue-400 ml-1 align-middle"></span>}
                    </div>
                 ))}
              </div>
           </motion.div>

           {/* Right: Model Cards */}
           <div className="flex flex-col gap-6">
              {models.map((model, idx) => (
                 <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-xl border ${model.color} bg-surface hover:bg-opacity-80 transition-all group`}
                 >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">{model.title}</h3>
                        <span className={`px-2 py-1 text-[10px] font-bold border rounded uppercase tracking-wider ${model.status === 'Deployed' ? 'border-emerald-500 text-emerald-500' : 'border-blue-500 text-blue-500'}`}>
                            {model.status}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Dataset</div>
                            <div className="text-slate-300 font-mono">{model.data}</div>
                        </div>
                        <div>
                             <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">Outcome</div>
                             <div className="text-white font-bold flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                {model.outcome}
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                           <GitCommit className="w-3 h-3" />
                           Process: <span className="text-slate-300">{model.process}</span>
                        </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Pipeline Steps */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {pipelineSteps.map((step, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.2 + (i * 0.1) }}
                   className="text-center group"
                >
                    <div className="w-12 h-12 mx-auto bg-surface rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shadow-md">
                        <step.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                    </div>
                    <h4 className="text-white font-bold mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">{step.desc}</p>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default ModelTraining;