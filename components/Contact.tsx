
import React, { useState } from 'react';
import { Send, ArrowRight, Loader2, CheckCircle, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate network transmission time
    setTimeout(() => {
      setStatus('success');
      // Reset to idle after showing success message
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-void relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
           <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 tracking-tighter mb-12">
             SAY HELLO.
           </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          <div className="text-left">
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Got an idea that needs <span className="text-white font-bold">AI firepower</span>? 
              Or just want to discuss the future of tech? I'm always open to interesting conversations.
            </p>
            <div className="flex flex-col gap-4">
              <a href="mailto:ramdineshboopalan@botifyx.in" className="flex items-center gap-3 text-white hover:text-neon transition-colors group">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center rounded-full group-hover:border-neon group-hover:bg-neon group-hover:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-lg break-all">ramdineshboopalan@botifyx.in</span>
              </a>
            </div>
          </div>

          {/* Minimalist Form */}
          <div className="bg-surface border border-white/10 p-8 relative min-h-[420px] flex flex-col justify-center rounded-xl shadow-2xl">
            <AnimatePresence mode="wait">
               {status === 'success' ? (
                 <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8"
                 >
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mb-6 text-neon"
                    >
                        <CheckCircle className="w-20 h-20" />
                    </motion.div>
                    <motion.h3 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        Received.
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-mono text-sm"
                    >
                        Transmission Confirmed.
                    </motion.p>
                 </motion.div>
               ) : (
                 <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5 w-full"
                 >
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Identity</label>
                      <input 
                        type="text" 
                        placeholder="Name"
                        required
                        className="w-full bg-void border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-slate-700"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Coordinates</label>
                      <input 
                        type="email" 
                        placeholder="Email"
                        required
                        className="w-full bg-void border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-slate-700"
                      />
                    </div>
                    <div className="space-y-1 text-left">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Transmission</label>
                      <textarea 
                        placeholder="Message"
                        rows={3}
                        required
                        className="w-full bg-void border-b border-white/20 py-3 px-2 text-white focus:outline-none focus:border-neon transition-colors resize-none placeholder:text-slate-700"
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-white text-black font-bold py-4 mt-4 hover:bg-neon transition-all disabled:bg-zinc-800 disabled:text-zinc-400 disabled:cursor-not-allowed group relative overflow-hidden rounded-sm"
                    >
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {status === 'sending' ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="font-mono tracking-widest text-xs">TRANSMITTING...</span>
                            </>
                        ) : (
                            <>
                                <span className="tracking-widest text-xs">INITIATE SEQUENCE</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                      </div>
                    </button>
                 </motion.form>
               )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
