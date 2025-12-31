/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Camera, Sparkles, MessageCircleHeart, Music } from 'lucide-react';

// --- LOVE TIMELINE (Replaces Surface Code) ---
export const SurfaceCodeDiagram: React.FC = () => {
  // Timeline with classic movie scenes
  const photos = [
    { 
      year: '2022', 
      title: 'The Beginning', 
      desc: 'Like Noah and Allie, our story began with a spark that would last forever.', 
      color: 'bg-rose-500',
      image: 'https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/thebeginning.jpg' // The Notebook
    },
    { 
      year: '2023', 
      title: 'Adventures', 
      desc: 'Exploring the world like Joe and Princess Ann in Roman Holiday.', 
      color: 'bg-pink-400',
      image: 'https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/adventure.jpg' // Roman Holiday
    },
    { 
      year: '2024', 
      title: 'Growing Closer', 
      desc: 'Dancing through life under the stars, just like in La La Land.', 
      color: 'bg-rose-600',
      image: 'https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/growingcloser.jpg' // La La Land
    },
    { 
      year: '2026', 
      title: 'The Future', 
      desc: 'Cherishing every day together, creating our own About Time moments.', 
      color: 'bg-red-500',
      image: 'https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/thefuture.jpg' // About Time
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-rose-100 my-8">
      <h3 className="font-serif text-2xl mb-2 text-love-text">Our Cinematic Journey</h3>
      <p className="text-sm text-love-text/70 mb-8 text-center max-w-md italic">
        Click the years to see our movie moments...
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl justify-between items-start relative">
         {/* Line */}
         <div className="absolute top-6 left-0 right-0 h-1 bg-rose-200 hidden md:block -z-10"></div>
         <div className="absolute left-6 top-0 bottom-0 w-1 bg-rose-200 md:hidden -z-10"></div>

         {photos.map((item, idx) => (
             <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-4 w-full md:w-1/4 cursor-pointer group" onClick={() => setActiveIdx(idx)}>
                {/* Dot */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 z-10 shrink-0 ${idx === activeIdx ? 'bg-love-red scale-110 shadow-lg shadow-rose-300' : 'bg-rose-300 hover:bg-rose-400'}`}>
                    {idx === activeIdx ? <Heart size={20} fill="white" /> : <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                
                {/* Content Card */}
                <div className={`flex-1 overflow-hidden rounded-xl transition-all duration-500 w-full ${idx === activeIdx ? 'bg-white shadow-lg border border-rose-100 scale-100 opacity-100' : 'opacity-60 md:scale-95'}`}>
                    {/* Image Thumbnail */}
                    <div className="h-32 w-full overflow-hidden relative">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-2 left-3 font-serif text-xl font-bold text-white shadow-black drop-shadow-md">{item.year}</div>
                    </div>
                    
                    <div className="p-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">{item.title}</div>
                        <div className="text-sm text-stone-600 leading-snug font-serif italic">{item.desc}</div>
                    </div>
                </div>
             </div>
         ))}
      </div>
    </div>
  );
};

// --- SECRET MESSAGE DECODER (Replaces Transformer) ---
export const TransformerDecoderDiagram: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const secretMessage = "I love you more than words can say. Happy New Year, my love! ❤️";
  const scrambled = "I love you more than words can say. Happy New Year! ✨";

  return (
    <div className="flex flex-col items-center p-8 bg-white/90 rounded-2xl border border-rose-200 shadow-xl my-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 via-red-500 to-rose-400"></div>
      
      <h3 className="font-serif text-2xl mb-4 text-love-text flex items-center gap-2">
        <MessageCircleHeart className="text-rose-500" />
        Message from Theo
      </h3>
      
      <div className="relative w-full max-w-lg p-8 bg-love-light rounded-xl border border-rose-100 text-center min-h-[120px] flex items-center justify-center flex-col gap-4">
         <p className="font-serif text-xl md:text-2xl text-love-text leading-relaxed transition-all duration-500">
            {revealed ? secretMessage : scrambled}
         </p>
         
         {!revealed && (
             <button 
                onClick={() => setRevealed(true)}
                className="mt-4 px-6 py-2 bg-love-red text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-sm flex items-center gap-2"
             >
                <Sparkles size={16} /> Tap to Decrypt
             </button>
         )}
         
         {revealed && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-500 font-bold uppercase tracking-widest mt-2"
            >
                Sent with love
            </motion.div>
         )}
      </div>
    </div>
  );
};

// --- DAYS TOGETHER COUNTER (Replaces Performance Chart) ---
export const PerformanceMetricDiagram: React.FC = () => {
    // Fixed count as requested
    const daysTogether = 1176;
    
    // Some fun stats
    const hours = daysTogether * 24;
    const loveLevel = 1000; // Arbitrary high number

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-love-text text-white rounded-2xl my-8 shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-32 bg-rose-500 rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-0 left-0 p-20 bg-love-red rounded-full blur-[80px] opacity-30"></div>

            <div className="flex-1 min-w-[240px] z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold tracking-widest mb-4 border border-white/20">
                    <Calendar size={12} /> EST. 2022
                </div>
                <h3 className="font-serif text-3xl md:text-4xl mb-2 text-white">Counting Every Moment</h3>
                <p className="text-rose-200 text-sm mb-6 leading-relaxed">
                    Time flies when I'm with you. Here is how long we've been building our story together.
                </p>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <div className="text-4xl font-serif font-bold text-white mb-1">{daysTogether}</div>
                    <div className="text-[10px] uppercase tracking-widest text-rose-200">Days Together</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <div className="text-4xl font-serif font-bold text-white mb-1">∞</div>
                    <div className="text-[10px] uppercase tracking-widest text-rose-200">Love Level</div>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-rose-500 to-love-red p-6 rounded-2xl text-center shadow-lg transform hover:scale-105 transition-transform">
                    <div className="text-xl font-serif italic">"The best is yet to come."</div>
                </div>
            </div>
        </div>
    )
}