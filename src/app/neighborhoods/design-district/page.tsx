import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Design District Miami Real Estate | Luxury Condos for Sale | PRG",
  description: "Browse the exclusive real estate market of the Miami Design District. High-end luxury condos, new construction, and elite property investments.",
};

export default function DesignDistrictNeighborhood() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1574017586071-7785be87f1ea?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury boutique storefronts in the Miami Design District"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-serif text-5xl md:text-7xl mb-4">Miami <span className="italic">Design District</span></h1>
          <p className="text-white/90 font-sans text-xl uppercase tracking-widest">Luxury Living & Fashion Epicenter</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-8">Architectural Brilliance Meets Haute Couture</h2>
        <div className="prose prose-lg text-gray-600 font-sans leading-relaxed max-w-none">
          <p>
            The Miami Design District is synonymous with global luxury. Home to flagship stores from Dior, Louis Vuitton, and Hermes, this neighborhood has transformed into a high-fashion, high-art sanctuary. Design District real estate consists of visually striking new construction condos, exclusive penthouses, and bespoke loft spaces.
          </p>
          <h3 className="text-2xl font-serif text-[var(--color-primary-text)] mt-12 mb-4">Why Buy in the Design District?</h3>
          <p>
            Purchasing a home in the Miami Design District positions you at the nexus of international culture. Buyers here seek more than just square footage—they seek architectural pedigree, curated amenities, and the undeniable prestige of living within a cultural epicenter.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-6">
            <li><strong>Market Exclusivity:</strong> Very limited residential inventory makes properties highly coveted.</li>
            <li><strong>Culinary Excellence:</strong> Walking distance to Michelin-starred restaurants and elite dining establishments.</li>
            <li><strong>International Appeal:</strong> A massive draw for European and Latin American luxury investors seeking blue-chip assets.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
