
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Database, Zap, Globe, Shield, Brain } from 'lucide-react';

const ventures = [
  {
    id: 'taintra',
    title: 'Taintra',
    description: 'AI + Ancient Wisdom. A digital sanctuary.',
    url: 'https://www.taintra.com',
    icon: <Sparkles className="w-6 h-6" />,
    colSpan: "md:col-span-2",
    image: "https://image.pollinations.ai/prompt/mystical%20ancient%20temple%20architecture%20blending%20with%20glowing%20digital%20neural%20networks%20gold%20dust%20particles%20cinematic%20lighting%20dark%20background?width=1024&height=768&nologo=true"
  },
  {
    id: 'learn',
    title: 'Learn Through Analogy',
    description: 'Complex Tech made simple.',
    url: 'https://www.learnthroughanalogy.com',
    icon: <Database className="w-6 h-6" />,
    colSpan: "md:col-span-1",
    image: "https://image.pollinations.ai/prompt/abstract%20minimalist%20blueprint%20connecting%20complex%20chaos%20to%20simple%20geometric%20shapes%20neon%20blue%20lines%20educational%20tech?width=600&height=600&nologo=true"
  },
  {
    id: 'aicopzy',
    title: 'AICopzy',
    description: 'Productivity Copilots.',
    url: 'https://www.aicopzy.com',
    icon: <Zap className="w-6 h-6" />,
    colSpan: "md:col-span-1",
    image: "https://image.pollinations.ai/prompt/futuristic%20iron%20man%20hud%20interface%20productivity%20dashboard%20glowing%20cyan%20data%20elements%20dark%20tech%20background?width=600&height=600&nologo=true"
  },
  {
    id: 'ibmwatson',
    title: 'IBMWatsonAI.com',
    description: 'The Adaptive Web Experiment.',
    url: 'https://www.ibmwatsonai.com',
    icon: <Brain className="w-6 h-6" />,
    colSpan: "md:col-span-2",
    image: "https://image.pollinations.ai/prompt/artificial%20intelligence%20fluid%20simulation%20digital%20brain%20synapses%20glowing%20blue%20nodes%20connecting%20in%20void%20space%20abstract?width=1024&height=768&nologo=true"
  },
  {
    id: 'yoba',
    title: 'YoBaeXo',
    description: 'Future AI Music.',
    url: 'https://www.yobaexo.com',
    icon: <Globe className="w-6 h-6" />,
    colSpan: "md:col-span-1",
    image: "https://image.pollinations.ai/prompt/cyberpunk%20laboratory%20innovation%20glowing%20purple%20neon%20lights%20futuristic%20technology%20experimental%20device?width=600&height=600&nologo=true"
  },
  {
    id: 'cyber',
    title: 'Cyber Legal',
    description: 'Tech & Law.',
    url: 'https://www.cyberlegalexperts.com',
    icon: <Shield className="w-6 h-6" />,
    colSpan: "md:col-span-2",
    image: "https://image.pollinations.ai/prompt/digital%20security%20concept%20glowing%20shield%20lock%20on%20binary%20code%20matrix%20background%20blue%20and%20silver%20legal%20tech?width=1024&height=768&nologo=true"
  }
];

const Ventures: React.FC = () => {
  return (
    <section id="ventures" className="py-32 bg-void relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <h2 className="text-4xl font-bold text-white mb-2">VENTURES</h2>
             <p className="font-mono text-neon text-sm">ECOSYSTEM OVERVIEW_</p>
          </div>
          <div className="text-right text-slate-500 max-w-md mt-6 md:mt-0 font-mono text-sm">
            A constellation of platforms I've founded to explore the frontiers of productivity, education, and experimental interfaces.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {ventures.map((venture, index) => (
            <motion.a
              key={venture.id}
              href={venture.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${venture.colSpan} group relative rounded-xl overflow-hidden border border-white/10 hover:border-neon transition-all duration-500`}
            >
              {/* AI Generated Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={venture.image} 
                  alt={venture.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                {/* Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              </div>

              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-neon group-hover:bg-neon group-hover:text-black transition-colors duration-300">
                     {venture.icon}
                   </div>
                   <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-neon group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon transition-colors">
                    {venture.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-mono border-l-2 border-white/20 pl-3 group-hover:border-neon transition-colors">
                    {venture.description}
                  </p>
                </div>
              </div>
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ventures;