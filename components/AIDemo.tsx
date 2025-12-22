
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Smartphone, Laptop, Globe, MessageCircle, Send, Loader2, Zap, Shield, Info, MapPin, Fingerprint, Languages } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface UserMetadata {
  os: string;
  browser: string;
  device: 'Mobile' | 'Laptop' | 'Desktop';
  language: string;
  languages: string[];
  timezone: string;
  screenSize: string;
  gpu?: string;
  cores?: number;
  memory?: number;
  ipData?: {
    ip: string;
    city: string;
    region: string;
    country: string;
    org: string;
  };
}

const AIDemo: React.FC = () => {
  const [metadata, setMetadata] = useState<UserMetadata | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isFirstMessageRef = useRef(true);

  useEffect(() => {
    const detectEnvironment = async () => {
      const ua = navigator.userAgent;
      const nav = navigator as any;
      
      let os = 'Unknown OS';
      if (ua.indexOf('Win') !== -1) os = 'Windows';
      if (ua.indexOf('Mac') !== -1) os = 'macOS';
      if (ua.indexOf('Linux') !== -1) os = 'Linux';
      if (ua.indexOf('Android') !== -1) os = 'Android';
      if (ua.indexOf('like Mac') !== -1) os = 'iOS';

      const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
      const deviceType = isMobile ? 'Mobile' : (window.innerWidth > 1024 ? 'Desktop' : 'Laptop');

      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      let gpu = 'Unknown';
      if (gl) {
        const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          gpu = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
      }

      const baseData: UserMetadata = {
        os,
        browser: ua.split(' ').pop() || 'Modern Browser',
        device: deviceType,
        language: navigator.language,
        languages: [...navigator.languages],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenSize: `${window.screen.width}x${window.screen.height}`,
        gpu,
        cores: navigator.hardwareConcurrency,
        memory: (navigator as any).deviceMemory
      };

      setMetadata(baseData);

      try {
        const response = await fetch('https://ipapi.co/json/');
        const ipJson = await response.json();
        if (ipJson && !ipJson.error) {
          setMetadata(prev => prev ? {
            ...prev,
            ipData: {
              ip: ipJson.ip,
              city: ipJson.city,
              region: ipJson.region,
              country: ipJson.country_name,
              org: ipJson.org
            }
          } : null);
        }
      } catch (e) {
        console.warn("IP Geo fetch failed.");
      }
    };

    detectEnvironment();
  }, []);

  useEffect(() => {
    if (metadata && messages.length === 0) {
      const locationStr = metadata.ipData ? `${metadata.ipData.city}, ${metadata.ipData.country}` : 'your sector';
      setMessages([{ 
        role: 'bot', 
        text: `Signal established from ${locationStr}. I've synchronized with your ${metadata.os} environment. How shall we begin our localized assessment?` 
      }]);
    }
  }, [metadata]);

  const scrollToBottom = () => {
    // Only scroll to bottom if it's NOT the very first message being added automatically on load
    if (isFirstMessageRef.current && messages.length > 0) {
      isFirstMessageRef.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMessage = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemPrompt = `
        You are "RAMDINESH_CORE_LAB", a hyper-intelligent, localized persona representing Ramdinesh's AI expertise.
        
        VISITOR PROFILE (EXTRACTED):
        - OS: ${metadata?.os} (${metadata?.device})
        - BROWSER: ${metadata?.browser}
        - HARDWARE: ${metadata?.cores} Cores, ${metadata?.memory}GB RAM, GPU: ${metadata?.gpu}
        - LANGUAGE: ${metadata?.language} (Supported: ${metadata?.languages.join(', ')})
        - TIMEZONE: ${metadata?.timezone}
        - IP_GEO: ${metadata?.ipData?.city}, ${metadata?.ipData?.region}, ${metadata?.ipData?.country} (Network: ${metadata?.ipData?.org})

        STRICT RESPONSE GUIDELINES:
        1. LOCALIZATION: Use the visitor's detected location and language to tailor your response. If they are in India, use specific regional greetings (e.g., "Vanakkam" for Chennai/Tamil Nadu, "Namaste" otherwise). If in Europe, adapt accordingly.
        2. CULTURE: Align your conversational style with their region's culture. Use local metaphors or tech references if they make sense.
        3. ENVIRONMENT AWARENESS: Mention their specific hardware or OS if it adds value.
        4. IDENTITY GUESSING: Consistently "Tech-Noir". Professional, enigmatic, and high-signal.
        5. LANGUAGE SWITCHING: If the user speaks in their local language, respond fluently in that same language.
        
        RAMDINESH CONTEXT:
        - Ramdinesh is a CTO based in Chennai, specializing in Autonomous Agents and System Architecture.
        - His lab, BotifyX, focuses on "Architecting Intelligence".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        },
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "System failure. Transmission lost." }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: "Neural link timeout. Please re-initiate." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="ai-lab" className="py-32 bg-void relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[120px] opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-neon font-mono text-xs tracking-widest justify-center lg:justify-start">
              <Zap className="w-4 h-4" />
              NEURAL_LOCALIZATION_SANDBOX_v2.5
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">INTELLIGENCE <span className="text-slate-500">LAB</span></h2>
            <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
              Experience <span className="text-white">Contextual Hyper-Personalization</span>. This interface leverages your unique environmental fingerprint to deliver a conversation that adapts to your culture, location, and hardware.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 group hover:border-neon/40 transition-colors">
              <Shield className="w-3 h-3 text-neon" />
              <span className="text-[10px] font-mono text-slate-300">PRIVACY_ENCRYPTED</span>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 group hover:border-blue-400/40 transition-colors">
              <Globe className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-mono text-slate-300 uppercase">IP_GEOLINK_ACTIVE</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-surface border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl"
          >
            <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2 text-sm tracking-tight">
                <Fingerprint className="w-4 h-4 text-neon" />
                SYSTEM_FINGERPRINT
              </h3>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-neon/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-neon/20"></div>
              </div>
            </div>
            
            <div className="p-6 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Architecture</div>
                  <div className="text-white font-bold text-xs truncate flex items-center gap-1.5">
                    <Cpu className="w-3 h-3 text-neon" /> {metadata?.os || 'SCANNING...'}
                  </div>
                </div>
                <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Node Type</div>
                  <div className="text-white font-bold text-xs flex items-center gap-1.5">
                    {metadata?.device === 'Mobile' ? <Smartphone className="w-3 h-3 text-neon" /> : <Laptop className="w-3 h-3 text-neon" />} 
                    {metadata?.device || 'DETECTING...'}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                 <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500 uppercase">Compute Resources</span>
                    <span className="text-neon">{metadata?.cores || '--'} vCPUs</span>
                 </div>
                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: metadata?.cores ? `${(metadata.cores / 32) * 100}%` : 0 }}
                      className="h-full bg-neon shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                    />
                 </div>
                 <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span className="truncate max-w-[150px]">{metadata?.gpu || 'Software Rendering'}</span>
                    <span>{metadata?.memory ? `${metadata.memory}GB RAM` : '--'}</span>
                 </div>
              </div>

              <div className="p-4 bg-neon/5 rounded-xl border border-neon/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">Preferred Lang</span>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3 h-3 text-neon" />
                    <span className="text-xs font-mono text-neon font-bold">{metadata?.language.toUpperCase() || 'SCANNING'}</span>
                  </div>
                </div>
                
                {metadata?.ipData && (
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">Signal Source</span>
                        <span className="text-[10px] font-mono text-blue-400 font-bold">{metadata.ipData.ip}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">Geo Location</span>
                        <span className="text-[10px] font-mono text-white truncate ml-4">
                            {metadata.ipData.city}, {metadata.ipData.country}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">Carrier/Org</span>
                        <span className="text-[9px] font-mono text-slate-400 truncate ml-4 italic">{metadata.ipData.org}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-auto border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono italic leading-relaxed">
                  <Info className="w-3 h-3 flex-shrink-0" />
                  <span>Real-time fingerprinting active. Responses are localized to your detected geography.</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-surface border border-white/10 rounded-2xl flex flex-col h-[650px] shadow-2xl relative overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/30 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-neon to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-surface rounded-full shadow-lg"></div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    RAMDINESH_CORE_BOT
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">ONLINE</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase flex items-center gap-1.5">
                    <MessageCircle className="w-2.5 h-2.5" /> Contextual_Response_Stream
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-slate-600 uppercase">Timezone</span>
                    <span className="text-[10px] font-mono text-slate-300">{metadata?.timezone || 'UTC'}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono scrollbar-hide bg-void/30">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`group relative max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-neon text-black rounded-tr-none font-medium shadow-lg' 
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none backdrop-blur-sm'
                    }`}>
                      {msg.text}
                      <div className={`absolute bottom-[-16px] text-[8px] text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'user' ? 'right-0' : 'left-0'}`}>
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex justify-start"
                  >
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-3">
                      <div className="flex gap-1">
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="w-1.5 h-1.5 bg-neon rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                          className="w-1.5 h-1.5 bg-neon rounded-full"
                        />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                          className="w-1.5 h-1.5 bg-neon rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-neon uppercase tracking-widest font-bold">Localizing_Response...</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-xl">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Initiate localized transmission..."
                  className="flex-1 bg-void/50 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-sm focus:outline-none focus:border-neon/50 transition-all placeholder:text-slate-700"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="p-4 bg-neon text-black rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiIC8+Cjwvc3ZnPg==')]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIDemo;
