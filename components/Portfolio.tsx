
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Layers, Box, Cpu, Zap, Shield, Sparkles } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'nexus',
    title: 'NexusPM',
    description: 'Predictive Engineering Intelligence Platform',
    longDescription: 'Architected an autonomous command center that bridges the gap between Jira tickets and GitHub commits. By utilizing advanced NLP and sentiment analysis on development signals, NexusPM predicts sprint slippage and identifies hidden technical debt before it manifests as a production blocker. Realized a 22% improvement in delivery predictability for pilot teams.',
    techStack: ['Gemini 2.5 Pro', 'LangChain', 'FastAPI', 'PostgreSQL', 'React'],
    tags: ['AI Product', 'Enterprise'],
    category: 'AI Product'
  },
  {
    id: 'botify',
    title: 'BotifyX Core',
    description: 'Multi-Agent Orchestration Engine',
    longDescription: 'The backbone of the "Workforce of the Future." BotifyX Core is a scalable infrastructure for deploying and managing swarms of autonomous agents. It handles state persistence, cross-agent communication, and self-healing task loops, enabling enterprises to automate high-complexity operational workflows that previously required manual oversight.',
    techStack: ['Node.js', 'Redis', 'OpenAI Swarm', 'Kafka', 'Docker'],
    tags: ['Architecture', 'Agents'],
    category: 'AI Product'
  },
  {
    id: 'legallens',
    title: 'LegalLens',
    description: 'Semantic Risk & Compliance Analyst',
    longDescription: 'A domain-specific RAG (Retrieval-Augmented Generation) application designed for the legal industry. LegalLens processes massive contract corpuses via vector embeddings to highlight non-standard clauses and regulatory risks. It transforms days of manual legal review into minutes of high-confidence semantic analysis.',
    techStack: ['Pinecone', 'Python', 'LangChain', 'Next.js', 'GPT-4o'],
    tags: ['RAG', 'LegalTech'],
    category: 'AI Product'
  },
  {
    id: 'shrunkx',
    title: 'ShrunkX',
    description: 'Adaptive Edge Compression Protocol',
    longDescription: 'A high-performance Rust-based utility for real-time asset optimization. ShrunkX leverages WASM to perform intelligent, lossy/lossless compression at the edge, significantly reducing egress costs and improving First Contentful Paint (FCP) for data-heavy platforms. Engineered for the 0.1% performance tier.',
    techStack: ['Rust', 'WASM', 'AWS Lambda@Edge', 'TypeScript'],
    tags: ['Tool', 'Performance'],
    category: 'Tool'
  },
  {
    id: 'dreamui',
    title: 'DreamUI',
    description: 'Generative Interface Synthesis',
    longDescription: 'An experimental framework exploring the transition from static UI to "Generative Component Architectures." DreamUI synthesizes interfaces in real-time based on user intent and contextual state, moving away from rigid templates toward a fluid, intent-driven digital experience.',
    techStack: ['Vercel AI SDK', 'Claude 3.5 Sonnet', 'React', 'Tailwind'],
    tags: ['GenAI', 'UX Research'],
    category: 'Experiment'
  }
];

const Portfolio: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-32 bg-void relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 text-neon font-mono text-xs tracking-widest">
              <Layers className="w-4 h-4" />
              DEPLOYED_SOLUTIONS_MANIFEST
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">PROJECT <span className="text-slate-500">PORTFOLIO</span></h2>
            <p className="font-mono text-slate-500 text-sm">ARCHITECTING HIGH-LEVERAGE OUTCOMES_</p>
          </div>
          <div className="text-right">
            <div className="text-neon font-mono text-[10px] mb-1 tracking-widest uppercase">Global Impact Score</div>
            <div className="text-3xl font-bold text-white font-mono">98.4%<span className="text-neon text-sm ml-1">↑</span></div>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onMouseEnter={() => setActiveId(project.id)}
              onMouseLeave={() => setActiveId(null)}
              className="group relative border-b border-white/5 py-10 cursor-pointer transition-all duration-500 hover:bg-white/[0.02] px-4 md:px-8 overflow-hidden"
            >
              {/* Animated Background Line for Active State */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-neon transform transition-transform duration-500 origin-top ${activeId === project.id ? 'scale-y-100' : 'scale-y-0'}`}></div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
                <div className="flex items-center gap-6 md:gap-10">
                  <span className="font-mono text-xs text-slate-600 group-hover:text-neon transition-colors tabular-nums">0{index + 1}</span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-slate-400 group-hover:text-white transition-all duration-500">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest group-hover:text-neon/70 transition-colors">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 self-end md:self-center">
                   <div className="hidden lg:flex gap-2">
                      {project.techStack?.slice(0, 3).map(t => (
                        <span key={t} className="text-[10px] font-mono text-slate-500 px-3 py-1 bg-white/5 border border-white/5 rounded-full whitespace-nowrap group-hover:border-white/20 transition-colors">{t}</span>
                      ))}
                      {project.techStack && project.techStack.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-600 px-3 py-1 bg-white/5 border border-white/5 rounded-full whitespace-nowrap">+{project.techStack.length - 3}</span>
                      )}
                   </div>
                   <div className="hidden md:flex items-center gap-3">
                     <span className="text-sm text-slate-500 group-hover:text-neon font-mono uppercase tracking-tighter">
                       {project.category}
                     </span>
                     <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:border-neon group-hover:bg-neon group-hover:text-black transition-all duration-500">
                       <ArrowRight className="w-4 h-4 transform group-hover:-rotate-45 transition-transform" />
                     </div>
                   </div>
                </div>
              </div>

              {/* Expanded Details Content */}
              <AnimatePresence>
                {activeId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-8 ml-0 md:ml-16">
                      <div className="lg:col-span-8">
                        <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                          {project.longDescription}
                        </p>
                      </div>
                      <div className="lg:col-span-4 space-y-4">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-2">Technical_Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack?.map(tech => (
                            <div key={tech} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                              <Zap className="w-2 h-2 text-neon" />
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        
        {/* Footer Lab Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <a href="#ai-lab" className="group flex items-center gap-4 text-xs font-mono text-slate-500 hover:text-white transition-colors">
            <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-neon transition-all duration-500"></span>
            EXPLORE THE EXPERIMENTAL LAB
            <Sparkles className="w-3 h-3 text-neon" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
