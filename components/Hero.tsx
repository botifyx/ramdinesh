
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Headphones, Zap, Activity, Volume2 } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";

interface HeroProps {
  theme: 'dark' | 'light';
  autoSync?: boolean;
}

const Hero: React.FC<HeroProps> = ({ theme, autoSync }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visualizerRef = useRef<HTMLCanvasElement>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Typewriter Effect State
  const words = ["INTELLIGENCE", "AUTONOMY", "SYSTEMS", "OUTCOMES"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullWord = words[currentWordIndex];
      if (isDeleting) {
        setDisplayText(prev => prev.substring(0, prev.length - 1));
        setSpeed(75);
      } else {
        setDisplayText(prev => currentFullWord.substring(0, prev.length + 1));
        setSpeed(150);
      }
      if (!isDeleting && displayText === currentFullWord) {
        setSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex(prev => (prev + 1) % words.length);
        setSpeed(500);
      }
    };
    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, speed]);

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const startVisualizer = (analyser: AnalyserNode) => {
    const canvas = visualizerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isPlaying) return;
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = theme === 'dark' ? `rgba(204, 255, 0, ${dataArray[i] / 255})` : `rgba(79, 70, 229, ${dataArray[i] / 255})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  };

  const handleAudioSync = async () => {
    if (isSyncing || isPlaying) return;
    setIsSyncing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let locationText = "traveler";
      let timeContext = "at this hour";
      
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        if (geoData.city) {
          locationText = `colleague in ${geoData.city}`;
          const hour = new Date().getHours();
          if (hour < 12) timeContext = "morning";
          else if (hour < 17) timeContext = "afternoon";
          else timeContext = "evening";
        }
      } catch (e) {}

      const prompt = `Say: "Handshake complete. Good ${timeContext}, ${locationText}. I am the Architect's auxiliary interface. Neural grid is active. How shall we proceed?" Tone: Deep, calm, tech-noir.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        setIsSyncing(false);
        setIsPlaying(true);
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        
        const audioData = decodeBase64(base64Audio);
        const audioBuffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        
        source.onended = () => {
          setIsPlaying(false);
          setHasSynced(true);
        };
        
        startVisualizer(analyser);
        source.start();
      }
    } catch (e) {
      console.error("Audio Sync Failed:", e);
      setIsSyncing(false);
    }
  };

  // If autoSync is passed (e.g. from handshake click), trigger the audio
  useEffect(() => {
    if (autoSync && !hasSynced && !isSyncing && !isPlaying) {
      handleAudioSync();
    }
  }, [autoSync]);

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
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', handleMouseMove);
    const bgFill = theme === 'dark' ? '#050505' : '#f8fafc'; 
    const particleColor = theme === 'dark' ? '#222' : '#e2e8f0'; 
    const activeParticleColor = theme === 'dark' ? '#ccff00' : '#4f46e5'; 
    const animate = () => {
      ctx.fillStyle = bgFill;
      ctx.fillRect(0, 0, width, height);
      time += 0.01;
      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const x = ix * gap;
          const y = iy * gap;
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;
          const wave = Math.sin(ix * 0.2 + time) * Math.cos(iy * 0.2 + time) * 10;
          const interaction = dist < maxDist ? (1 - dist / maxDist) * 30 : 0;
          const xFinal = x + interaction * (dx / dist);
          const yFinal = y + interaction * (dy / dist) + wave;
          ctx.fillStyle = dist < 200 ? activeParticleColor : particleColor;
          ctx.fillRect(xFinal, yFinal, 2, 2);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-void">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-3">
                   <div className="h-[1px] w-12 bg-neon"></div>
                   <span className="font-mono text-neon tracking-widest text-xs uppercase">Systems Architect // CTO</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleAudioSync}
                    className={`group relative flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-500 text-[10px] font-mono tracking-widest ${
                      isPlaying ? 'border-neon bg-neon text-black' : hasSynced ? 'border-neon/40 text-neon bg-neon/5' : 'border-white/20 text-slate-400 hover:border-white hover:text-white bg-white/5'
                    }`}
                  >
                    {isSyncing ? <Zap className="w-3 h-3 animate-pulse" /> : isPlaying ? <Activity className="w-3 h-3" /> : <Headphones className="w-3 h-3" />}
                    <span className="relative z-10">{isSyncing ? 'UPLINKING...' : isPlaying ? 'TRANSMITTING' : hasSynced ? 'INITIALIZE NEURAL' : 'INITIALIZE NEURAL'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 80 }} exit={{ opacity: 0, width: 0 }} className="h-8 overflow-hidden">
                        <canvas ref={visualizerRef} width="80" height="32" className="w-full h-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white leading-[0.85] tracking-tighter mb-12">
                ARCHITECTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600">
                  {displayText}<span className="text-neon animate-pulse inline-block h-[0.7em] w-[1ch] bg-neon ml-2 relative top-2"></span>
                </span>
              </h1>
              
              <div className="max-w-2xl mb-12">
                <p className="text-lg md:text-xl text-slate-400 font-mono leading-relaxed border-l-2 border-white/10 pl-6">
                  Engineering high-leverage outcomes for the next era of <span className="text-white">autonomous intelligence</span>. Currently building at <span className="text-neon">BotifyX</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#id-gen" className="px-10 py-5 bg-white text-black font-bold font-mono uppercase tracking-[0.2em] text-xs hover:bg-neon transition-all shadow-xl">GENERATE_IDENTITY</a>
                <a href="#agent-lab" className="px-10 py-5 border border-neon/50 text-neon font-bold font-mono uppercase tracking-[0.2em] text-xs hover:bg-neon/5 transition-all">ENTER_LAB</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-slate-500 hover:text-neon">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};

export default Hero;
