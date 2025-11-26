import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { name: 'BotifyX', url: 'https://www.botifyx.in' },
    { name: 'Taintra', url: 'https://www.taintra.com' },
    { name: 'AICopzy', url: 'https://www.aicopzy.com' },
    { name: 'LearnThroughAnalogy', url: 'https://www.learnthroughanalogy.com' },
  ];

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-sm">
          © {currentYear} Ramdinesh Boopalan. All rights reserved.
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;