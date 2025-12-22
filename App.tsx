
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Ventures from './components/Ventures';
import Portfolio from './components/Portfolio';
import ModelTraining from './components/ModelTraining';
import Writing from './components/Writing';
import Books from './components/Books';
import CreativeWorks from './components/CreativeWorks';
import AIDemo from './components/AIDemo';
import AgentSandbox from './components/AgentSandbox';
import ResumeSection from './components/ResumeSection';
import GlobalFootprint from './components/GlobalFootprint';
import SocialPortal from './components/SocialPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import LoadingScreen from './components/LoadingScreen';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import StrategyCenter from './components/StrategyCenter';
import FutureHorizon from './components/FutureHorizon';
import IdentityGenerator from './components/IdentityGenerator';
import IndustryOracle from './components/IndustryOracle';
import AmbientNarrator from './components/AmbientNarrator';
import NeuralSearch from './components/NeuralSearch';
import NeuralHandshake from './components/NeuralHandshake';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [isHandshaking, setIsHandshaking] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);

  useEffect(() => {
    // Disable browser automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Initial reset attempt
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setIsHandshaking(true);
    // Reset scroll again between screens to ensure container alignment
    window.scrollTo(0, 0);
  };

  const handleHandshakeComplete = () => {
    setIsHandshaking(false);
    setHasBooted(true);
    
    // Crucial: Reset scroll to top when main content finally mounts.
    // Use behavior: 'auto' to bypass the 'scroll-smooth' defined in index.html for a sharp jump to top.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`bg-void min-h-screen ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'} font-sans selection:bg-neon selection:text-black transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        ) : isHandshaking ? (
          <NeuralHandshake key="handshake" onComplete={handleHandshakeComplete} />
        ) : (
          <motion.div 
            key="content" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <NeuralSearch />
            <main className="relative z-10">
              <Hero theme={theme} autoSync={hasBooted} />
              <IdentityGenerator />
              <About />
              <Ventures />
              <IndustryOracle />
              <Portfolio />
              <StrategyCenter />
              <ResumeSection />
              <ModelTraining />
              <AgentSandbox />
              <FutureHorizon />
              <AIDemo />
              <CreativeWorks />
              <Books />
              <Writing />
              <GlobalFootprint />
              <SocialPortal />
              <Contact />
            </main>
            <Footer />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <ScrollToTop />
            <AmbientNarrator initialBoot={hasBooted} />
            <AiAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
