/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroScene, QuantumComputerScene } from './components/QuantumScene';
import { SurfaceCodeDiagram, TransformerDecoderDiagram, PerformanceMetricDiagram } from './components/Diagrams';
import { FloatingHeartsBackground, EntranceGate, FilmStripTransition } from './components/Effects';
import { ArrowDown, Menu, X, Heart, Star, Music, Camera, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// Using classic romance movie scenes for the imagery
const PHOTO_URLS = {
  // Titanic: Jack and Rose at the bow
  mainStory: "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/since2022.jpg",
  // La La Land: The iconic dance under the stars
  date: "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/firstdate.jpg",
  // The Notebook: Kiss in the rain
  travel: "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/Travel%20Diaries.jpg",
  // 10 Things I Hate About You: Paintball scene (Playful/Silly)
  silly: "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/Silly%20Faces.jpg",
  // About Time: The Wedding in the wind (New Year/Future vibe)
  newyear: "https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/New%20Year%202026.jpg",
};

const PhotoCard = ({ caption, delay, color, image }: { caption: string, delay: string, color: string, image: string }) => {
  return (
    <div className={`flex flex-col group animate-fade-in-up items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-xs rotate-1 hover:rotate-0`} style={{ animationDelay: delay }}>
      <div className={`w-full aspect-[4/5] ${color} rounded-lg mb-4 overflow-hidden relative`}>
         <div className="absolute inset-0 flex items-center justify-center text-white/50">
            <Camera size={48} />
         </div>
         <img 
            src={image} 
            alt={caption} 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
         />
      </div>
      <p className="font-serif text-lg text-love-text text-center italic">{caption}</p>
    </div>
  );
};

// --- MUSIC PLAYER COMPONENT ---
const MusicPlayer = () => {
  // Start with 'true' to attempt autoplay
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Royalty-free romantic piano music
  const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

  // Attempt to autoplay on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented.
          // Show a UI element to let the user manually start playback.
          console.log("Autoplay prevented:", error);
          setPlaying(false);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.4; // Set a gentle volume
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio ref={audioRef} src={MUSIC_URL} loop autoPlay />
      
      <button 
        onClick={togglePlay}
        className={`group flex items-center gap-3 pl-1 pr-4 py-1 rounded-full transition-all duration-300 shadow-lg border border-white/20 backdrop-blur-md ${playing ? 'bg-love-red/90 text-white w-auto' : 'bg-white/80 text-love-text hover:bg-white w-12 hover:w-32 overflow-hidden'}`}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform ${playing ? 'animate-spin-slow' : ''}`}>
           {playing ? <Music size={20} /> : <Play size={20} className="ml-1" />}
        </div>
        
        <div className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${playing ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-20 group-hover:opacity-100'}`}>
           <span className="text-xs font-bold tracking-widest uppercase">{playing ? 'Playing' : 'Play Music'}</span>
        </div>
        
        {playing && (
           <div className="flex gap-0.5 items-end h-3 mb-1">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-white/50 rounded-full" />
              <motion.div animate={{ height: [6, 16, 6] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }} className="w-1 bg-white/50 rounded-full" />
              <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 bg-white/50 rounded-full" />
           </div>
        )}
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-love-light text-stone-800 selection:bg-love-pink selection:text-white overflow-x-hidden">
      
      {/* Background Music Player */}
      <MusicPlayer />

      {/* 2D Background Hearts - Visible always for romance */}
      <FloatingHeartsBackground />

      {/* Entrance Gate */}
      <AnimatePresence>
        {!gateOpen && <EntranceGate onUnlock={() => setGateOpen(true)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-love-red rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                <Heart size={20} fill="currentColor" />
            </div>
            <span className={`font-serif font-bold text-xl tracking-wide text-love-text transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              Theo & Candy <span className="font-sans text-xs font-normal text-rose-400 block -mt-1 tracking-widest uppercase">Est. 2022</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#story" onClick={scrollToSection('story')} className="hover:text-love-red transition-colors cursor-pointer uppercase">Our Story</a>
            <a href="#memories" onClick={scrollToSection('memories')} className="hover:text-love-red transition-colors cursor-pointer uppercase">Memories</a>
            <a href="#future" onClick={scrollToSection('future')} className="hover:text-love-red transition-colors cursor-pointer uppercase">Future</a>
            <div className="px-4 py-1.5 bg-love-red text-white rounded-full text-xs font-bold tracking-widest shadow-md">
              HAPPY NEW YEAR
            </div>
          </div>

          <button className="md:hidden text-love-text p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FFF1F2] flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in text-love-text">
            <a href="#story" onClick={scrollToSection('story')}>Our Story</a>
            <a href="#memories" onClick={scrollToSection('memories')}>Memories</a>
            <a href="#future" onClick={scrollToSection('future')}>The Future</a>
            <div className="text-base font-sans text-rose-400 mt-4">Happy 2026 Candy! ❤️</div>
            <button className="absolute top-6 right-6 p-2" onClick={() => setMenuOpen(false)}>
                <X size={32} />
            </button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,241,242,0.85)_0%,rgba(255,241,242,0.4)_60%,rgba(255,241,242,0.1)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 border border-love-pink text-love-text text-xs tracking-[0.3em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/40 shadow-sm">
             New Year's Eve Surprise
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-tight mb-6 text-love-text drop-shadow-sm">
            For Candy<span className="text-love-red">.</span>
          </h1>
          <p className="max-w-xl mx-auto text-xl md:text-2xl text-stone-600 font-light leading-relaxed mb-12 italic">
            "Every moment with you is my favorite memory. Here's to us, from 2022 to forever."
          </p>
          
          <div className="flex justify-center">
             <a href="#story" onClick={scrollToSection('story')} className="group flex flex-col items-center gap-2 text-sm font-medium text-rose-400 hover:text-love-red transition-colors cursor-pointer">
                <span className="tracking-widest uppercase">Start the journey</span>
                <span className="p-3 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform text-love-red">
                    <ArrowDown size={20} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Story Intro */}
        <section id="story" className="py-24 bg-white/80 backdrop-blur-sm relative">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-2 border-4 border-white">
                  {/* UPDATE: Using classic Titanic image */}
                  <img src={PHOTO_URLS.mainStory} alt="Us" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-love-text/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white font-serif text-2xl">Since 2022</div>
              </div>
            </div>
            <div className="md:col-span-7 text-lg text-stone-600 leading-relaxed space-y-6">
               <div className="inline-flex items-center gap-2 text-rose-500 font-bold tracking-widest text-xs uppercase mb-2">
                  <Star size={14} fill="currentColor" /> Our Chapter
               </div>
              <h2 className="font-serif text-5xl mb-6 leading-tight text-love-text">Three Years of <br/><span className="italic text-rose-400">Magic</span></h2>
              
              <p>
                <span className="text-6xl float-left mr-3 mt-[-10px] font-serif text-love-red">D</span>o you remember when we first met in 2022? It feels like yesterday, yet we've built a whole world together since then.
              </p>
              <p>
                From our quiet moments to our loud laughs, you have been the brightest part of my life. This page is just a small collection of the love I have for you.
              </p>

              <SurfaceCodeDiagram />
            </div>
          </div>
        </section>

        {/* Memories / Interactive */}
        <section id="memories" className="py-24 border-t border-rose-100 bg-love-light/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-rose-400 uppercase">Gallery</div>
                    <h2 className="font-serif text-4xl md:text-5xl mb-4 text-love-text">Snapshots of Us</h2>
                    <p className="text-stone-500 max-w-xl mx-auto italic">Some of the moments I cherish the most.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <PhotoCard caption="Our First Date" delay="0s" color="bg-rose-200" image={PHOTO_URLS.date} />
                    <PhotoCard caption="Travel Diaries" delay="0.1s" color="bg-blue-200" image={PHOTO_URLS.travel} />
                    <PhotoCard caption="Silly Faces" delay="0.2s" color="bg-yellow-200" image={PHOTO_URLS.silly} />
                    <PhotoCard caption="New Year 2026" delay="0.3s" color="bg-purple-200" image={PHOTO_URLS.newyear} />
                </div>
                
                {/* Stats */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <PerformanceMetricDiagram />
                </div>
            </div>
        </section>

        {/* The Decryptor / Letter */}
        <section className="py-24 bg-love-text text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-rose-500 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-yellow-400 blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1 flex justify-center">
                        <TransformerDecoderDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-rose-200 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-white/20">
                            For Your Eyes Only
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">A Little Note</h2>
                        <p className="text-lg text-rose-100 mb-6 leading-relaxed">
                            Sometimes it's hard to say everything out loud. I wanted to write something down for you to keep.
                        </p>
                        <p className="text-lg text-rose-100 leading-relaxed italic">
                            Decode the message to see my wish for you in 2026.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Future / 3D Scene */}
        <section id="future" className="py-24 bg-white/80 border-t border-rose-100 min-h-[600px] relative">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                <div className="md:col-span-6 relative h-[500px] md:h-auto">
                    <div className="w-full h-full bg-love-light rounded-2xl overflow-hidden relative border border-rose-200 shadow-inner">

      
                      <QuantumComputerScene />
                      
                      <img
                        src="https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/lovecandy.jpg"
                        alt="Our Memory"
                        className="absolute inset-0 w-full h-full object-cover opacity-90"
                      />
                      
                      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none z-10">
                        <div className="inline-block bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs text-love-text font-serif italic shadow-sm">
                          Lovely Candy 
                        </div>
                      </div>

                    </div>

                </div>
                <div className="md:col-span-6 flex flex-col justify-center relative">
                    
                    {/* FILM STRIP - Always Visible Loop */}
                    <div className="mb-6">
                        <h3 className="text-center font-serif text-sm tracking-widest text-rose-400 uppercase mb-2">Memories Rewinding</h3>
                        <FilmStripTransition />
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="inline-block mb-3 text-xs font-bold tracking-widest text-rose-400 uppercase">2026 & BEYOND</div>
                        <h2 className="font-serif text-4xl mb-6 text-love-text">Ready for the New Year?</h2>
                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                            As we step into 2026, I want you to know that I am so excited for everything we will do together. More dates, more movies, more laughter.
                        </p>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                            You are my favorite person, Candy. Happy New Year!
                        </p>
                        
                        <div className="p-8 bg-[#FFF1F2] border border-rose-200 rounded-2xl border-l-4 border-l-love-red shadow-sm">
                            <p className="font-serif italic text-2xl text-love-text mb-4">
                                "I love you."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-stone-300 overflow-hidden border border-rose-200">
                                    {/* Updated Profile Picture with classic movie look */}
                                    <img src="https://raw.githubusercontent.com/theo913987/picture2026/refs/heads/main/thefuture.jpg" alt="Theo" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Theo</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </section>

      </main>

      <footer className="bg-love-text text-rose-200 py-12 border-t border-rose-900 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Heart fill="currentColor" className="text-love-red" /> Theo & Candy
                </div>
                <p className="text-sm opacity-80">Made with ❤️ for the best girl in the world.</p>
            </div>
            <div className="text-center md:text-right">
                <div className="text-4xl font-serif text-white/20">2026</div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;