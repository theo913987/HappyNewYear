/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const FloatingHeartsBackground: React.FC = () => {
  // Generate stable random values for the hearts
  const hearts = React.useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${15 + Math.random() * 15}s`,
    delay: `-${Math.random() * 15}s`, // Negative delay to start mid-animation
    scale: 0.5 + Math.random() * 0.5,
    opacity: 0.3 + Math.random() * 0.3,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute bottom-[-100px] animate-float-up"
          style={{
            left: h.left,
            animationDuration: h.animationDuration,
            animationDelay: h.delay,
            opacity: h.opacity,
            transform: `scale(${h.scale})`,
          }}
        >
           <Heart fill="#FB7185" className="text-rose-300" size={32} />
        </div>
      ))}
    </div>
  );
};

interface EntranceGateProps {
  onUnlock: () => void;
}

export const EntranceGate: React.FC<EntranceGateProps> = ({ onUnlock }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      // The container fades out nicely at the very end to prevent blocking clicks if something lingers
      exit={{ pointerEvents: 'none', transition: { delay: 1.5 } }} 
    >
       {/* Left Curtain */}
       <motion.div 
         initial={{ x: 0 }}
         exit={{ x: '-100%' }}
         transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
         className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#FFF1F2] border-r border-rose-100 flex items-center justify-end pr-8 md:pr-16 shadow-2xl z-10"
       >
          <div className="text-right opacity-20">
             <Heart size={200} className="text-rose-300 rotate-12" />
          </div>
       </motion.div>

       {/* Right Curtain */}
       <motion.div 
         initial={{ x: 0 }}
         exit={{ x: '100%' }}
         transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
         className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#FFF1F2] border-l border-rose-100 flex items-center justify-start pl-8 md:pl-16 shadow-2xl z-10"
       >
          <div className="text-left opacity-20">
             <Heart size={200} className="text-rose-300 -rotate-12" />
          </div>
       </motion.div>
       
       {/* Center Content */}
       <motion.div 
         className="relative z-20 flex flex-col items-center justify-center p-8"
         initial={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
       >
            <div className="text-center mb-12">
                <div className="inline-block px-4 py-1 mb-4 border border-rose-300 rounded-full text-xs font-bold tracking-[0.3em] text-rose-400 uppercase bg-white/50 backdrop-blur-sm">
                    Private Page
                </div>
                <h1 className="font-serif text-5xl md:text-8xl text-love-text mb-2 drop-shadow-sm">
                    Theo <span className="text-rose-400">&amp;</span> Candy
                </h1>
                <p className="font-serif italic text-xl text-stone-500">Since 2022</p>
            </div>
            
            <button 
                onClick={onUnlock}
                className="group relative flex items-center justify-center w-28 h-28 cursor-pointer focus:outline-none"
            >
                <div className="absolute inset-0 bg-rose-200 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-white rounded-full shadow-lg scale-100 group-hover:scale-105 transition-transform duration-300"></div>
                <Heart fill="#BE123C" size={48} className="text-love-red relative z-10 animate-pulse-slow" />
            </button>
            
            <div className="mt-6 text-sm font-medium text-rose-400 animate-bounce tracking-widest uppercase">
                Click to Open
            </div>
       </motion.div>

       {/* Add floating hearts to the gate as well for continuity */}
       <div className="absolute inset-0 z-0 opacity-50">
          <FloatingHeartsBackground />
       </div>
    </motion.div>
  );
};

export const FilmStripTransition: React.FC = () => {
  // Use classic romance movie scenes for the film strip
  const images = [
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/1.jpg", // Titanic
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/2.jpg", // La La Land
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/3.jpg", // The Notebook
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/4.jpg", // 10 Things I Hate About You
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/5.jpg", // About Time
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/6.jpg", // Pride and Prejudice
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/7.jpg", // Roman Holiday
    "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/8.jpg", // Duplicate start for loop
  ];

  return (
    <div className="relative w-full h-[200px] overflow-hidden bg-black flex items-center rounded-xl border-y-4 border-stone-800 shadow-xl my-6">
      {/* Film Strip Holes Top */}
      <div className="absolute top-2 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiB4PSI0IiB5PSI0IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4=')] bg-repeat-x opacity-50 z-20"></div>
      
      {/* Moving Content - Infinite Loop */}
      <motion.div 
        className="flex gap-1 h-full py-6 pl-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 // Slower speed for more images
        }}
        style={{ width: "200%" }} // Make container wide enough to hold duplicate set
      >
         {/* We duplicate the images array to create the seamless loop effect */}
         {[...images, ...images].map((src, idx) => (
             <div key={idx} className="relative h-full aspect-[4/3] shrink-0 bg-stone-900 border-x-4 border-black overflow-hidden transition-all duration-500">
                 <img src={src} alt={`Film Frame ${idx}`} className="w-full h-full object-cover opacity-90" />
                 <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/50">{idx + 1}A</div>
             </div>
         ))}
      </motion.div>

      {/* Film Strip Holes Bottom */}
      <div className="absolute bottom-2 left-0 right-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiB4PSI0IiB5PSI0IiBmaWxsPSJ3aGl0ZSIgLz48L3N2Zz4=')] bg-repeat-x opacity-50 z-20"></div>
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-30 pointer-events-none"></div>
    </div>
  );
};