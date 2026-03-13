"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURED_PROPERTIES = [
  {
    id: 1,
    address: "1200 Brickell Bay Dr",
    neighborhood: "Brickell",
    price: "$4,250,000",
    specs: "3 Bed | 3.5 Bath | 3,100 SF",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    slug: "1200-brickell-bay-dr"
  },
  {
    id: 2,
    address: "450 Alton Road",
    neighborhood: "South Beach",
    price: "$8,900,000",
    specs: "4 Bed | 5 Bath | 4,800 SF",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    slug: "450-alton-road"
  },
  {
    id: 3,
    address: "9800 SW 67th Ave",
    neighborhood: "Pinecrest",
    price: "$5,750,000",
    specs: "6 Bed | 7 Bath | 8,200 SF",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    slug: "9800-sw-67th-ave"
  }
];

export function FeaturedListings() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--color-accent-gold)] uppercase tracking-widest text-xs font-bold block mb-4">Portfolio</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-primary-text)]">Exclusive Offerings</h2>
          </motion.div>
          
          <Link href="/listings" className="hidden md:flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest hover:text-[var(--color-accent-gold)] transition-colors group">
            View All Properties
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Listings Grid / Horizontal Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROPERTIES.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <Link href={`/listings/${property.slug}`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image 
                    src={property.image} 
                    alt={property.address}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Overlay CTA */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="bg-white/90 text-black px-6 py-3 uppercase text-xs tracking-widest font-semibold backdrop-blur-sm">
                      View Details
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-[var(--color-primary-text)]">{property.address}</h3>
                    <span className="font-sans text-lg font-semibold">{property.price}</span>
                  </div>
                  <p className="font-sans text-sm text-gray-500 uppercase tracking-wide mb-1">{property.neighborhood}</p>
                  <p className="font-sans text-sm text-gray-500">{property.specs}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
            <Link href="/listings" className="inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
              View All Properties
            </Link>
        </div>
      </div>
    </section>
  );
}
