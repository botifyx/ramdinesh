import React, { useState, useEffect } from 'react';
import { MapPin, Globe2, Clock, Navigation, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalFootprint: React.FC = () => {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [userTime, setUserTime] = useState<string>('');
  const [chennaiTime, setChennaiTime] = useState<string>('');
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  useEffect(() => {
    // 1. Time Update Logic
    const updateTime = () => {
      const now = new Date();
      setUserTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setChennaiTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // 2. Geolocation Logic
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPermissionStatus('granted');
          try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (timeZone && timeZone.includes('/')) {
              const parts = timeZone.split('/');
              const city = parts[parts.length - 1].replace(/_/g, ' ');
              const region = parts[0];
              setLocationName(`${city}, ${region}`);
            } else {
              setLocationName("your region");
            }
          } catch (e) {
            setLocationName("your region");
          }
        },
        (error) => {
          console.log("Geo permission denied or error", error);
          setPermissionStatus('denied');
        }
      );
    } else {
      setPermissionStatus('denied');
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-surface border-y border-white/5 relative overflow-hidden">
      {/* Abstract Background Globe Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <div className="w-[800px] h-[800px] border border-white/20 rounded-full flex items-center justify-center">
             <div className="w-[600px] h-[600px] border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-[400px] h-[400px] border border-white/20 rounded-full"></div>
             </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
          <Globe2 className="w-6 h-6 text-primary" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where I Work & Collaborate</h2>
        
        {/* Dynamic Geo-Greeting Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 bg-void/50 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${permissionStatus === 'granted' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {permissionStatus === 'granted' ? 'Location Active' : 'System Status: Online'}
                </span>
              </div>
              <p className="text-slate-200 text-lg font-medium leading-relaxed">
                {permissionStatus === 'granted' ? (
                  <>
                    Hello from Ramdinesh in <span className="text-primary font-bold">Chennai, India</span> 👋 <br />
                    You’re visiting from <span className="text-white border-b border-white/20">{locationName || "your region"}</span>.
                  </>
                ) : (
                  <>
                     Hello from <span className="text-primary font-bold">Chennai, India</span> 👋 <br />
                     Wherever you’re joining from, welcome to my AI-powered world.
                  </>
                )}
              </p>
            </div>

            <div className="flex gap-6 md:border-l border-white/10 md:pl-6">
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> You
                </div>
                <div className="text-xl font-mono text-white font-bold">{userTime || "--:--"}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-slate-500 mb-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3" /> Me (Chennai)
                </div>
                <div className="text-xl font-mono text-primary font-bold">{chennaiTime || "--:--"}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-void rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group">
             <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🇮🇳</div>
             <h3 className="text-xl font-bold text-white mb-1">Chennai, India</h3>
             <p className="text-sm text-slate-500">Base of Operations</p>
          </div>

          <div className="p-6 bg-void rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group">
             <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🇺🇸</div>
             <h3 className="text-xl font-bold text-white mb-1">United States</h3>
             <p className="text-sm text-slate-500">Strategic Partnerships</p>
          </div>

          <div className="p-6 bg-void rounded-2xl border border-white/5 hover:border-primary/30 transition-colors group">
             <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🇪🇺</div>
             <h3 className="text-xl font-bold text-white mb-1">Europe</h3>
             <p className="text-sm text-slate-500">Tech Collaboration</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalFootprint;