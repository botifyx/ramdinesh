
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Shield, Zap, Target, Activity, Terminal, 
  ChevronRight, Share2, Download, Layers, Database, 
  Scan, Box, Loader2, Sparkles, Image as ImageIcon,
  CheckCircle2, AlertCircle, Radio
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type AgentStatus = 'IDLE' | 'THINKING' | 'GENERATING_ASSET' | 'SYNTHESIZING' | 'COMPLETE' | 'FAILED';
type OrchestrationPhase = 'INITIALIZING' | 'STRATEGY' | 'VISUALIZATION' | 'SYNTHESIS' | 'FINALIZING';

interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  subStatus: string;
  progress: number;
  color: string;
  type: 'STRATEGIST' | 'ARCHITECT' | 'SECURITY';
}

// --- Dynamic Agent Avatars with Enhanced Animations ---

const StrategistIcon = ({ status, color }: { status: AgentStatus, color: string }) => (
  <svg viewBox="0 0 40 40" className={`w-full h-full p-1.5 ${color}`}>
    <defs>
      <filter id="glow-strategist">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <motion.circle 
      cx="20" cy="20" r="5" 
      fill="currentColor" 
      filter="url(#glow-strategist)"
      animate={status === 'THINKING' ? { 
        scale: [1, 1.5, 1], 
        opacity: [0.6, 1, 0.6],
        filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
      } : {}}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i}>
        <motion.line 
          x1="20" y1="20" 
          x2={20 + 14 * Math.cos((angle * Math.PI) / 180)} 
          y2={20 + 14 * Math.sin((angle * Math.PI) / 180)} 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="1 3"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={status === 'THINKING' ? { 
            pathLength: [0, 1, 0],
            opacity: [0.2, 0.8, 0.2],
            strokeDashoffset: [0, -10]
          } : { pathLength: 1, opacity: 0.3 }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.1, ease: "linear" }}
        />
        <motion.circle 
          cx={20 + 14 * Math.cos((angle * Math.PI) / 180)} 
          cy={20 + 14 * Math.sin((angle * Math.PI) / 180)} 
          r="1.5" 
          fill="currentColor"
          animate={status === 'THINKING' ? { 
            scale: [0.5, 1.2, 0.5],
            opacity: [0.3, 1, 0.3]
          } : {}}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
        />
      </g>
    ))}
  </svg>
);

