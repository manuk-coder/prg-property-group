"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Listings", href: "/listings" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-[var(--color-primary-bg)] shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="relative z-50 flex items-center gap-3 bg-[var(--color-primary-bg)] px-5 py-3 shadow-md">
             <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1A1A1A]">
               <rect x="4" y="4" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
               <rect x="8" y="8" width="20" height="20" stroke="currentColor" strokeWidth="1.5" />
               <path d="M14 23V13H19C21.2091 13 23 14.7909 23 17C23 19.2091 21.2091 21 19 21H16V23H14ZM16 19H19C20.1046 19 21 18.1046 21 17C21 15.8954 20.1046 15 19 15H16V19Z" fill="currentColor" />
             </svg>
             <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#1A1A1A]">
               PRG PROPERTY GROUP
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm uppercase tracking-widest font-semibold transition-colors hover:text-[var(--color-accent-gold)] ${
                  isScrolled ? "text-[var(--color-primary-text)]" : "text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden relative z-50 p-2 transition-colors ${
              isMobileMenuOpen || isScrolled ? "text-[var(--color-primary-text)]" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-primary-bg)] flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-serif font-bold text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
