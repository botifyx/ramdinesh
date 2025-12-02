
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Disc, Radio, X, ChevronLeft, ChevronRight, ExternalLink, Headphones, Video, Youtube, Film, Sparkles, Activity, Cpu, Scan, Terminal } from 'lucide-react';

const albumCovers = [
  {
    title: "Maria",
    desc: "Single • 2025",
    link: "https://music.apple.com/in/album/maria/1854356752",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/51/71/8b/51718bdf-d02a-f0fa-2971-8aaa4685432a/artwork.jpg/316x316bb.webp"
  },
  {
    title: "I Am Ram Vol 1",
    desc: "Album • 2025",
    link: "https://music.apple.com/in/album/i-am-ram-vol-1/1853285029",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/7d/70/da7d7033-ad35-b625-dffc-b5e78928d026/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Babah: Broken & Blinded",
    desc: "Album • 2025",
    link: "https://music.apple.com/in/album/babah-broken-and-blinded-american-hearts/1852147469",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/46/15/88/461588b3-509f-7dfb-f181-d6879c8b1265/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Rendezvous",
    desc: "Single • 2025",
    link: "https://music.apple.com/in/album/rendezvous/1850315718",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f9/e7/8e/f9e78e83-c7fc-1934-4210-afc53c41f2d7/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Cupidfy",
    desc: "Single • 2025",
    link: "https://music.apple.com/in/album/cupidfy/1850122125",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/9c/34/5e/9c345eb0-f0a7-6f12-29de-4207d9c2f95c/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Gospelfy",
    desc: "Album • 2024",
    link: "https://music.apple.com/in/album/gospelfy/1849592003",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3c/f6/84/3cf68496-d166-d0d6-b24d-97f1d36126cd/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Halloweenfy",
    desc: "EP • 2024",
    link: "https://music.apple.com/in/album/halloweenfy-its-bloodly-sweet/1848667399",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f4/67/28/f46728b1-d6b9-5965-dcf2-bda5d62b8b34/artwork.jpg/316x316bb.webp"
  },
  {
    title: "BassBeatBeast EP",
    desc: "EP • 2025",
    link: "https://music.apple.com/in/album/bassbeatbeast-ep/1854047881",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/75/b9/f9/75b9f98a-de33-f104-9bff-46812f3cf96e/artwork.jpg/316x316bb.webp"
  },
  {
    title: "Joker & Harley: Ctrl Love",
    desc: "EP • 2024",
    link: "https://music.apple.com/in/album/joker-harley-quinn-ctrl-love-ep/1843949516",
    url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7f/f5/c0/7ff5c07d-21e8-82ea-c230-2d2621bdd52e/artwork.jpg/316x316bb.webp"
  }
];

const videos = [
  {
    id: "t6FVmNvIpP4",
    title: "Atmospheric Flux",
    desc: "AI Video • 2025",
    link: "https://www.youtube.com/watch?v=t6FVmNvIpP4",
    thumb: "https://img.youtube.com/vi/t6FVmNvIpP4/hqdefault.jpg"
  },
  {
    id: "lND_XHjX9pc",
    title: "Neural Cityscapes",
    desc: "Short Film • 2025",
    link: "https://www.youtube.com/watch?v=lND_XHjX9pc",
    thumb: "https://img.youtube.com/vi/lND_XHjX9pc/hqdefault.jpg"
  },
  {
    id: "24yKq0-BraQ",
    title: "Cyberpunk Dreams",
    desc: "Visualizer • 2025",
    link: "https://www.youtube.com/watch?v=24yKq0-BraQ",
    thumb: "https://img.youtube.com/vi/24yKq0-BraQ/hqdefault.jpg"
  },
  {
    id: "q2HOlaPzHhc",
    title: "Abstract Flow",
    desc: "Motion Art • 2024",
    link: "https://www.youtube.com/watch?v=q2HOlaPzHhc",
    thumb: "https://img.youtube.com/vi/q2HOlaPzHhc/hqdefault.jpg"
  },
  {
    id: "virI58nWqsg",
    title: "Cosmic Voyage",
    desc: "Space Gen • 2024",
    link: "https://www.youtube.com/watch?v=virI58nWqsg",
    thumb: "https://img.youtube.com/vi/virI58nWqsg/hqdefault.jpg"
  },
  {
    id: "0PvmCYn-mxQ",
    title: "Synthetic Nature",
    desc: "Environment • 2024",
    link: "https://www.youtube.com/watch?v=0PvmCYn-mxQ",
    thumb: "https://img.youtube.com/vi/0PvmCYn-mxQ/hqdefault.jpg"
  }
];

