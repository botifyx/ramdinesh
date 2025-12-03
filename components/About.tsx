
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Cpu, Globe, ArrowRight, Activity, Zap, Layers } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 60,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toFixed(0) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className="inline-block min-w-[2ch]">0{suffix}</span>;
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-void border-t border-white/5 relative overflow-hidden">
      {/* Background Noise for Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzMzIiAvPgo8L3N2Zz4=')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Typography Heavy */}
          <div className="order-2 lg:order-1">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
            >
              I BRIDGE THE GAP BETWEEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">ABSTRACT AI</span> AND <br />
              REALITY.
            </motion.h2>

            <div className="space-y-8 text-lg text-slate-400 leading-relaxed font-light">
              <p>
                Technology without purpose is just noise. As a CTO and Product Strategist, I focus on the signal. I don't just write code; I engineer outcomes.
              </p>
              <p>
                My career has been defined by a relentless pursuit of automation—building systems that learn, adapt, and scale. At <strong className="text-white">BotifyX</strong>, I lead the charge in creating autonomous agents that redefine productivity.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="p-6 border border-white/10 hover:border-neon/50 transition-colors bg-surface/50 backdrop-blur-sm group rounded-xl">
                <div className="text-4xl font-mono font-bold text-white mb-2 group-hover:text-neon transition-colors">
                  <AnimatedCounter value={25} suffix="+" />
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="p-6 border border-white/10 hover:border-neon/50 transition-colors bg-surface/50 backdrop-blur-sm group rounded-xl">
                <div className="text-4xl font-mono font-bold text-white mb-2 group-hover:text-neon transition-colors">
                  <AnimatedCounter value={10} suffix="+" />
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">New Products Launched</div>
              </div>
            </div>
          </div>

          {/* Right: BotifyX Showcase (Enhanced Tech Card) */}
          <div className="order-1 lg:order-2 relative group perspective-[1000px]">
            {/* Dynamic Glow Behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-neon/20 via-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse-slow"></div>

            <motion.div
              initial={{ rotateY: 5, opacity: 0 }}
              whileInView={{ rotateY: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-full bg-[#080808] border border-white/10 rounded-2xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl"
            >

              {/* Subtle Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

              <div>
                {/* Header Section */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="relative p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-neon/50 group-hover:bg-neon/10 transition-all duration-300">
                      <Cpu className="w-8 h-8 text-white group-hover:text-neon transition-colors" />
                      {/* Ping Effect on Icon */}
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neon"></span>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-neon transition-colors">BotifyX</h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        SYSTEMS OPERATIONAL
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neon/5 border border-neon/20 rounded-full shadow-[0_0_10px_rgba(204,255,0,0.1)]">
                    <Zap className="w-3 h-3 text-neon" />
                    <span className="font-mono text-[10px] font-bold text-neon tracking-wider">CURRENT MISSION</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 mb-8 text-base leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-neon/50 transition-colors duration-300">
                  An AI-first product company engineering <span className="text-white font-bold">hyper-automation</span>.
                  We build the workforce of the future using autonomous multi-agent systems.
                </p>

                {/* Tech Specs / Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: Globe, label: 'Strategy', text: 'AI Roadmap' },
                    { icon: Layers, label: 'Architecture', text: 'Enterprise Scale' },
                    { icon: Terminal, label: 'Tech', text: 'LLM Integration' },
                    { icon: Activity, label: 'Leadership', text: 'Team Management' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 group/item hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
                      <item.icon className="w-4 h-4 text-slate-400 group-hover/item:text-neon transition-colors" />
                      <div>
                        <div className="text-[9px] uppercase text-slate-500 font-mono tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-xs font-bold text-white">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://www.botifyx.in"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group/btn flex items-center justify-between px-6 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider rounded-xl transition-all hover:bg-neon hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]"
              >
                <div className="flex flex-col items-start leading-none gap-1">
                  <span className="text-[10px] text-black/50 group-hover/btn:text-black/70">DESTINATION</span>
                  <span className="text-sm">VISIT COMPANY HQ</span>
                </div>
                <div className="bg-black/5 p-2 rounded-full group-hover/btn:bg-black/10 transition-colors">
                  <ArrowRight className="w-4 h-4 relative z-10 transform group-hover/btn:-rotate-45 transition-transform duration-300" />
                </div>
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
