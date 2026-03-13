import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Midtown Miami Real Estate | Condos & Apartments for Rent | PRG",
  description: "Explore Midtown Miami Real Estate. Your local guide to luxury apartments for rent, condos for sale, and lifestyle in Miami's vibrant art and dining district.",
};

export default function MidtownNeighborhood() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full flex items-center justify-center">
        <Image 
          src="https://images.unsplash.com/photo-1542289196-0309dd0a9c8f?q=80&w=2000&auto=format&fit=crop"
          alt="Midtown Miami urban landscape and high-rise condominiums"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-white font-serif text-5xl md:text-7xl mb-4">Living in <span className="italic">Midtown Miami</span></h1>
          <p className="text-white/90 font-sans text-xl uppercase tracking-widest">Restaurants, Art & Real Estate</p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl py-24">
        <h2 className="font-serif text-3xl md:text-4xl text-[var(--color-primary-text)] mb-8">The Pulse of Miami's Urban Core</h2>
        <div className="prose prose-lg text-gray-600 font-sans leading-relaxed max-w-none">
          <p>
            Midtown Miami is a pedestrian-friendly, highly walkable enclave situated perfectly between Wynwood and the Design District. Miami Midtown real estate predominantly features luxury high-rise condominiums and high-end pet-friendly apartment complexes, catering to young professionals, creatives, and urbanite investors.
          </p>
          <h3 className="text-2xl font-serif text-[var(--color-primary-text)] mt-12 mb-4">Investment Potential and Rentals</h3>
          <p>
            Midtown boasts some of the strongest rental yields in Miami. The neighborhood is anchored by The Shops at Midtown, providing ground-floor retail and culinary hotspots immediately accessible from the residential towers. 
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-6">
            <li><strong>Property Types:</strong> High-rise luxury condos and pet-friendly rentals.</li>
            <li><strong>Walkability:</strong> exceptional access to Wynwood Walls, Design District boutiques, and diverse gastronomy.</li>
            <li><strong>Short-Term Rentals:</strong> Excellent opportunities for Airbnb property management due to year-round cultural events (Art Basel, Miami Music Week).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
