"use client";

import { motion } from "framer-motion";

export function TestimonialCTA() {
  return (
    <>
      {/* Testimonial Pull-Quote */}
      <section className="py-32 bg-[var(--color-primary-bg)] flex items-center justify-center text-center px-6">
        <div className="max-w-4xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="absolute -top-16 -left-8 text-8xl md:text-[12rem] font-serif text-[var(--color-accent-gold)] opacity-20 leading-none">
              &ldquo;
            </span>
            <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[var(--color-primary-text)] leading-tight italic z-10 relative">
              PRG Property Group brought a level of sophistication and market insight that I hadn't experienced before. Absolutely essential.
            </h3>
            <span className="block mt-12 font-sans uppercase tracking-[0.2em] text-sm font-bold text-gray-500">
              Marcus T. — Executive & Investor
            </span>
          </motion.div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-accent-gold)] opacity-5 transform skew-x-12 translate-x-1/4"></div>

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 leading-none tracking-tight">
              Let's Make<br />It Happen.
            </h2>
            <p className="font-sans text-gray-400 max-w-2xl mx-auto text-lg mb-12">
              Ready to elevate your move? Connect with our team of specialists for a private consultation regarding your South Florida real estate needs.
            </p>
            <a href="/contact" className="inline-block bg-[var(--color-primary-bg)] text-[var(--color-primary-text)] px-10 py-5 uppercase tracking-widest text-sm font-bold hover:bg-[var(--color-accent-gold)] hover:text-white transition-all duration-300">
              Start the Conversation
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
