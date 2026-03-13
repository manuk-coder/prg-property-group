"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-primary-bg)] min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-20 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-serif text-5xl md:text-7xl text-[var(--color-primary-text)] mb-6 text-balance"
           >
             Start the <span className="italic text-[var(--color-accent-gold)]">Conversation.</span>
           </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-sans text-lg text-gray-500 max-w-2xl mx-auto"
           >
             Off-market inquiries, portfolio consultations, or private showings. Our team is available at your convenience.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 bg-white p-12 shadow-xl"
          >
            <div>
              <h3 className="font-serif text-2xl text-[var(--color-primary-text)] mb-6">Miami Headquarters</h3>
              <div className="flex items-start gap-4 text-gray-600 mb-4">
                <MapPin className="text-[var(--color-accent-gold)] shrink-0 mt-1" size={20} />
                <p className="font-sans text-lg">1200 Brickell Ave, Suite 1500<br/>Miami, FL 33131<br/><span className="text-sm text-gray-400 mt-2 block">Available by appointment only.</span></p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-600">
                <Phone className="text-[var(--color-accent-gold)] shrink-0" size={20} />
                <a href="tel:+13055550198" className="font-sans text-lg hover:text-[var(--color-accent-gold)] transition-colors">+1 (305) 555-0198</a>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <Mail className="text-[var(--color-accent-gold)] shrink-0" size={20} />
                <a href="mailto:hello@prgpropertygroup.com" className="font-sans text-lg hover:text-[var(--color-accent-gold)] transition-colors">hello@prgpropertygroup.com</a>
              </div>
              <div className="flex items-center gap-4 text-gray-600 mt-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent-gold)] shrink-0">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <a href="https://wa.me/13055550198" target="_blank" rel="noopener noreferrer" className="font-sans text-lg hover:text-[var(--color-accent-gold)] transition-colors">WhatsApp for LATAM/EU</a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
               <div className="aspect-video w-full bg-gray-200 relative overflow-hidden flex items-center justify-center">
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-400">Map Integration Here</span>
                  {/* Real map integration goes here */}
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-4"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="firstName" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">First Name</label>
                  <input type="text" id="firstName" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Last Name</label>
                  <input type="text" id="lastName" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="email" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors" />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Phone Number</label>
                  <input type="tel" id="phone" className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors" />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Primary Interest</label>
                <select id="interest" className="w-full border-b border-gray-300 py-3 bg-transparent font-sans text-gray-600 focus:outline-none focus:border-black transition-colors appearance-none rounded-none">
                  <option>Buying a Property</option>
                  <option>Selling a Property</option>
                  <option>Portfolio Advisory</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full border-b border-gray-300 py-3 bg-transparent focus:outline-none focus:border-black transition-colors resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-[#1A1A1A] text-white py-5 uppercase tracking-widest text-sm font-bold hover:bg-[var(--color-accent-gold)] transition-colors mt-8">
                Submit Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
