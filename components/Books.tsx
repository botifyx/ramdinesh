
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, BookOpen, Tablet, ArrowRight } from 'lucide-react';

const books = [
  {
    id: 1,
    title: "Code Craft",
    subtitle: "Mastering Programming With Everyday Analogies",
    desc: "You'll see how analogies can make programming more accessible and enjoyable for you, too.",
    price: "$9.99",
    rating: 4.9,
    reviews: 128,
    tags: ["Tech Strategy", "Programming", "Best Seller"],
    url: "https://amzn.in/d/69RKNZl",
    cover: "https://m.media-amazon.com/images/I/71l+p-vaVeL._AC_UY218_.jpg?width=400&height=600&nologo=true"
  },
  {
    id: 2,
    title: "The Riot of Time",
    subtitle: "Book 1 - Rian Veylor Chronicles",
    desc: "“The Riot of Time” is a gripping fusion of sci-fi, thriller, romance, and multiverse mystery—crafted for readers who crave emotional depth, heart-pounding action, and cinematic storytelling.",
    price: "$11.00",
    rating: 4.7,
    reviews: 84,
    tags: ["Sci-Fi", "Fiction", "Kindle Unlimited"],
    url: "https://a.co/d/1zHxNP1",
    cover: "https://m.media-amazon.com/images/I/51Ki0OpMI6L._SY300_.jpg?width=400&height=600&nologo=true"
  }
];

const Books: React.FC = () => {
  return (
    <section id="books" className="py-24 bg-void relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              PUBLISHED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">WORKS</span>
            </h2>
            <p className="font-mono text-slate-500 max-w-xl">
              Knowledge codified. Exploring the intersection of humanity and algorithms through long-form narratives.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 text-amber-500 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
            <Tablet className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider">AVAILABLE ON KINDLE</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {books.map((book, index) => (
            <motion.div 
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-surface border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 flex flex-col sm:flex-row gap-8"
            >
              {/* Book Cover Container */}
              <div className="w-full sm:w-1/3 flex-shrink-0 relative perspective-1000">
                <div className="relative aspect-[2/3] rounded-lg shadow-2xl transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-y-12 bg-gray-900 overflow-hidden border border-white/10">
                   <img 
                      src={book.cover} 
                      alt={book.title} 
                      loading="lazy"
                      width="400"
                      height="600"
                      className="w-full h-full object-cover"
                   />
                   {/* Shine effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-4 bg-black/50 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex flex-wrap gap-2 mb-3">
                      {book.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono uppercase px-2 py-1 bg-white/5 rounded text-slate-400 border border-white/5">
                            {tag}
                        </span>
                      ))}
                   </div>
                   
                   <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{book.title}</h3>
                   <div className="text-sm font-mono text-amber-500 mb-4">{book.subtitle}</div>
                   
                   <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      ))}
                      <span className="text-xs text-slate-500 ml-2">({book.reviews} ratings)</span>
                   </div>

                   <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                      {book.desc}
                   </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                   <div className="text-xl font-bold text-white">{book.price}</div>
                   <a 
                     href={book.url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-amber-400 transition-colors"
                   >
                     <ShoppingCart className="w-4 h-4" />
                     Buy on Amazon
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amazon Author Banner */}
        <div className="mt-16 text-center">
            <a 
                href="https://www.amazon.com/s?k=Ramdinesh+Boopalan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
            >
                <span className="font-mono text-sm uppercase tracking-widest border-b border-transparent group-hover:border-amber-500">View Author Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Books;