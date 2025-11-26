import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Linkedin, ExternalLink, Zap } from 'lucide-react';

const articles = [
  {
    title: "RDX: Ideas, Impact, Ignition",
    readTime: "Weekly Newsletter",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/newsletters/rdx-ideas-impact-ignition-7389272577468321792/",
    highlight: true
  },
  {
    title: "Learning Through Everyday Analogies",
    readTime: "5 min read",
    platform: "Medium",
    url: "https://medium.com/@ramdinesh/list/learnthroughanalogy-271483e88688"
  },
  {
    title: "Engaging Articles on LinkedIn",
    readTime: "7 min read",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/ramdineshboopalan/recent-activity/articles/"
  }
];

const Writing: React.FC = () => {
  return (
    <section id="writing" className="py-20 bg-void relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Intro */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Writing, Ideas & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-pink-500">Analogies</span>
            </h2>
            <p className="text-slate-200 text-lg mb-8 leading-relaxed">
              I believe the best way to understand complex technology is through simple, relatable analogies. 
            </p>
            <p className="text-slate-400 mb-8">
              Whether it's explaining system design using city planning concepts or breaking down LLMs using library metaphors, I write to make tech accessible and to share my journey in building intelligent systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://medium.com/@ramdinesh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-white text-black border border-slate-300 dark:border-transparent font-bold rounded-full hover:bg-slate-200 transition-colors"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Medium Profile
              </a>
              <a 
                href="http://www.linkedin.com/in/ramdineshboopalan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-[#0077b5] text-absolute-white font-bold rounded-full hover:bg-[#006396] transition-colors"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Right Column: Article Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
             {articles.map((article, idx) => (
               <motion.a 
                 key={idx}
                 href={article.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className={`group block bg-surface border p-6 rounded-xl transition-all duration-300 ${
                   article.highlight 
                    ? 'border-neon/40 shadow-[0_0_20px_-5px_rgba(var(--color-neon),0.15)] hover:border-neon hover:shadow-[0_0_30px_-5px_rgba(var(--color-neon),0.3)]' 
                    : 'border-white/5 hover:border-secondary/50'
                 }`}
               >
                 <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                            article.platform === 'Medium' ? 'bg-absolute-black text-absolute-white' : 'bg-[#0077b5] text-absolute-white'
                        }`}>
                        {article.platform}
                        </span>
                        {article.highlight && (
                            <span className="text-xs font-bold px-2 py-1 rounded bg-neon text-absolute-white dark:text-black flex items-center gap-1">
                                <Zap className="w-3 h-3" fill="currentColor" /> FEATURED
                            </span>
                        )}
                    </div>
                    <span className={`text-xs ${article.highlight ? 'text-neon' : 'text-slate-400'}`}>{article.readTime}</span>
                 </div>
                 <h3 className={`text-xl font-bold mb-2 transition-colors ${article.highlight ? 'text-white group-hover:text-neon' : 'text-white group-hover:text-secondary'}`}>
                   {article.title}
                 </h3>
                 <div className={`flex items-center text-sm transition-colors ${article.highlight ? 'text-slate-300 group-hover:text-white' : 'text-slate-400 group-hover:text-white'}`}>
                    {article.highlight ? 'Subscribe Now' : 'Read Article'} <ExternalLink className="w-3 h-3 ml-1" />
                 </div>
               </motion.a>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Writing;