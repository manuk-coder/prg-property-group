"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function IntroSection() {
  return (
    <section id="portfolio" className="py-32 bg-[var(--color-primary-bg)]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[var(--color-primary-text)] mb-8 leading-tight">
                Curating the Extraordinary.
              </h2>
              <p className="font-sans text-lg text-gray-600 mb-8 leading-relaxed text-balance">
                PRG Property Group represents the pinnacle of luxury real estate in South Florida. We don't just sell homes; we curate lifestyles. Our approach is discreet, analytical, and uncompromisingly high-end.
              </p>
              <a href="/about" className="inline-block border-b-2 border-[var(--color-accent-gold)] text-[var(--color-primary-text)] font-sans font-semibold uppercase tracking-widest text-sm pb-1 hover:text-[var(--color-accent-gold)] transition-colors">
                Our Philosophy
              </a>
            </motion.div>
          </div>

          {/* Right Image Asymmetric */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/3] w-full overflow-hidden"
            >
              <Image 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Luxury living room interior"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Floating Accent Box */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="hidden md:block absolute -bottom-12 -left-12 bg-white p-10 shadow-2xl z-10 max-w-sm"
            >
               <p className="font-serif text-2xl italic text-[var(--color-primary-text)]">
                 "A seamless transaction, from the first showing to the final signature."
               </p>
               <span className="block mt-4 font-sans uppercase tracking-widest text-xs font-bold text-[var(--color-accent-gold)]">
                 — Private Client, Coral Gables
               </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