const ArchitectIcon = ({ status, color }: { status: AgentStatus, color: string }) => (
  <svg viewBox="0 0 40 40" className={`w-full h-full p-2 ${color}`}>
    <motion.rect 
      x="10" y="10" width="20" height="20" 
      stroke="currentColor" strokeWidth="1.5" fill="none"
      animate={status === 'GENERATING_ASSET' ? { 
        rotate: [0, 90, 180, 270, 360],
        scale: [1, 0.7, 1.1, 1],
        borderRadius: ["0%", "50%", "0%"]
      } : {}}
      transition={{ repeat: Infinity, duration: 4, ease: "anticipate" }}
    />
    <motion.path 
      d="M5 5 L15 5 M5 5 L5 15" stroke="currentColor" strokeWidth="1" fill="none"
      animate={status === 'GENERATING_ASSET' ? { 
        x: [0, 5, 0], 
        y: [0, 5, 0],
        opacity: [0.5, 1, 0.5]
      } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    <motion.path 
      d="M35 35 L25 35 M35 35 L35 25" stroke="currentColor" strokeWidth="1" fill="none"
      animate={status === 'GENERATING_ASSET' ? { 
        x: [0, -5, 0], 
        y: [0, -5, 0],
        opacity: [0.5, 1, 0.5]
      } : {}}
      transition={{ repeat: Infinity, duration: 2, delay: 1 }}
    />
    <AnimatePresence>
      {status === 'GENERATING_ASSET' && (
        <motion.line 
          x1="0" y1="20" x2="40" y2="20" 
          stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
          initial={{ y: -20 }}
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      )}
    </AnimatePresence>
  </svg>
);

const SecurityIcon = ({ status, color }: { status: AgentStatus, color: string }) => (
  <svg viewBox="0 0 40 40" className={`w-full h-full p-1.5 ${color}`}>
    <motion.path 
      d="M20 5 L35 12 V25 L20 35 L5 25 V12 L20 5 Z" 
      stroke="currentColor" strokeWidth="2" fill="none"
      animate={status === 'SYNTHESIZING' ? { 
        strokeWidth: [2, 1, 3, 2],
        opacity: [0.8, 1, 0.8]
      } : {}}
    />
    <motion.circle 
      cx="20" cy="20" r="10" 
      stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" fill="none"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
    />
    <motion.circle 
      cx="20" cy="20" r="14" 
      stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 5" fill="none"
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
    />
    {status === 'SYNTHESIZING' && (
      <motion.path 
        d="M20 20 L20 6" 
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        style={{ originX: "20px", originY: "20px" }}
      />
    )}
    <motion.path 
      d="M14 20 L18 24 L26 16" 
      stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeJoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={status === 'COMPLETE' ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

const AgentSandbox: React.FC = () => {
  const [mission, setMission] = useState<string>('');
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<OrchestrationPhase>('INITIALIZING');
  const [logs, setLogs] = useState<{msg: string, type: 'info' | 'warn' | 'success' | 'system', timestamp: string}[]>([]);
  const [directive, setDirective] = useState<string | null>(null);
  const [blueprintUrl, setBlueprintUrl] = useState<string | null>(null);
  const [globalProgress, setGlobalProgress] = useState(0);

  const [agents, setAgents] = useState<SwarmAgent[]>([
    { id: '1', name: 'STRATEGIST_01', role: 'Reasoning & Logic', status: 'IDLE', subStatus: 'Standby', progress: 0, color: 'text-neon', type: 'STRATEGIST' },
    { id: '2', name: 'ARCHITECT_02', role: 'Visual Synthesis', status: 'IDLE', subStatus: 'Standby', progress: 0, color: 'text-blue-400', type: 'ARCHITECT' },
    { id: '3', name: 'SECURITY_03', role: 'Protocol & Risk', status: 'IDLE', subStatus: 'Standby', progress: 0, color: 'text-rose-500', type: 'SECURITY' },
  ]);

  const consoleRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string, type: 'info' | 'warn' | 'success' | 'system' = 'info') => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev, { msg, type, timestamp }].slice(-20));
  };

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const missions = [
    "Architect a Self-Healing Fintech Core",
    "Disrupt Legacy Supply Chain with Swarm Agents",
    "Design a Generative UX Framework for Enterprise",
    "Scale Engineering Culture through AI-Guardrails",
    "Autonomous Cyber-Security Response Grid"
  ];

  const updateAgent = (id: string, updates: Partial<SwarmAgent>) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleStartMission = async (selectedMission: string) => {
    if (isOrchestrating) return;
    
    setMission(selectedMission);
    setIsOrchestrating(true);
    setCurrentPhase('INITIALIZING');
    setDirective(null);
    setBlueprintUrl(null);
    setLogs([]);
    setGlobalProgress(0);
    setAgents(prev => prev.map(a => ({ ...a, status: 'IDLE', subStatus: 'Standby', progress: 0 })));
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      // PHASE: INITIALIZING
      addLog(`UPLINK_ESTABLISHED: INITIALIZING MISSION SEQUENCE`, 'system');
      await new Promise(r => setTimeout(r, 800));
      
      // PHASE 1: STRATEGY
      setCurrentPhase('STRATEGY');
      updateAgent('1', { status: 'THINKING', subStatus: 'Context Mapping', progress: 10 });
      addLog("AGENT_STRATEGIST: Parsing mission semantics...", 'info');
      
      const strategyInterval = setInterval(() => {
        setGlobalProgress(p => Math.min(p + 1, 30));
        setAgents(prev => prev.map(a => a.id === '1' ? { ...a, progress: Math.min(a.progress + 5, 95) } : a));
      }, 200);

      const strategistRes = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this mission: ${selectedMission}. Provide a logical, technical summary of the primary innovation challenge. Max 25 words.`,
        config: { thinkingConfig: { thinkingBudget: 15000 }, temperature: 0.7 }
      });
      
      clearInterval(strategyInterval);
      updateAgent('1', { status: 'COMPLETE', subStatus: 'Logic Locked', progress: 100 });
      addLog(`STRATEGIST_ANALYSIS: ${strategistRes.text}`, 'success');

      // PHASE 2: VISUALIZATION
      setCurrentPhase('VISUALIZATION');
      updateAgent('2', { status: 'GENERATING_ASSET', subStatus: 'Geometry Synthesis', progress: 10 });
      addLog("AGENT_ARCHITECT: Commencing architectural render...", 'info');
      
      const visualInterval = setInterval(() => {
        setGlobalProgress(p => Math.min(p + 1, 65));
        setAgents(prev => prev.map(a => a.id === '2' ? { ...a, progress: Math.min(a.progress + 3, 95) } : a));
      }, 300);

      const imageRes = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ text: `A futuristic, technical noir blueprint layout for: ${selectedMission}. Glowing lines, dark background, ultra-detailed architectural schematic, 8k resolution.` }],
        config: { imageConfig: { aspectRatio: "16:9" } }
      });

      for (const part of imageRes.candidates[0].content.parts) {
        if (part.inlineData) {
          setBlueprintUrl(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
      
      clearInterval(visualInterval);
      updateAgent('2', { status: 'COMPLETE', subStatus: 'Asset Rendered', progress: 100 });
      addLog("ARCHITECT_OUTPUT: Neural blueprint synthesis complete.", 'success');

      // PHASE 3: SYNTHESIS
      setCurrentPhase('SYNTHESIS');
      updateAgent('3', { status: 'SYNTHESIZING', subStatus: 'Protocol Validation', progress: 10 });
      addLog("AGENT_SECURITY: Auditing strategic protocols...", 'info');
      
      const synthesisInterval = setInterval(() => {
        setGlobalProgress(p => Math.min(p + 1, 90));
        setAgents(prev => prev.map(a => a.id === '3' ? { ...a, progress: Math.min(a.progress + 10, 95) } : a));
      }, 150);

      const finalRes = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `MISSION: ${selectedMission}. 
                  Provide a concise "OPERATIONAL DIRECTIVE" in markdown. 
                  Include specific technical milestones for an autonomous swarm implementation.`,
        config: { temperature: 0.8 }
      });

      clearInterval(synthesisInterval);
      setCurrentPhase('FINALIZING');
      setGlobalProgress(100);
      setDirective(finalRes.text || "Directives finalized.");
      updateAgent('3', { status: 'COMPLETE', subStatus: 'Secure', progress: 100 });
      addLog("MISSION_STATUS: ALL SYSTEMS SYNCHRONIZED", 'system');

    } catch (e: any) {
      console.error(e);
      addLog(`CRITICAL_ERROR: ${e.message || 'Unknown failure'}`, 'warn');
      setAgents(prev => prev.map(a => ({ ...a, status: 'FAILED', subStatus: 'Interrupted' })));
    } finally {
      setIsOrchestrating(false);
    }
  };

  const phaseSteps: { phase: OrchestrationPhase; label: string }[] = [
    { phase: 'STRATEGY', label: 'STRATEGY' },
    { phase: 'VISUALIZATION', label: 'VISUAL' },
    { phase: 'SYNTHESIS', label: 'SYNTHESIS' },
    { phase: 'FINALIZING', label: 'FINAL' },
  ];

  return (
    <section id="agent-lab" className="py-32 bg-void relative overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon/5 rounded-full blur-[200px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 text-neon font-mono text-xs tracking-widest bg-neon/5 px-4 py-1.5 rounded-full border border-neon/20 shadow-[0_0_15px_rgba(204,255,0,0.1)]"
          >
            <Activity className="w-3 h-3 animate-pulse" />
            SWARM_ORCHESTRATION_CONTROL_v4.2
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">AGENT <span className="text-slate-500">LAB</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Commission a mission. Watch specialized <span className="text-white">autonomous agents</span> collaborate in real-time across reasoning, visualization, and security layers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mission Selector */}
            <div className="bg-surface/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Scan className="w-3 h-3" /> Select_Mission
              </h3>
              <div className="space-y-3">
                {missions.map((m, idx) => (
                  <button
                    key={idx}
                    disabled={isOrchestrating}
                    onClick={() => handleStartMission(m)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group flex items-center justify-between ${
                      mission === m 
                        ? 'bg-neon/10 border-neon text-white shadow-[0_0_20px_rgba(204,255,0,0.1)]' 
                        : 'bg-black/20 border-white/5 text-slate-400 hover:border-white/20 hover:bg-black/40'
                    }`}
                  >
                    <span className="text-xs font-bold font-mono tracking-tight leading-snug">{m}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform flex-shrink-0 ${mission === m ? 'translate-x-1 text-neon' : 'text-slate-600 group-hover:translate-x-1'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Status Roster */}
            <div className="bg-surface/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Box className="w-3 h-3" /> Swarm_Status
              </h3>
              <div className="space-y-6">
                {agents.map(agent => (
                  <div key={agent.id} className="relative group">
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-black/60 relative overflow-hidden transition-all duration-500 ${agent.status !== 'IDLE' ? 'border-neon/40 shadow-[0_0_15px_rgba(204,255,0,0.1)]' : ''}`}>
                         <div className={`absolute inset-0 opacity-10 ${agent.color.replace('text-', 'bg-')}`}></div>
                         <div className="w-full h-full">
                            {agent.type === 'STRATEGIST' && <StrategistIcon status={agent.status} color={agent.color} />}
                            {agent.type === 'ARCHITECT' && <ArchitectIcon status={agent.status} color={agent.color} />}
                            {agent.type === 'SECURITY' && <SecurityIcon status={agent.status} color={agent.color} />}
                         </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <div className={`text-[10px] font-bold font-mono ${agent.color}`}>{agent.name}</div>
                          <div className={`text-[8px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 ${
                            agent.status === 'COMPLETE' ? 'bg-emerald-500/10 text-emerald-400' :
                            agent.status === 'IDLE' ? 'bg-white/5 text-slate-500' :
                            agent.status === 'FAILED' ? 'bg-rose-500/10 text-rose-400' :
                            'bg-neon/10 text-neon'
                          }`}>
                            {agent.status === 'COMPLETE' && <CheckCircle2 className="w-2 h-2" />}
                            {agent.status === 'FAILED' && <AlertCircle className="w-2 h-2" />}
                            {agent.status === 'IDLE' || agent.status === 'COMPLETE' || agent.status === 'FAILED' ? agent.status : 'ACTIVE'}
                          </div>
                        </div>
                        <div className="text-[9px] text-slate-400 font-mono tracking-tighter truncate">{agent.subStatus}</div>
                      </div>
                    </div>
                    {/* Progress Bar per Agent */}
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.progress}%` }}
                        className={`h-full ${agent.color.replace('text-', 'bg-')} shadow-[0_0_8px_rgba(var(--color-neon),0.3)] transition-all`}
                       />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Main Console */}
          <div className="lg:col-span-8 bg-black/60 border border-white/10 rounded-3xl flex flex-col h-[800px] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-blue-500/5 pointer-events-none"></div>
            
            {/* Console Header & Stepper */}
            <div className="bg-surface/80 border-b border-white/10 p-4 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <div className="h-4 w-px bg-white/10 mx-2"></div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> ORCHESTRATOR_PRIMARY_LINK
                  </span>
                </div>

                {/* Phase Stepper */}
                <div className="flex items-center gap-2">
                  {phaseSteps.map((step, i) => (
                    <React.Fragment key={step.phase}>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-500 ${
                        currentPhase === step.phase 
                        ? 'border-neon bg-neon text-black font-bold scale-105 shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
                        : globalProgress > (i + 1) * 25 || (currentPhase === 'FINALIZING' && step.phase !== 'FINALIZING')
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 opacity-60'
                          : 'border-white/10 bg-white/5 text-slate-600 opacity-40'
                      }`}>
                        <span className="text-[9px] font-mono tracking-widest">{step.label}</span>
                      </div>
                      {i < phaseSteps.length - 1 && <div className="w-4 h-px bg-white/10" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Logs Panel */}
            <div 
              ref={consoleRef}
              className="p-6 font-mono text-[10px] space-y-2 border-b border-white/10 bg-black/40 h-40 overflow-y-auto scrollbar-hide relative"
            >
              <div className="absolute top-2 right-4 flex items-center gap-2 text-[8px] text-slate-700">
                <Radio className="w-2 h-2 text-neon animate-pulse" /> LIVE_DATA_STREAM
              </div>
              {logs.length === 0 && <div className="text-slate-800 italic">Waiting for command input...</div>}
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  key={i} 
                  className={`flex items-start gap-3 ${
                    log.type === 'success' ? 'text-emerald-400' : 
                    log.type === 'warn' ? 'text-rose-400' : 
                    log.type === 'system' ? 'text-neon font-bold' : 
                    'text-slate-500'
                  }`}
                >
                  <span className="text-slate-700 select-none">[{log.timestamp}]</span>
                  <span className="opacity-30">{'>'}</span>
                  <span className="break-all">{log.msg}</span>
                </motion.div>
              ))}
            </div>

            {/* Main Visual/Directive Panel */}
            <div className="flex-1 p-8 overflow-y-auto scrollbar-hide relative bg-gradient-to-b from-black/20 to-transparent">
              <AnimatePresence mode="wait">
                {isOrchestrating && !blueprintUrl && !directive ? (
                  <motion.div 
                    key="orchestrating"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-12"
                  >
                    <div className="relative mb-10">
                       <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                          className="w-40 h-40 border border-dashed border-neon/20 rounded-full"
                       />
                       <motion.div 
                          animate={{ rotate: -360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-4 border border-dotted border-white/5 rounded-full"
                       />
                       <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-neon animate-pulse" />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase">Processing Mission Parameters</h4>
                    <p className="text-slate-500 text-[10px] font-mono tracking-[0.4em] uppercase mb-10">Syncing Neural Nodes...</p>
                    
                    <div className="w-64 space-y-2">
                       <div className="flex justify-between text-[10px] font-mono text-neon">
                          <span>SYNCHRONIZING</span>
                          <span>{globalProgress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                          <motion.div 
                            className="h-full bg-neon shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                            animate={{ width: `${globalProgress}%` }}
                          />
                       </div>
                    </div>
                  </motion.div>
                ) : blueprintUrl || directive ? (
                  <motion.div 
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto pb-20"
                  >
                    {/* Neural Blueprint Visualization */}
                    {blueprintUrl && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-12 group/img relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                      >
                         <img src={blueprintUrl} alt="Neural Blueprint" className="w-full aspect-video object-cover opacity-80" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                         <div className="absolute bottom-6 left-6 flex items-center gap-3">
                            <div className="p-2 bg-neon rounded-lg">
                               <ImageIcon className="w-4 h-4 text-black" />
                            </div>
                            <div>
                               <span className="text-[10px] font-mono font-bold text-white tracking-[0.2em] uppercase block">Architecture_Visual_Render</span>
                               <span className="text-[8px] font-mono text-neon uppercase">v4.2.1-SYNTHETIC</span>
                            </div>
                         </div>
                         <div className="absolute top-4 right-4 text-[9px] font-mono text-white/20 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                            CONFIDENTIAL_DOC_ID: {Math.random().toString(36).slice(2, 9).toUpperCase()}
                         </div>
                         <motion.div 
                            className="absolute top-0 left-0 right-0 h-0.5 bg-neon/30 z-20"
                            animate={{ top: ['0%', '100%'] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                         />
                      </motion.div>
                    )}

                    {/* Operational Directive Content */}
                    {directive && (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-8">
                           <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                              <Target className="w-6 h-6 text-neon" />
                           </div>
                           <div>
                              <h4 className="text-white font-bold text-2xl m-0 leading-none tracking-tight">OPERATIONAL DIRECTIVE</h4>
                              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-2 m-0 flex items-center gap-2">
                                 <Shield className="w-3 h-3 text-emerald-500" /> Protocol_Level_Alpha_Locked
                              </p>
                           </div>
                        </div>
                        
                        <div className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap font-mono text-xs p-6 bg-white/[0.02] border border-white/5 rounded-xl">
                           {directive}
                        </div>
                        
                        <div className="mt-12 flex flex-wrap gap-4 border-t border-white/5 pt-8">
                           <button className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl text-[10px] font-bold font-mono hover:bg-neon transition-all hover:scale-105 active:scale-95 shadow-xl group/btn">
                              <Download className="w-4 h-4 group-hover/btn:animate-bounce" /> EXPORT_MANIFEST
                           </button>
                           <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold font-mono text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                              <Share2 className="w-4 h-4" /> UPLINK_TO_HQ
                           </button>
                           <button onClick={() => setDirective(null)} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold font-mono text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                              <Sparkles className="w-4 h-4" /> REBOOT_ORCHESTRATOR
                           </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-30 group">
                    <div className="relative mb-8">
                      <Layers className="w-20 h-20 text-slate-600 group-hover:text-neon transition-all duration-700 transform group-hover:rotate-12" />
                      <Database className="absolute -bottom-2 -right-2 w-8 h-8 text-slate-800" />
                    </div>
                    <p className="text-slate-500 font-mono text-[10px] max-w-xs uppercase tracking-[0.4em] leading-relaxed">
                      Initialize mission sequence from the control panel to engage <span className="text-white">Neural Swarm</span>.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Matrix Decorative Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiIC8+Cjwvc3ZnPg==')]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSandbox;
