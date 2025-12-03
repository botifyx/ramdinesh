
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Ventures from './components/Ventures';
import Portfolio from './components/Portfolio';
import ModelTraining from './components/ModelTraining';
import Writing from './components/Writing';
import Books from './components/Books';
import Certifications from './components/Certifications';
import CreativeWorks from './components/CreativeWorks';
import GlobalFootprint from './components/GlobalFootprint';
import SocialPortal from './components/SocialPortal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Update HTML attribute for CSS variables
    document.documentElement.setAttribute('data-theme', theme);

    // Update browser theme color for mobile bars/browser UI
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      // Match the --color-void variable (Dark: #050505, Light: #f1f5f9)
      metaThemeColor.setAttribute("content", theme === 'dark' ? '#050505' : '#f1f5f9');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="bg-void min-h-screen text-slate-200 font-sans selection:bg-neon selection:text-black transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero theme={theme} />
        <About />
        <Ventures />
        <Portfolio />
        <ModelTraining />
        <Certifications />
        <CreativeWorks />
        <Books />
        <Writing />
        <GlobalFootprint />
        <SocialPortal />
        <Contact />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
}

export default App;
