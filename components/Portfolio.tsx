
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Layers, Box } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 'nexus',
    title: 'NexusPM',
    description: 'AI Project Command Center',
    longDescription: 'Integrates with Jira/GitHub to predict blockers using NLP.',
    techStack: ['Python', 'FastAPI', 'React'],
    tags: ['AI Product'],
    category: 'AI Product'
  },
  {
    id: 'botify',
    title: 'BotifyX Core',
    description: 'Enterprise Automation Engine',
    longDescription: 'Multi-agent orchestration system for business process automation.',
    techStack: ['Node.js', 'Redis', 'Kafka'],
    tags: ['Architecture'],
    category: 'AI Product'
  },
  {
    id: 'legallens',
    title: 'LegalLens',
    description: 'Semantic Contract Analysis',
    longDescription: 'Vector search based risk highlighting for contracts.',
    techStack: ['LangChain', 'Pinecone', 'Next.js'],
    tags: ['RAG'],
    category: 'AI Product'
  },
  {
    id: 'shrunkx',
    title: 'ShrunkX',
    description: 'Adaptive Compression Tool',
    longDescription: 'Intelligent file optimization reducing storage costs.',
    techStack: ['Rust', 'WASM', 'AWS'],
    tags: ['Tool'],
    category: 'Tool'
  },
  {
    id: 'dreamui',
    title: 'DreamUI',
    description: 'Generative UI Experiment',
    longDescription: 'Prompt-to-Interface generation using Vercel AI SDK.',
    techStack: ['React', 'Tailwind', 'AI SDK'],
    tags: ['GenAI'],
    category: 'Experiment'
  }
];

const Portfolio: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-32 bg-void relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">SELECTED WORKS</h2>
            <p className="font-mono text-slate-500">(2025 — PRESENT)</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-neon font-mono text-xs mb-1">TOTAL PROJECTS</div>
            <div className="text-2xl font-bold text-white">08</div>
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
              className="group relative border-b border-white/10 py-12 cursor-pointer transition-all duration-500 hover:border-neon hover:bg-white/5 px-4"
            >
              <div className="flex flex-col md:flex-row justify-between items-baseline relative z-10">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-slate-600 group-hover:text-neon transition-colors">0{index + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-bold text-slate-300 group-hover:text-white group-hover:translate-x-4 transition-all duration-500">
                    {project.title}
                  </h3>
                </div>
                
                <div className="mt-4 md:mt-0 flex items-center gap-8">
                   <div className="hidden md:flex gap-2">
                      {project.techStack?.map(t => (
                        <span key={t} className="text-xs font-mono text-slate-500 px-2 py-1 border border-white/5 rounded-full">{t}</span>
                      ))}
                   </div>
                   <span className="text-lg text-slate-400 group-hover:text-neon font-mono hidden md:block">
                     {project.category}
                   </span>
                   <ArrowRight className="text-slate-600 group-hover:text-neon transform group-hover:-rotate-45 transition-all duration-500" />
                </div>
              </div>

              {/* Expanded Mobile / Details view */}
              <AnimatePresence>
                {activeId === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 pb-2 text-slate-400 font-mono max-w-xl ml-0 md:ml-12">
                      {project.longDescription || project.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
