
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Ventures', href: '#ventures' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Writing', href: '#writing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-out ${
          scrolled 
            ? 'bg-surface/80 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] rounded-full py-2 px-6 w-auto min-w-[300px]' 
            : 'bg-transparent border border-transparent py-4 px-4 w-full max-w-7xl'
        }`}>
          <div className="flex justify-between items-center gap-6">
            <a 
              href="#" 
              onClick={scrollToTop}
              className="flex items-center gap-3 group"
            >
              {/* Custom AI Logo */}
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 overflow-hidden ${
                scrolled 
                  ? 'bg-absolute-black/50 border border-white/10' 
                  : 'bg-white/5 border border-white/10'
                } group-hover:border-neon/50 group-hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]`}>
                 
                 {/* Logo SVG */}
                 <svg className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Stroke adjusts: White in Dark Mode, Black in Light Mode (unless scrolled header handles BG) */}
                    <path d="M7 4V20" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M7 11H12C14.2 11 16 9.2 16 7C16 4.8 14.2 3 12 3H7" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M12 11L17 19" stroke={theme === 'dark' ? 'white' : 'black'} strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Neon Nodes */}
                    <circle cx="17" cy="19" r="2" className="fill-neon" />
                    <circle cx="12" cy="7" r="1.5" className="fill-neon group-hover:animate-pulse" />
                    <circle cx="7" cy="11" r="1.5" className="fill-white group-hover:fill-neon transition-colors duration-300" />
                 </svg>

                 {/* Animated Scanline Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out"></div>
              </div>

              <div className="flex flex-col justify-center">
                <span className={`font-bold tracking-tight leading-none text-white group-hover:text-neon transition-colors duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}>
                  RAMDINESH
                </span>
                <span className={`text-[10px] font-mono text-slate-400 tracking-[0.2em] leading-none mt-0.5 group-hover:text-white transition-colors duration-300 ${scrolled ? 'hidden' : 'block'}`}>
                  .AI_DEV
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative px-4 py-2 text-xs font-mono font-medium text-slate-400 hover:text-neon transition-colors group overflow-hidden rounded-full hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

              <button
                onClick={toggleTheme}
                className="p-2 text-slate-400 hover:text-neon hover:bg-white/5 rounded-full transition-colors"
                title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <a 
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="ml-4 px-5 py-2 text-xs font-bold font-mono text-absolute-black bg-neon rounded-full hover:bg-absolute-white hover:scale-105 transition-all duration-300 shadow-[0_0_10px_rgba(204,255,0,0.3)] hover:shadow-[0_0_20px_rgba(204,255,0,0.5)]"
              >
                LET'S TALK
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
              >
                 {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-white/10 rounded-full transition-colors pointer-events-auto"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden pt-28 px-6"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 hover:to-neon transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;