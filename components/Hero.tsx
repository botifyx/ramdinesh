
import React, { useEffect, useRef } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroProps {
  theme: 'dark' | 'light';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    const gap = 40;
    let animationFrameId: number;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Theme specific colors
    // BgFill matches the css --color-void variable
    const bgFill = theme === 'dark' ? '#050505' : '#f1f5f9'; 
    // Particle color must be visible against bg. 
    // Dark mode: #222 (Dark Grey on Black). Light mode: #94a3b8 (Slate 400 on Slate 100)
    const particleColor = theme === 'dark' ? '#222' : '#cbd5e1'; 
    const activeParticleColor = theme === 'dark' ? '#ccff00' : '#4f46e5'; // Neon vs Indigo

    const animate = () => {
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, width, height);
      
      time += 0.01;

      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      ctx.beginPath();
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * gap;
          const y = iy * gap;

          // Distance from mouse
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          
          // Wave effect
          const wave = Math.sin(ix * 0.2 + time) * Math.cos(iy * 0.2 + time) * 10;
          
          // Mouse repulsion/attraction
          const interaction = dist < maxDist ? (1 - dist / maxDist) * 30 : 0;

          const xFinal = x + interaction * (dx / dist);
          const yFinal = y + interaction * (dy / dist) + wave;

          // Draw points or small crosses
          if (ix < cols - 1) {
             // Horizontal lines
             // We will just draw dots for a matrix look
             ctx.fillStyle = dist < 200 ? activeParticleColor : particleColor;
             ctx.fillRect(xFinal, yFinal, 2, 2);
          }
        }
      }
      ctx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run effect when theme changes

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void transition-colors duration-300">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      
      {/* Abstract Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-12 bg-neon"></div>
                <span className="font-mono text-neon tracking-widest text-xs uppercase">Systems Architect // CTO</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8">
                ARCHITECTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">INTELLIGENCE</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl font-mono leading-relaxed border-l-2 border-white/10 pl-6 mb-10">
                I build AI-first products that transform chaos into clarity. 
                Currently scaling <span className="text-white border-b border-neon">BotifyX</span> and engineering the next generation of autonomous systems.
              </p>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="#portfolio"
                  onClick={(e) => scrollToId(e, 'portfolio')}
                  className="group relative px-8 py-4 bg-white text-black font-bold font-mono uppercase tracking-wider overflow-hidden cursor-pointer"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
                  <div className="absolute inset-0 bg-absolute-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
                
                <a 
                  href="#contact"
                  onClick={(e) => scrollToId(e, 'contact')}
                  className="group px-8 py-4 border border-white/20 text-white font-bold font-mono uppercase tracking-wider hover:bg-white/5 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Decorative Tech Stats */}
          <motion.div 
            style={{ y: y2 }}
            className="hidden lg:block lg:col-span-4 text-right"
          >
            <div className="space-y-8 border-r border-white/10 pr-8">
              <div className="group">
                <div className="text-xs font-mono text-slate-500 mb-1">CURRENT STATUS</div>
                <div className="text-xl font-bold text-white flex items-center justify-end gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-neon"></span>
                  </span>
                  ONLINE / BUILDING
                </div>
              </div>
              
              <div>
                <div className="text-xs font-mono text-slate-500 mb-1">FOCUS AREA</div>
                <div className="text-xl font-bold text-white">GEN-AI & AGENTS</div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-500 mb-1">LOCATION</div>
                <div className="text-xl font-bold text-white">CHENNAI, IN</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={(e) => scrollToId(e, 'about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer hover:text-neon transition-colors"
      >
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Initialize Scroll</span>
        <ArrowDown className="w-4 h-4 text-neon animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;