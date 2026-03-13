"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-primary-bg)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-20">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-serif text-5xl md:text-7xl text-[var(--color-primary-text)] mb-6 text-balance"
           >
             Discretion. Insight. <br/><span className="italic text-[var(--color-accent-gold)]">Excellence.</span>
           </motion.h1>
        </div>

        {/* Editorial Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Large Portrait */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative aspect-[3/4] w-full"
            >
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop"
                alt="Principal Broker Portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            {/* Overlay Info Box */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4 }}
               className="absolute -bottom-10 -right-10 bg-white p-8 shadow-2xl hidden md:block"
            >
               <h3 className="font-serif text-2xl text-[var(--color-primary-text)] mb-1">Elena Rodriguez</h3>
               <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-accent-gold)] font-bold">Principal Founder</p>
            </motion.div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 lg:pl-10 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-8 leading-tight">
                "We built PRG Property Group to serve the exact needs of the modern ultra-high-net-worth individual."
              </h2>
              
              <div className="space-y-6 font-sans text-lg text-gray-600 leading-relaxed text-balance">
                <p>
                  With over 15 years of dedicated experience in the South Florida luxury market, PRG Property Group was founded on a simple premise: real estate advisory should be as sophisticated as wealth management.
                </p>
                <p>
                  Our team doesn’t just chase transactions. We analyze market trends, understand the nuances of hyper-local zoning laws, and maintain a whisper network of off-market opportunities that never reach the public domain. 
                </p>
                <p>
                  Whether you are acquiring a waterfront compound in Coral Gables or divesting a penthouse on Miami Beach, we ensure absolute discretion, precision marketing, and seamless execution.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-300">
                <div>
                  <span className="block font-serif text-4xl text-[var(--color-primary-text)] mb-2">$500M+</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">Career Sales</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl text-[var(--color-primary-text)] mb-2">15</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">Years Experience</span>
                </div>
                <div>
                  <span className="block font-serif text-4xl text-[var(--color-primary-text)] mb-2">#1</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">Boutique Agency</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
