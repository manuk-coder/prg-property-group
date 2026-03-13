"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bed, Bath, Square, MapPin, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data to match what was generated previously. In a real app, this is fetched via slug.
const MOCK_PROPERTY = {
  address: "450 Alton Road",
  city: "Miami Beach",
  neighborhood: "South Beach",
  price: "$8,900,000",
  type: "Condo",
  beds: 4,
  baths: 5,
  sqft: "4,800",
  yearBuilt: "2018",
  hoaFee: "$2,450/mo",
  propertyTaxes: "$68,500/yr",
  lotSize: "N/A (Penthouse)",
  daysOnMarket: 14,
  description: "Experience unparalleled luxury in this exquisitely designed penthouse at the prestigious Icon. Boasting panoramic views of the Atlantic Ocean and Miami skyline, this masterpiece features soaring 12-foot ceilings, custom Italian cabinetry, and a wraparound terrace perfect for entertaining.",
  images: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop"
  ],
  features: ["Wraparound Balcony", "Smart Home Automation", "Private Elevator", "Wine Cellar", "Gourmet Chef's Kitchen", "Ocean Views", "24/7 Concierge", "Infinity Pool Access"]
};

export default function SingleListingPage({ params }: { params: { slug: string } }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Normally: const property = await getPropertyBySlug(params.slug);
  const property = MOCK_PROPERTY;

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + property.images.length) % property.images.length);
    }
  };

  return (
    <div className="bg-[var(--color-primary-bg)] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.address,
          "description": property.description,
          "image": property.images,
          "offers": {
            "@type": "Offer",
            "price": property.price.replace(/[^0-9]/g, ''),
            "priceCurrency": "USD"
          }
        })}}
      />
      
      {/* Hero Gallery */}
      <section className="relative h-[70vh] w-full pt-20 cursor-pointer group" onClick={() => setLightboxIndex(0)}>
        <div className="absolute inset-0 z-0">
          <Image 
            src={property.images[0]} 
            alt={property.address}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-sm">
            <span className="bg-white/90 text-black px-6 py-3 uppercase tracking-widest text-sm font-bold shadow-2xl">
              View All Photos
            </span>
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white max-w-7xl">
          <Link href="/listings" className="flex items-center gap-2 text-sm font-sans uppercase tracking-widest font-semibold hover:text-[var(--color-accent-gold)] transition-colors mb-8 w-fit">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1 text-xs uppercase tracking-widest font-bold mb-4 inline-block">
                  {property.type}
                </span>
                <h1 className="font-serif text-5xl md:text-7xl mb-2">{property.address}</h1>
                <p className="font-sans text-xl opacity-90">{property.neighborhood}, {property.city}</p>
              </div>
              <div className="text-left md:text-right">
                <span className="block font-sans text-4xl md:text-5xl font-bold mb-2">{property.price}</span>
                <span className="font-sans uppercase tracking-widest text-sm opacity-80">Listed Price</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              {/* Quick Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-300 mb-12">
                <div className="flex flex-col items-center justify-center p-4">
                  <Bed size={24} className="text-[var(--color-accent-gold)] mb-3" />
                  <span className="font-serif text-2xl font-bold text-[var(--color-primary-text)]">{property.beds}</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 md:border-l border-gray-300">
                  <Bath size={24} className="text-[var(--color-accent-gold)] mb-3" />
                  <span className="font-serif text-2xl font-bold text-[var(--color-primary-text)]">{property.baths}</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-300">
                  <Square size={24} className="text-[var(--color-accent-gold)] mb-3" />
                  <span className="font-serif text-2xl font-bold text-[var(--color-primary-text)]">{property.sqft}</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500">Square Feet</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border-t md:border-t-0 md:border-l border-gray-300">
                  <Calendar size={24} className="text-[var(--color-accent-gold)] mb-3" />
                  <span className="font-serif text-2xl font-bold text-[var(--color-primary-text)]">{property.yearBuilt}</span>
                  <span className="font-sans text-xs uppercase tracking-widest text-gray-500">Year Built</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-16">
                <h3 className="font-serif text-3xl text-[var(--color-primary-text)] mb-6">About This Property</h3>
                <p className="font-sans text-gray-600 text-lg leading-relaxed text-balance">
                  {property.description}
                </p>
              </div>

              {/* Distinguishing Features */}
              <div className="mb-16">
                <h3 className="font-serif text-3xl text-[var(--color-primary-text)] mb-8">Distinguishing Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-gold)]" />
                      <span className="font-sans text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Details Grid */}
              <div className="mb-16 bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="font-serif text-3xl text-[var(--color-primary-text)] mb-8">Financials & Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">HOA Dues</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">{property.hoaFee}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">Property Taxes</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">{property.propertyTaxes}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">Lot Size</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">{property.lotSize}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">Price / SqFt</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">${Math.round(parseInt(property.price.replace(/[^0-9]/g, '')) / parseInt(property.sqft.replace(/[^0-9]/g, ''))).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">Days on Market</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">{property.daysOnMarket}</p>
                  </div>
                  <div>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1">Property Type</p>
                    <p className="font-sans text-lg font-semibold text-gray-900">{property.type}</p>
                  </div>
                </div>
              </div>

              {/* Secondary Images Gallery */}
              <div className="mb-16">
                <h3 className="font-serif text-3xl text-[var(--color-primary-text)] mb-8">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.images.slice(1).map((img, i) => (
                    <div 
                      key={i} 
                      className="relative aspect-square overflow-hidden cursor-pointer group"
                      onClick={() => setLightboxIndex(i + 1)}
                    >
                      <Image 
                        src={img} 
                        alt={`Property interior ${i + 1}`} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Sticky Inquiry Form */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 bg-white p-8 shadow-xl">
                <h3 className="font-serif text-2xl text-[var(--color-primary-text)] mb-2">Request Information</h3>
                <p className="font-sans text-sm text-gray-500 mb-8">Schedule a private showing or request details.</p>
                
                <form className="space-y-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Your Name</label>
                    <input type="text" className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Email Address</label>
                    <input type="email" className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-gray-700 font-bold mb-2">Phone Number</label>
                    <input type="tel" className="w-full border-b border-gray-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors" />
                  </div>
                  <button type="button" className="w-full bg-[#1A1A1A] text-white py-4 uppercase tracking-widest text-sm font-bold hover:bg-[var(--color-accent-gold)] transition-colors">
                    Inquire Now
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                   <p className="font-sans text-sm text-gray-500 mb-2">Prefer to talk?</p>
                   <a href="tel:+13055550198" className="font-serif text-xl text-[var(--color-primary-text)] hover:text-[var(--color-accent-gold)] transition-colors">+1 (305) 555-0198</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            >
              <X size={36} />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 text-white/50 hover:text-white transition-colors z-[110] p-4"
            >
              <ChevronLeft size={48} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 text-white/50 hover:text-white transition-colors z-[110] p-4"
            >
              <ChevronRight size={48} />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-16" onClick={(e) => e.stopPropagation()}>
              <Image
                src={property.images[lightboxIndex]}
                alt={`Property Photo ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-sans tracking-widest text-sm">
              {lightboxIndex + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
