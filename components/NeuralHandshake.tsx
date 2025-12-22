
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Shield, ShieldCheck, Zap, Activity } from 'lucide-react';

interface NeuralHandshakeProps {
  onComplete: () => void;
}

const NeuralHandshake: React.FC<NeuralHandshakeProps> = ({ onComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  const startHandshake = async () => {
    setIsScanning(true);
    // Simulate biometric analysis
    await new Promise(r => setTimeout(r, 2000));
    setIsScanning(false);
    setIsAccessGranted(true);
    await new Promise(r => setTimeout(r, 1000));
    onComplete();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-[110] bg-void flex flex-col items-center justify-center p-6"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      
      <div className="max-w-md w-full text-center space-y-12">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-4"
        >
          <div className="text-[10px] font-mono text-neon tracking-[0.6em] uppercase">Security_Layer_Alpha</div>
          <h2 className="text-4xl font-bold text-white tracking-tighter">NEURAL HANDSHAKE</h2>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
            Biometric verification required to initialize <br /> the Architect's auxiliary interface.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center py-12">
          {/* Scanning Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
              >
                <motion.div 
                  animate={{ y: [-100, 100, -100] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-0.5 bg-neon shadow-[0_0_15px_rgba(204,255,0,0.8)] z-20"
                />
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-64 h-64 bg-neon/10 rounded-full blur-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startHandshake}
            disabled={isScanning || isAccessGranted}
            className={`relative w-48 h-48 rounded-[3rem] border-2 transition-all duration-700 flex flex-col items-center justify-center gap-4 group ${
              isAccessGranted ? 'border-emerald-500 bg-emerald-500/10' : 
              isScanning ? 'border-neon/50 bg-neon/5' : 'border-white/10 bg-white/5 hover:border-neon hover:bg-neon/5'
            }`}
          >
            {isAccessGranted ? (
              <ShieldCheck className="w-16 h-16 text-emerald-500" />
            ) : isScanning ? (
              <Activity className="w-16 h-16 text-neon animate-pulse" />
            ) : (
              <Fingerprint className="w-16 h-16 text-white group-hover:text-neon transition-colors" />
            )}
            
            <div className="font-mono text-[10px] tracking-widest uppercase">
              {isAccessGranted ? 'Access Granted' : isScanning ? 'Analysing...' : 'Initialize Link'}
            </div>

            <div className="absolute -inset-4 border border-dashed border-white/5 rounded-[4rem] animate-spin-slow"></div>
          </motion.button>
        </div>

        <motion.div 
          animate={{ opacity: isScanning ? 1 : 0.5 }}
          className="font-mono text-[8px] text-slate-700 space-y-1 uppercase tracking-tighter"
        >
          <div>Kernel.Access_Point: 0x7F000001</div>
          <div>Encryption: AES_256_GCM</div>
          <div>Neural_Uplink: STABLE</div>
        </motion.div>
      </div>

      {/* Decorative Glitch text for flavor */}
      <div className="absolute bottom-8 left-8 text-[10px] font-mono text-white/5 uppercase select-none pointer-events-none">
        Architect_ID: RM-DN-001
      </div>
    </motion.div>
  );
};

export default NeuralHandshake;
