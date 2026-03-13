import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF8F5] pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-6">
            <Link href="/" className="flex items-center gap-3 bg-[var(--color-primary-bg)] px-5 py-4 w-fit shadow-md">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1A1A1A]">
                <rect x="4" y="4" width="28" height="28" stroke="currentColor" strokeWidth="1.5" />
                <rect x="8" y="8" width="20" height="20" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 23V13H19C21.2091 13 23 14.7909 23 17C23 19.2091 21.2091 21 19 21H16V23H14ZM16 19H19C20.1046 19 21 18.1046 21 17C21 15.8954 20.1046 15 19 15H16V19Z" fill="currentColor" />
              </svg>
              <span className="font-serif text-xl font-bold tracking-tight text-[#1A1A1A]">
                PRG PROPERTY GROUP
              </span>
            </Link>
            <p className="text-sm text-gray-400 font-sans max-w-xs">
              South Florida Real Estate, Redefined. A high-end approach to the modern market.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[var(--color-accent-gold)] transition-colors">Portfolio</Link></li>
              <li><Link href="/listings" className="hover:text-[var(--color-accent-gold)] transition-colors">Exclusive Listings</Link></li>
              <li><Link href="/about" className="hover:text-[var(--color-accent-gold)] transition-colors">Our Approach</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-accent-gold)] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6 tracking-wide">Connect</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li>1200 Brickell Ave, Suite 1500</li>
              <li>Miami, FL 33131</li>
              <li><a href="mailto:hello@prgpropertygroup.com" className="hover:text-[var(--color-accent-gold)] transition-colors">hello@prgpropertygroup.com</a></li>
              <li><a href="tel:+13055550198" className="hover:text-[var(--color-accent-gold)] transition-colors">+1 (305) 555-0198</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-serif text-lg mb-6 tracking-wide">Follow</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-gray-700 rounded-full hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-700 rounded-full hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-700 rounded-full hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 border border-gray-700 rounded-full hover:border-[var(--color-accent-gold)] hover:text-[var(--color-accent-gold)] transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500 tracking-wider uppercase">
          <p>&copy; {new Date().getFullYear()} PRG Property Group. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
