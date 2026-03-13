"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getFeaturedNeighborhoods } from "@/lib/firebaseUtils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dynamicNeighborhoods, setDynamicNeighborhoods] = useState<{name: string, href: string}[]>([]);
  const pathname = usePathname();

  // Pages that start with a dark background hero (Homepage, Single Listing)
  const isDarkHeroPage = pathname === "/" || pathname?.startsWith("/listings/");


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const fetchNeighborhoods = async () => {
      const hoods = await getFeaturedNeighborhoods();
      if (hoods && hoods.length > 0) {
         setDynamicNeighborhoods(hoods.map((h: any) => ({ name: h.name, href: `/neighborhoods/${h.id}` })));
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchNeighborhoods();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Listings", href: "/listings" },
    { 
      name: "Neighborhoods", 
      href: "#",
      dropdown: dynamicNeighborhoods.length > 0 ? dynamicNeighborhoods : [
        // Placeholder to prevent empty menu flash
        { name: "Loading...", href: "#" }
      ]
    },
    { name: "Management", href: "/property-management" },
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
          <Link href="/" className={`relative z-50 flex items-center gap-3 transition-colors duration-300 ${!isDarkHeroPage || isScrolled ? "text-[#1A1A1A]" : "text-white"}`}>
             <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="4" y="4" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
               <rect x="8" y="8" width="20" height="20" stroke="currentColor" strokeWidth="1.5" />
               <path d="M14 23V13H19C21.2091 13 23 14.7909 23 17C23 19.2091 21.2091 21 19 21H16V23H14ZM16 19H19C20.1046 19 21 18.1046 21 17C21 15.8954 20.1046 15 19 15H16V19Z" fill="currentColor" />
             </svg>
             <span className="font-serif text-lg md:text-xl font-bold tracking-tight">
               PRG PROPERTY GROUP
             </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => link.dropdown && setIsDropdownOpen(true)}
                onMouseLeave={() => link.dropdown && setIsDropdownOpen(false)}
              >
                {link.href === "#" ? (
                  <button
                    className={`text-sm uppercase tracking-widest font-semibold transition-colors flex items-center gap-1 ${
                      !isDarkHeroPage || isScrolled ? "text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)]" : "text-white hover:text-gray-300"
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-sm uppercase tracking-widest font-semibold transition-colors ${
                      !isDarkHeroPage || isScrolled ? "text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)]" : "text-white hover:text-gray-300"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-56 bg-white shadow-xl py-4 flex flex-col gap-2 rounded-sm border border-gray-100"
                      >
                        {link.dropdown.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-6 py-2 text-xs uppercase tracking-widest font-semibold text-gray-600 hover:text-[var(--color-accent-gold)] hover:bg-gray-50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden relative z-50 p-2 transition-colors ${
              isMobileMenuOpen || !isDarkHeroPage || isScrolled ? "text-[var(--color-primary-text)]" : "text-white"
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
                  {link.href === "#" ? (
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-2xl font-serif font-bold text-gray-400 uppercase tracking-wider">{link.name}</span>
                      {link.dropdown?.map(subItem => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-xl font-serif font-bold text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)] transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-4xl font-serif font-bold text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
