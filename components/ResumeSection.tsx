
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added MapPin to the imports to resolve the error on line 191
import { 
  FileText, Download, Briefcase, GraduationCap, 
  Trophy, BadgeCheck, Terminal, Cpu, Shield, 
  ExternalLink, ChevronRight, Activity, Zap,
  Award, CheckCircle2, Binary, Fingerprint,
  Verified, ShieldCheck, Database, Layout,
  Cpu as Microchip, ScanLine, Hexagon,
  Globe, Lock, MapPin
} from 'lucide-react';

const ResumeSection: React.FC = () => {
  const experience = [
    {
      role: "Chief Technology Officer (Interim)",
      company: "BotifyX",
      period: "Sep 2025 – Present",
      location: "Bangalore, India",
      description: "Leading comprehensive technology strategy, overseeing high-impact AI/ML projects, and aligning technical roadmaps with business objectives."
    },
    {
      role: "Associate Director – Delivery",
      company: "Prodapt",
      period: "Jan 2020 – Sep 2025",
      location: "Chennai, India",
      description: "Owned $15M+ portfolio across AI/ML and Cloud Engineering. Instituted AI-driven SDLC, saving $2M annually and reducing cycle time by 30%."
    },
    {
      role: "Consultant / Senior Project Manager",
      company: "IBM",
      period: "Oct 2014 – Dec 2019",
      location: "United States",
      description: "Led Agile & AI-driven delivery transformation for Tier-1 BFSI and Retail clients. Achieved 30% gain in delivery efficiency via automation uplift."
    }
  ];

  const education = [
    { degree: "PhD (Computer Science)", school: "BSA Crescent Institute", status: "Ongoing" },
    { degree: "MTech (Software Engineering)", school: "BITS Pilani", status: "2020-2022" },
    { degree: "MBA (International Business)", school: "Pondicherry University", status: "2005-2007" },
    { degree: "BE (Electronics & Comm)", school: "Madras University", status: "1993-1997" }
  ];

  const skills = [
    { category: "Leadership", items: ["Portfolio Mgmt", "PMO", "OKRs", "Risk Management"] },
    { category: "AI & Automation", items: ["NLP", "LLMs", "GPT-4 APIs", "Predictive QA"] },
    { category: "Cloud & DevOps", items: ["AWS/Azure/GCP", "Kubernetes", "Terraform", "GitHub Actions"] },
    { category: "Engineering", items: ["Python", "Java", "Node.js", "React", "Snowflake"] }
  ];

  const certifications = [
    { 
      name: "ISO/IEC 42001", 
      issuer: "PECB",
      detail: "Responsible AI Lead Implementer", 
      icon: ShieldCheck,
      color: "text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(52,211,153,0.3)]"
    },
    { 
      name: "CCISO", 
      issuer: "EC-Council",
      detail: "Certified Chief Information Security", 
      icon: Lock,
      color: "text-blue-400",
      glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)]"
    },
    { 
      name: "M365 ARCHITECT", 
      issuer: "Microsoft",
      detail: "Expert Solutions Architecture", 
      icon: Microchip,
      color: "text-indigo-400",
      glow: "shadow-[0_0_20px_rgba(129,140,248,0.3)]"
    },
    { 
      name: "PEGA SSA", 
      issuer: "Pega Systems",
      detail: "Senior System Architect", 
      icon: Binary,
      color: "text-orange-400",
      glow: "shadow-[0_0_20px_rgba(251,146,60,0.3)]"
    },
    { 
      name: "CSM", 
      issuer: "Scrum Alliance",
      detail: "Certified Scrum Master", 
      icon: Award,
      color: "text-neon",
      glow: "shadow-[0_0_20px_rgba(204,255,0,0.3)]"
    },
    { 
      name: "PRINCE2", 
      issuer: "AXELOS",
      detail: "Project Management Professional", 
      icon: Layout,
      color: "text-pink-400",
      glow: "shadow-[0_0_20px_rgba(244,114,182,0.3)]"
    },
    { 
      name: "TM FORUM", 
      issuer: "TM Forum",
      detail: "Business Process Framework", 
      icon: Database,
      color: "text-cyan-400",
      glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]"
    }
  ];

  return (
    <section id="experience" className="py-32 bg-void relative overflow-hidden border-t border-white/5">
      {/* Cinematic HUD Overlays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-20 right-10 text-[120px] font-bold text-white/[0.02] select-none tracking-tighter">ARCHITECT</div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/20 to-transparent"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-neon/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4 text-neon font-mono text-xs tracking-[0.4em] uppercase"
            >
              <Fingerprint className="w-4 h-4 animate-pulse" />
              INTELLIGENCE_PROFILE_SECURE
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none">
              CAREER <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-500 to-slate-800">DOSSIER</span>
            </h2>
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-neon/50 to-transparent hidden lg:block"></div>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <motion.a
              href="https://drive.google.com/file/d/1pxLbD7oM5M2A5m8ChN7JM2KnY5u6czKT/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-neon text-black font-black font-mono text-xs uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_40px_rgba(204,255,0,0.2)] hover:shadow-[0_0_60px_rgba(204,255,0,0.4)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Export Central Archive</span>
            </motion.a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Left Column: Mission History */}
          <div className="lg:col-span-8 space-y-16">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Briefcase className="w-7 h-7 text-neon" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Professional_Chronicles</h3>
                <p className="text-slate-500 font-mono text-[10px] tracking-widest mt-1">SITUATIONAL_EXPERIENCE_MATRIX</p>
              </div>
            </div>

            {experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-12 border-l border-white/5 group pb-16 last:pb-0"
              >
                {/* Timeline Node */}
                <div className="absolute -left-[9px] top-0 w-[17px] h-[17px] bg-void border-[3px] border-white/10 rounded-full group-hover:border-neon group-hover:shadow-[0_0_15px_rgba(204,255,0,0.8)] transition-all duration-500"></div>
                
                <div className="bg-surface/20 backdrop-blur-3xl border border-white/5 p-10 rounded-[2rem] group-hover:border-neon/20 transition-all duration-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                     <Terminal className="w-32 h-32" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                      <h4 className="text-2xl font-bold text-white group-hover:text-neon transition-colors duration-500">{exp.role}</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-neon/80 font-mono text-[10px] uppercase tracking-widest border border-neon/30 px-2 py-0.5 rounded-full">{exp.company}</span>
                        <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-slate-600 font-mono text-[10px] bg-white/5 border border-white/5 px-4 py-2 rounded-xl whitespace-nowrap">
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-neon/40 to-transparent"></div>
                    <p className="text-slate-400 text-base leading-relaxed pl-8 font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Knowledge & Tech Matrix */}
          <div className="lg:col-span-4 space-y-12">
            {/* Neural Matrix (Skills) */}
            <div className="bg-surface/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/5 rounded-full blur-[50px]"></div>
              
              <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-neon/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-neon" />
                </div>
                Neural_Core
              </h3>

              <div className="space-y-10">
                {skills.map((skill, idx) => (
                  <div key={idx} className="group/skill">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4 flex justify-between items-center group-hover/skill:text-neon transition-colors">
                      <span>{skill.category}</span>
                      <Activity className="w-3 h-3 opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-mono text-slate-400 hover:border-neon/40 hover:text-white hover:bg-neon/5 transition-all cursor-crosshair">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Block */}
            <div className="bg-surface/20 backdrop-blur-md border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                <GraduationCap className="w-20 h-20" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-400" />
                </div>
                Academic_Logic
              </h3>

              <div className="space-y-8">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-white/5 hover:border-blue-500/40 transition-colors">
                    <div className="text-[10px] font-mono text-blue-400 mb-1">{edu.status}</div>
                    <div className="text-sm font-bold text-white leading-tight group-hover:text-blue-200 transition-colors">{edu.degree}</div>
                    <div className="text-[9px] text-slate-500 font-mono uppercase mt-2 tracking-widest">{edu.school}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- TACTICAL BADGE VAULT --- */}
        <div className="pt-32 border-t border-white/5 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-neon"></div>
                  <span className="text-[10px] font-mono text-neon uppercase tracking-[0.5em] font-bold">Credential_Vault</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">TECHNICAL <span className="text-slate-600">BADGES</span></h3>
            </div>
            
            <motion.a 
                href="https://www.credly.com/users/ramdinesh-boopalan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-4 text-xs font-mono text-black font-bold bg-neon px-8 py-4 rounded-2xl hover:bg-white transition-all group shadow-[0_0_30px_rgba(204,255,0,0.1)] hover:shadow-[0_0_40px_rgba(204,255,0,0.3)]"
            >
                <Verified className="w-5 h-5" />
                VERIFY_ON_CREDLY.OS
                <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                className="group flex flex-col items-center text-center space-y-6 relative"
              >
                {/* Holographic Badge Container */}
                <div className="relative w-28 h-28 flex items-center justify-center cursor-help">
                   {/* Orbiting Ring */}
                   <motion.div 
                    className={`absolute inset-0 border border-white/5 rounded-[2rem] transition-all duration-700 group-hover:border-neon/40 group-hover:rotate-45 group-hover:scale-110`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   />
                   
                   {/* Main Badge Body */}
                   <div className={`w-20 h-20 rounded-[1.5rem] bg-surface border border-white/10 flex items-center justify-center relative z-10 transition-all duration-500 group-hover:bg-black group-hover:border-neon group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${cert.glow.replace('shadow-', 'group-hover:shadow-')}`}>
                      {/* Internal Grid Glow */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjA0LDI1NSwwLDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <cert.icon className={`w-10 h-10 transition-all duration-500 group-hover:scale-110 ${cert.color}`} />
                      
                      {/* Scanning Line */}
                      <motion.div 
                        className="absolute left-0 right-0 h-px bg-neon/40 z-20 opacity-0 group-hover:opacity-100"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      />
                   </div>
                   
                   {/* Active Status Beacon */}
                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-void group-hover:animate-ping z-30"></div>
                </div>
                
                <div className="space-y-2 relative z-10">
                   <h4 className="text-[11px] font-black font-mono text-white group-hover:text-neon transition-colors uppercase tracking-tight leading-none px-2">{cert.name}</h4>
                   <p className="text-[9px] font-mono text-slate-500 group-hover:text-slate-300 transition-colors uppercase tracking-[0.1em] font-medium">{cert.issuer}</p>
                   
                   {/* Hover Detail Revealed */}
                   <AnimatePresence>
                     <motion.div 
                        className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 p-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl z-50 pointer-events-none"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-[9px] font-mono text-neon uppercase tracking-tighter leading-tight">{cert.detail}</p>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                           <span className="text-[8px] font-mono text-slate-500">STATUS: VERIFIED</span>
                        </div>
                     </motion.div>
                   </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Subtle Cyber Grid Floor under badges */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neon/[0.03] to-transparent pointer-events-none -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
