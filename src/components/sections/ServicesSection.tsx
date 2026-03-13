"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Advisory & Strategy",
    description: "Data-driven market analysis and portfolio optimization for high-net-worth individuals and institutional investors."
  },
  {
    title: "Acquisition & Sales",
    description: "End-to-end management of complex transactions, ensuring maximum value extraction and discreet execution."
  },
  {
    title: "Marketing & Positioning",
    description: "Bespoke global marketing campaigns utilizing world-class photography, editorial storytelling, and targeted outreach."
  },
  {
    title: "Relocation & Lifestyle",
    description: "Full-service concierge support for international clients transitioning to the South Florida market."
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Sticky Header */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-5xl md:text-6xl text-[var(--color-primary-bg)] mb-6 leading-tight">
                Our<br/>Expertise.
              </h2>
              <div className="w-12 h-[1px] bg-[var(--color-accent-gold)] mb-8"></div>
              <p className="font-sans text-gray-400 max-w-md text-lg text-balance">
                A comprehensive suite of real estate services tailored for the most discerning clients. Expect precision, absolute discretion, and unmatched local knowledge.
              </p>
            </motion.div>
          </div>

          {/* Right Services List */}
          <div className="space-y-16 lg:mt-32">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-b border-gray-800 pb-12"
              >
                <div className="flex gap-6 items-start">
                  <span className="font-serif text-2xl text-[var(--color-accent-gold)] font-bold italic">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 group-hover:text-[var(--color-primary-bg)] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans text-gray-400 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