const VideoLabModal = ({ isOpen, onClose, videos }: { isOpen: boolean; onClose: () => void; videos: any[] }) => {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isBooting, setIsBooting] = useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setIsBooting(true);
      const timer = setTimeout(() => setIsBooting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-6xl bg-black border border-rose-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_-12px_rgba(244,63,94,0.5)] flex flex-col h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center gap-4">
            <Activity className="w-5 h-5 text-rose-500 animate-pulse" />
            <h2 className="font-mono text-rose-400 tracking-widest text-sm md:text-base">
              NEURAL VIDEO LAB <span className="text-rose-700">//</span> v2.0
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-rose-500/70">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              SYSTEM ONLINE
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-rose-500/20 rounded-full text-rose-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* Main Viewport */}
          <div className="flex-1 bg-black relative flex flex-col border-r border-rose-500/20">
            {isBooting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-500 font-mono">
                <Scan className="w-16 h-16 mb-4 animate-spin-slow" />
                <div className="text-xl tracking-[0.5em] animate-pulse">INITIALIZING...</div>
                <div className="mt-2 text-xs text-rose-700">LOADING NEURAL WEIGHTS</div>
              </div>
            ) : (
              <div className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-8">
                <div className="w-full aspect-video rounded-lg overflow-hidden border border-rose-500/20 shadow-2xl relative group">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0&controls=1&rel=0`}
                    title={activeVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>

                  {/* Overlay Scanlines */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>
                </div>
              </div>
            )}

            {/* Metadata Footer */}
            <div className="p-4 border-t border-rose-500/20 bg-rose-950/5 font-mono text-xs text-rose-400 flex justify-between items-center">
              <div>
                <span className="text-rose-600">ID:</span> {activeVideo.id}
              </div>
              <div className="flex gap-4">
                <span>RES: 4K_UHD</span>
                <span>FPS: 60</span>
                <span>AI_MODEL: GEN-3</span>
              </div>
            </div>
          </div>

          {/* Sidebar / Controls */}
          <div className="w-full lg:w-80 bg-black/50 flex flex-col border-l border-rose-500/20">
            <div className="p-4 border-b border-rose-500/20">
              <h3 className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                Experiment Log
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`w-full text-left p-3 rounded border transition-all duration-300 group relative overflow-hidden ${activeVideo.id === video.id
                      ? 'bg-rose-500/10 border-rose-500 text-white'
                      : 'bg-black border-white/5 text-slate-400 hover:border-rose-500/50 hover:text-rose-300'
                    }`}
                >
                  {activeVideo.id === video.id && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute inset-0 bg-rose-500/5"
                    />
                  )}
                  <div className="relative z-10">
                    <div className="text-xs font-mono opacity-50 mb-1">{video.desc}</div>
                    <div className="font-bold text-sm truncate">{video.title}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* System Status */}
            <div className="p-4 border-t border-rose-500/20 bg-black text-[10px] font-mono text-rose-500/50 space-y-1">
              <div className="flex justify-between">
                <span>GPU_USAGE</span>
                <span className="text-rose-400">94%</span>
              </div>
              <div className="w-full bg-rose-900/20 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[94%] animate-pulse"></div>
              </div>
              <div className="flex justify-between mt-2">
                <span>MEMORY</span>
                <span className="text-rose-400">12.4GB</span>
              </div>
              <div className="w-full bg-rose-900/20 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[60%]"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CreativeWorks: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<'audio' | 'video' | null>(null);
  const [currentAudioSlide, setCurrentAudioSlide] = useState(0);
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  const [isVideoLabOpen, setIsVideoLabOpen] = useState(false);

  // Audio Carousel Controls
  const nextAudioSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentAudioSlide((prev) => (prev + 1) % albumCovers.length);
  };

  const prevAudioSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentAudioSlide((prev) => (prev - 1 + albumCovers.length) % albumCovers.length);
  };

  // Video Carousel Controls
  const nextVideoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVideoSlide((prev) => (prev + 1) % videos.length);
  };

  const prevVideoSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVideoSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const toggleAudio = () => {
    setExpandedSection(expandedSection === 'audio' ? null : 'audio');
  };

  const toggleVideo = () => {
    setExpandedSection(expandedSection === 'video' ? null : 'video');
  };

  return (
    <section id="creative" className="py-24 bg-void relative overflow-hidden border-t border-white/5">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SYNTHESIS</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
              Beyond code and architecture, I explore the frontiers of generative art.
              Using AI to compose digital soundscapes and visual narratives.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full bg-indigo-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            STREAMING ON APPLE MUSIC & YOUTUBE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-500 ease-in-out mb-8">

          {/* --- AUDIO SECTION --- */}
          {expandedSection !== 'video' && (
            <motion.div
              layout
              onClick={toggleAudio}
              className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-surface hover:border-indigo-500/50 transition-all duration-500 ${expandedSection === 'audio' ? 'lg:col-span-12 cursor-default' : 'lg:col-span-6 cursor-pointer'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black via-surface to-indigo-900/20 opacity-80 z-0"></div>

              {/* Close Button */}
              <AnimatePresence>
                {expandedSection === 'audio' && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={(e) => { e.stopPropagation(); setExpandedSection(null); }}
                    className="absolute top-6 right-6 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Animated Audio Vis */}
              {expandedSection !== 'audio' && (
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none z-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["10%", "60%", "30%", "80%", "20%"] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                      className="w-2 md:w-4 bg-indigo-500 rounded-t-sm"
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row gap-12 h-full min-h-[400px]">

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300">
                      <Radio className="w-4 h-4" />
                      Apple Music
                    </div>
                  </div>

                  <div>
                    <motion.h3 layout="position" className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      Sonic Art
                    </motion.h3>
                    <motion.p layout="position" className="text-slate-400 font-mono mb-6">Artist • Electronic • AI-Gen</motion.p>

                    {expandedSection === 'audio' ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                          My discography is a journey through algorithmic composition.
                          Browse my latest releases below and listen directly on Apple Music.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href="https://music.apple.com/in/artist/ramdinesh/1840510215"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-sm transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Artist Profile
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold text-sm group-hover:scale-105 transition-transform">
                        <Play className="w-4 h-4 fill-current" />
                        EXPLORE MUSIC
                      </div>
                    )}
                  </div>
                </div>

                {/* Audio Carousel (Expanded Only) */}
                <AnimatePresence>
                  {expandedSection === 'audio' && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 relative bg-black/30 rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center group/carousel py-8"
                    >
                      {/* Carousel Content */}
                      <div className="relative w-full max-w-[320px] flex flex-col items-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentAudioSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                          >
                            <div className="aspect-square w-full mb-6 rounded-lg shadow-2xl overflow-hidden border border-white/10 relative group/img">
                              <img
                                src={albumCovers[currentAudioSlide].url}
                                alt={albumCovers[currentAudioSlide].title}
                                loading="lazy"
                                width="316"
                                height="316"
                                className="w-full h-full object-cover"
                              />
                              <a
                                href={albumCovers[currentAudioSlide].link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 cursor-pointer"
                              >
                                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center transform scale-50 group-hover/img:scale-100 transition-transform duration-300">
                                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                                </div>
                              </a>
                            </div>

                            <div className="text-center">
                              <h5 className="text-white font-bold text-xl mb-1 truncate">{albumCovers[currentAudioSlide].title}</h5>
                              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
                                <Disc className="w-3 h-3" />
                                <span>{albumCovers[currentAudioSlide].desc}</span>
                              </div>

                              <a
                                href={albumCovers[currentAudioSlide].link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors border border-indigo-500/30 px-4 py-2 rounded-full hover:bg-indigo-500/10"
                              >
                                <Headphones className="w-3 h-3" />
                                LISTEN NOW
                              </a>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Controls */}
                      <button
                        onClick={prevAudioSlide}
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-indigo-500 rounded-full text-white transition-colors border border-white/10 z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextAudioSlide}
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-indigo-500 rounded-full text-white transition-colors border border-white/10 z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* --- VIDEO SECTION --- */}
          {expandedSection !== 'audio' && (
            <motion.div
              layout
              onClick={toggleVideo}
              className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-surface hover:border-rose-500/50 transition-all duration-500 ${expandedSection === 'video' ? 'lg:col-span-12 cursor-default' : 'lg:col-span-6 cursor-pointer'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-black via-surface to-rose-900/20 opacity-80 z-0"></div>

              {/* Close Button */}
              <AnimatePresence>
                {expandedSection === 'video' && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={(e) => { e.stopPropagation(); setExpandedSection(null); }}
                    className="absolute top-6 right-6 z-30 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Animated Video Waves */}
              {expandedSection !== 'video' && (
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-between px-2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none z-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ["20%", "70%", "30%", "90%", "40%"] }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatType: "reverse", delay: i * 0.07 }}
                      className="w-2 md:w-4 bg-rose-500 rounded-t-sm"
                    />
                  ))}
                </div>
              )}

              <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row gap-12 h-full min-h-[400px]">
                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-400">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </div>
                  </div>

                  <div>
                    <motion.h3 layout="position" className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-rose-500 transition-colors">
                      Visual Synth
                    </motion.h3>
                    <motion.p layout="position" className="text-slate-400 font-mono mb-6">AI Video • Generative • VFX</motion.p>

                    {expandedSection === 'video' ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <p className="text-slate-300 mb-6 max-w-md leading-relaxed">
                          Crafting immersive visual stories using generative video models.
                          Blending text-to-video and image-to-video pipelines for cinematic outputs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <a
                            href="https://www.youtube.com/@YoBaeXo"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-sm transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Channel
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsVideoLabOpen(true);
                            }}
                            className="inline-flex items-center gap-3 px-6 py-3 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded-full font-bold text-sm transition-colors group/btn"
                          >
                            <Sparkles className="w-4 h-4 group-hover/btn:animate-pulse" />
                            Launch Video Lab
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-bold text-sm group-hover:scale-105 transition-transform">
                        <Play className="w-4 h-4 fill-current" />
                        WATCH PROJECTS
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Carousel (Expanded Only) */}
                <AnimatePresence>
                  {expandedSection === 'video' && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 relative bg-black/30 rounded-2xl border border-white/5 overflow-hidden flex flex-col items-center justify-center group/carousel py-8"
                    >
                      {/* Carousel Content */}
                      <div className="relative w-full max-w-[420px] flex flex-col items-center">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentVideoSlide}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                          >
                            <div className="aspect-video w-full mb-6 rounded-lg shadow-2xl overflow-hidden border border-white/10 relative group/img">
                              <img
                                src={videos[currentVideoSlide].thumb}
                                alt={videos[currentVideoSlide].title}
                                loading="lazy"
                                width="480"
                                height="360"
                                className="w-full h-full object-cover"
                              />
                              <a
                                href={videos[currentVideoSlide].link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 cursor-pointer"
                              >
                                <div className="w-16 h-16 bg-rose-600 rounded-full flex items-center justify-center transform scale-50 group-hover/img:scale-100 transition-transform duration-300 shadow-lg shadow-rose-900/50">
                                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                                </div>
                              </a>
                            </div>

                            <div className="text-center px-4">
                              <h5 className="text-white font-bold text-xl mb-1 truncate">{videos[currentVideoSlide].title}</h5>
                              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4">
                                <Film className="w-3 h-3" />
                                <span>{videos[currentVideoSlide].desc}</span>
                              </div>

                              <a
                                href={videos[currentVideoSlide].link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors border border-rose-500/30 px-4 py-2 rounded-full hover:bg-rose-500/10"
                              >
                                <Youtube className="w-3 h-3" />
                                WATCH ON YOUTUBE
                              </a>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Controls */}
                      <button
                        onClick={prevVideoSlide}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-rose-600 rounded-full text-white transition-colors border border-white/10 z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextVideoSlide}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-rose-600 rounded-full text-white transition-colors border border-white/10 z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Pagination Dots */}
                      <div className="absolute bottom-4 flex gap-2">
                        {videos.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentVideoSlide ? 'bg-rose-500' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      <AnimatePresence>
        {isVideoLabOpen && (
          <VideoLabModal
            isOpen={isVideoLabOpen}
            onClose={() => setIsVideoLabOpen(false)}
            videos={videos}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default CreativeWorks;
