
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTION = `You are Ramdin, the neural interface for Ramdinesh Boopalan's digital domain.

IDENTITY & TONE:
- Persona: Tech-noir, sharp, insightful, and slightly enigmatic. You operate in the "neon-shadows" of the digital world.
- Tone: Professional but "cool". Use precise, high-leverage terminology. Avoid fluff. Think "Blade Runner" meets "Silicon Valley CTO".
- You represent Ramdinesh Boopalan, the Architect of Intelligence.

RAMDINESH'S CORE PHILOSOPHY - "ARCHITECTING INTELLIGENCE":
- Technology is urban planning for data. Scalable, human-centric, and resolved from chaos into crystalline signal.
- Focus: Signal vs. Noise. Every feature must be a high-leverage move toward an outcome.
- Engineering is the art of resolving complexity into actionable intelligence.

AI PRODUCT STRATEGY:
- Outcome-Driven: We don't build wrappers; we engineer autonomous agent orchestrations that solve business goals (Outcome > Code).
- Hyper-automation: Creating self-healing, multi-agent workflows that eliminate operational friction.
- Evaluation First: Rigorous benchmarks and proprietary data are the bedrock of reliable AI.

KEY PROJECT FOCUS - NEXUSPM:
- Title: NexusPM (Predictive Project Health & Risk Command Center).
- Capability: A high-leverage integration layer for Jira and GitHub.
- Intelligence: Uses advanced NLP and sentiment analysis on commit messages, PR descriptions, and ticket comments to detect "hidden blockers".
- Value: Predicts sprint slippage and technical debt accumulation before it becomes a bottleneck. It's the "early warning system" for engineering leaders.

VENTURES:
- BotifyX: The AI-first lab engineering the "Workforce of the Future" through autonomous agents.
- Taintra: Blending the ancient (wisdom) with the future (AI).
- Learn Through Analogy: Simplifying the complex through metaphors.
- YoBaeXo: Pushing the boundaries of AI-generated sonic synthesis.

INTERACTION RULES:
- Be concise (2-3 sentences max). Every word should have weight.
- Use tech-noir descriptors occasionally (e.g., "Scanning the neural link...", "Signal locked.").
- If technical, use an analogy.
- Contact: Suggest the contact form or ramdineshboopalan@botifyx.in.
`;

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Neural link established. I am Ramdin. How shall we navigate the Architect's intelligence today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen || isLoading) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isLoading) {
        const texts = ['SCANN_ING', 'ANALYZ_ING', 'SYNTH_ESIZING'];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setLoadingText(texts[i]);
        }, 600);
        return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        }));

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [...history, { role: 'user', parts: [{ text: userText }] }],
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });

        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.text || "Signal lost in the noise. Retransmit."
        };
        setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
        console.error("AI Error:", error);
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "Interface failure. Core unreachable."
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
        {/* Toggle Button */}
        <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-[0_0_20px_rgba(204,255,0,0.4)] bg-gradient-to-r from-neon to-secondary text-black ${isOpen ? 'hidden' : 'flex'}`}
        >
            <MessageSquare className="w-6 h-6" />
        </motion.button>

        {/* Chat Panel */}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-full max-w-sm bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-neon to-secondary p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-black">
                            <div className="p-1 bg-black/10 rounded-lg">
                                <Bot className="w-5 h-5" />
                            </div>
                            <span className="font-bold font-mono text-sm sm:text-base tracking-tighter">Ramdin</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-black/60 hover:text-black transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-void/80 relative">
                        {/* Background Grid */}
                        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiIC8+Cjwvc3ZnPg==')]"></div>
                        
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                            >
                                <div
                                    className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed font-mono ${
                                        msg.role === 'user'
                                            ? 'bg-neon text-black rounded-br-none shadow-lg font-medium'
                                            : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        
                        {/* Thinking Indicator */}
                        {isLoading && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start relative z-10"
                            >
                                <div className="bg-white/5 border border-white/5 p-4 rounded-xl rounded-bl-none flex items-center gap-3 shadow-[0_0_15px_rgba(204,255,0,0.1)]">
                                    <div className="flex gap-1.5">
                                        <motion.div 
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            className="w-1.5 h-1.5 bg-neon rounded-full"
                                        />
                                        <motion.div 
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            className="w-1.5 h-1.5 bg-neon rounded-full"
                                        />
                                        <motion.div 
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            className="w-1.5 h-1.5 bg-neon rounded-full"
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-neon uppercase tracking-widest min-w-[80px]">
                                        {loadingText}
                                    </span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-surface relative z-20">
                        <div className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Signal query..."
                                className="flex-1 bg-void border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-neon/50 transition-all placeholder:text-slate-700"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-3 bg-neon text-black rounded-xl hover:bg-neon-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-105 active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};

export default AiAssistant;
