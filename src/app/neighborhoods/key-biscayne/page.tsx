import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Key Biscayne Real Estate & Luxury Homes for Sale | PRG",
  description: "Discover luxury waterfront homes and exclusive condos in Key Biscayne. Your complete local guide to real estate in Miami's island paradise.",
};

export default function KeyBiscayneNeighborhood() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1533694032824-34c1b9b66236?q=80&w=2000&auto=format&fit=crop"
          alt="Aerial view of Key Biscayne, FL luxury waterfront property"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-serif text-5xl md:text-7xl mb-4">Living in <span className="italic">Key Biscayne</span></h1>
          <p className="text-white/90 font-sans text-xl uppercase tracking-widest">The Complete Local's Guide [2026]</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-8">Island Exclusivity Meets Miami Proximity</h2>
        <div className="prose prose-lg text-gray-600 font-sans leading-relaxed max-w-none">
          <p>
            Connected to mainland Miami via the scenic Rickenbacker Causeway, Key Biscayne represents the ultimate in secluded, waterfront luxury. Real estate in Key Biscayne ranges from sprawling single-family estates with private docks to ultra-luxurious oceanfront condominiums like Oceana and the Grand Bay Club.
          </p>
          <h3 className="text-2xl font-serif text-[var(--color-primary-text)] mt-12 mb-4">Why Invest in Key Biscayne?</h3>
          <p>
            Beyond its pristine beaches and lush parks, Key Biscayne boasts one of the most highly rated public schools in Florida, MAST Academy. For families, international investors, and executives seeking absolute privacy without sacrificing access to Brickell's financial district, Key Biscayne is unparalleled.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-6">
            <li><strong>Market Dynamics:</strong> Extremely low inventory drives sustained appreciation.</li>
            <li><strong>Lifestyle:</strong> Golf at the Crandon Park course or tennis at the Ritz-Carlton.</li>
            <li><strong>Security:</strong> An island enclave with its own dedicated police force and highly secure gated communities.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
