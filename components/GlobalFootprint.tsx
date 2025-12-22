
import React, { useState, useEffect } from 'react';
import { MapPin, Globe2, Clock, Zap, Activity, Signal } from 'lucide-react';
import { motion } from 'framer-motion';

const GlobalFootprint: React.FC = () => {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [userTime, setUserTime] = useState<string>('');
  const [chennaiTime, setChennaiTime] = useState<string>('');
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUserTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setChennaiTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionStatus('granted');
          try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const parts = timeZone.split('/');
            setLocationName(`${parts[parts.length - 1].replace(/_/g, ' ')}, ${parts[0]}`);
          } catch (e) { setLocationName("your region"); }
        },
        () => setPermissionStatus('denied')
      );
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="network" className="py-32 bg-void relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon/5 border border-neon/20 rounded-full text-[10px] font-mono text-neon uppercase tracking-widest mb-8">
              <Signal className="w-3 h-3 animate-pulse" /> LIVE_NETWORK_STATUS
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-none">
              GLOBAL <br /> <span className="text-slate-500">SIGNAL GRID</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
              The Architect's presence is distributed. My operations center in Chennai coordinates with partners across every major digital sector.
            </p>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-surface border border-white/5 rounded-2xl">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-2 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> System_Time
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{chennaiTime}</div>
                  <div className="text-[10px] font-mono text-neon mt-1">CHENNAI_HQ</div>
               </div>
               <div className="p-6 bg-surface border border-white/5 rounded-2xl">
                  <div className="text-[10px] font-mono text-slate-500 uppercase mb-2 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> User_Node
                  </div>
                  <div className="text-2xl font-bold text-white font-mono truncate">{userTime || "--:--"}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1 uppercase truncate">{locationName || "Detecting..."}</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] bg-surface/30 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 overflow-hidden group">
               {/* World Map SVG Representation */}
               <svg viewBox="0 0 1000 600" className="w-full h-full opacity-20 transition-opacity group-hover:opacity-40 duration-700">
                  <path d="M150,200 Q200,100 300,150 T500,200 T700,150 T900,250" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />
                  {/* Chennai Node */}
                  <circle cx="720" cy="350" r="4" fill="#ccff00" className="animate-ping" />
                  <circle cx="720" cy="350" r="2" fill="#ccff00" />
                  <text x="735" y="355" fill="white" fontSize="12" fontFamily="Space Mono" fontWeight="bold">HQ_CHENNAI</text>
                  
                  {/* Other Nodes */}
                  <circle cx="200" cy="250" r="2" fill="white" className="opacity-40" />
                  <circle cx="850" cy="400" r="2" fill="white" className="opacity-40" />
                  <circle cx="450" cy="180" r="2" fill="white" className="opacity-40" />

                  {/* User Pulse (Dynamic-ish) */}
                  <motion.g animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <circle cx="300" cy="300" r="6" stroke="#ccff00" strokeWidth="1" fill="none" />
                    <text x="315" y="305" fill="#ccff00" fontSize="10" fontFamily="Space Mono">VISITOR_SIGNAL</text>
                  </motion.g>
               </svg>

               <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent pointer-events-none"></div>
               
               {/* Data HUD overlay */}
               <div className="absolute top-8 right-8 text-right font-mono text-[10px] space-y-2">
                  <div className="text-neon flex items-center justify-end gap-2">
                    <Activity className="w-3 h-3" /> PACKET_STRENGTH: 99.8%
                  </div>
                  <div className="text-slate-500">NODE_COUNT: 1,422</div>
                  <div className="text-slate-500">UPTIME: 9,999.42 HRS</div>
               </div>

               <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end border-t border-white/10 pt-6">
                  <div className="flex gap-4">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-1 bg-white/10 h-8 rounded-full overflow-hidden relative">
                         <motion.div 
                          className="absolute bottom-0 left-0 w-full bg-neon" 
                          animate={{ height: ['20%', '80%', '40%'] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                         />
                       </div>
                     ))}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Architectural_Mesh_Active</div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalFootprint;
