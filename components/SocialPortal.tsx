import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Youtube, BookOpen, Music, Instagram, ExternalLink, Hash, Globe, Signal, Clapperboard } from 'lucide-react';

const socials = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: '/in/ramdineshboopalan',
    status: 'CONNECT',
    icon: Linkedin,
    color: 'text-blue-400',
    borderColor: 'group-hover:border-blue-400/50',
    bgHover: 'group-hover:bg-blue-400/10',
    url: 'https://www.linkedin.com/in/ramdineshboopalan',
    stats: 'Professional Network'
  },
  {
    id: 'medium',
    name: 'Medium',
    handle: '@ramdinesh',
    status: 'READ',
    icon: BookOpen,
    color: 'text-green-400',
    borderColor: 'group-hover:border-green-400/50',
    bgHover: 'group-hover:bg-green-400/10',
    url: 'https://medium.com/@ramdinesh',
    stats: 'Thought Leadership'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@ramdinesh',
    status: 'WATCH',
    icon: Youtube,
    color: 'text-red-500',
    borderColor: 'group-hover:border-red-500/50',
    bgHover: 'group-hover:bg-red-500/10',
    url: 'https://www.youtube.com/@bramdine',
    stats: 'Visual Narratives'
  },
  {
    id: 'apple',
    name: 'Apple Music',
    handle: 'Artist Profile',
    status: 'LISTEN',
    icon: Music,
    color: 'text-pink-500',
    borderColor: 'group-hover:border-pink-500/50',
    bgHover: 'group-hover:bg-pink-500/10',
    url: 'https://music.apple.com/in/artist/ramdinesh/1840510215',
    stats: 'Sonic Synthesis'
  },
  {
    id: 'imdb',
    name: 'IMDb',
    handle: 'Ramdinesh Boopalan',
    status: 'VIEW',
    icon: Clapperboard,
    color: 'text-yellow-400',
    borderColor: 'group-hover:border-yellow-400/50',
    bgHover: 'group-hover:bg-yellow-400/10',
    url: 'https://www.imdb.com/user/ur27558455/?ref_=ls_usr_ov',
    stats: 'Filmography & Credits'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Ramdinesh',
    status: 'FOLLOW',
    icon: Globe, 
    color: 'text-blue-600',
    borderColor: 'group-hover:border-blue-600/50',
    bgHover: 'group-hover:bg-blue-600/10',
    url: 'https://www.facebook.com/ramdinesh.boopalan', 
    stats: 'Social Circle'
  }
];

const SocialPortal: React.FC = () => {
  return (
    <section className="py-32 bg-void relative overflow-hidden">
      {/* Animated Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-[linear-gradient(to_bottom,transparent_0%,rgb(var(--color-neon)/0.05)_100%)] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImgridIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon/20 bg-neon/5 text-neon text-xs font-mono uppercase tracking-widest mb-4">
            <Signal className="w-3 h-3 animate-pulse" />
            Signal Detected
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            DIGITAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-cyan-400">PRESENCE</span>
          </h2>
          <p className="text-slate-400 max-w-xl">
            Connect with the neural network. Choose your transmission channel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {socials.map((social, index) => (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-surface/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${social.borderColor}`}
            >
              {/* Hover Glow Background */}
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${social.bgHover}`}></div>
              
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors ${social.color} flex-shrink-0`}>
                    <social.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 truncate">
                      {social.name}
                      <ExternalLink className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-slate-400 flex-shrink-0" />
                    </h3>
                    <div className="text-xs font-mono text-slate-500 flex items-center gap-1 truncate">
                      <Hash className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{social.handle}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider border border-white/10 bg-black/20 ${social.color} opacity-50 group-hover:opacity-100 transition-opacity whitespace-nowrap flex-shrink-0 ml-2`}>
                  {social.status}
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex justify-between items-end">
                <div className="text-xs text-slate-400 font-mono">
                  <span className="block text-[10px] text-slate-600 uppercase mb-1">Frequency</span>
                  {social.stats}
                </div>
                
                {/* Animated Bar Code Effect */}
                <div className="flex gap-0.5 items-end h-4 opacity-30 group-hover:opacity-80 transition-opacity">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 bg-current ${social.color}`}
                      animate={{ height: ["20%", "100%", "40%"] }}
                      transition={{ 
                        duration: 0.5 + Math.random(), 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        delay: i * 0.1 
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`w-2 h-2 border-t border-r ${social.color.replace('text-', 'border-')}`}></div>
              </div>
              <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`w-2 h-2 border-b border-l ${social.color.replace('text-', 'border-')}`}></div>
              </div>

            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialPortal;