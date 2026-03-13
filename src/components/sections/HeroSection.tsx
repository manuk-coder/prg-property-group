"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mt-20">

        
        <motion.h1 
          className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-6"
          initial={{ opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}
          animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
        >
          LIVING & INVESTING,<br />ELEVATED.
        </motion.h1>

        <motion.p
          className="text-white/90 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Discover Your Perfect Home or Prime Investment in Key Biscayne, Midtown, or the Design District.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
           className="mt-12"
        >
          <a href="#portfolio" className="inline-block border border-white text-white px-8 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-black transition-colors duration-300">
            Explore Portfolio
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="uppercase tracking-[0.3em] text-[10px]">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-white absolute top-0"
            animate={{ top: ['-50%', '150%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
