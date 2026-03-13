"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";

const ALL_LISTINGS = [
  { id: 1, address: "1200 Brickell Bay Dr", city: "Miami", neighborhood: "Brickell", price: "$4,250,000", type: "Condo", beds: 3, baths: 3.5, sqft: "3,100", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop", slug: "1200-brickell-bay-dr" },
  { id: 2, address: "450 Alton Road", city: "Miami Beach", neighborhood: "South Beach", price: "$8,900,000", type: "Condo", beds: 4, baths: 5, sqft: "4,800", image: "https://images.unsplash.com/photo-1600566753086-00f18efc2294?q=80&w=1600&auto=format&fit=crop", slug: "450-alton-road" },
  { id: 3, address: "9800 SW 67th Ave", city: "Pinecrest", neighborhood: "Pinecrest", price: "$5,750,000", type: "Single Family", beds: 6, baths: 7, sqft: "8,200", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop", slug: "9800-sw-67th-ave" },
  { id: 4, address: "1350 S Dixie Hwy", city: "Coral Gables", neighborhood: "Coral Gables", price: "$3,100,000", type: "Townhouse", beds: 4, baths: 4, sqft: "3,500", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1600&auto=format&fit=crop", slug: "1350-s-dixie-hwy" },
  { id: 5, address: "2500 S Bayshore Dr", city: "Miami", neighborhood: "Coconut Grove", price: "$6,250,000", type: "Single Family", beds: 5, baths: 5.5, sqft: "6,100", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop", slug: "2500-s-bayshore-dr" },
  { id: 6, address: "8955 Collins Ave", city: "Surfside", neighborhood: "Surfside", price: "$12,500,000", type: "Condo", beds: 4, baths: 5.5, sqft: "5,400", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop", slug: "8955-collins-ave" },
];

export default function ListingsPage() {
  const [filterType, setFilterType] = useState("All");

  const filteredListings = filterType === "All" 
    ? ALL_LISTINGS 
    : ALL_LISTINGS.filter(l => l.type === filterType);

  return (
    <div className="pt-32 pb-24 bg-[var(--color-primary-bg)] min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 border-b border-gray-300 pb-12">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-serif text-5xl md:text-7xl text-[var(--color-primary-text)] mb-6"
           >
             Exclusive <br/><span className="italic text-[var(--color-accent-gold)]">Collection</span>
           </motion.h1>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="font-sans text-lg text-gray-500 max-w-2xl"
           >
             Explore our curated portfolio of premier properties across South Florida's most coveted neighborhoods.
           </motion.p>
        </div>

        {/* Filters Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            {["All", "Single Family", "Condo", "Townhouse"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`whitespace-nowrap px-6 py-2 uppercase tracking-widest text-xs font-semibold rounded-full border transition-all ${
                  filterType === type 
                    ? "bg-[var(--color-primary-text)] text-[var(--color-primary-bg)] border-[var(--color-primary-text)]" 
                    : "border-gray-300 text-gray-500 hover:border-gray-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <button className="flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          {filteredListings.map((property, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={property.id}
              className="group cursor-pointer"
            >
              <Link href={`/listings/${property.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <Image 
                    src={property.image} 
                    alt={property.address}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest font-bold">
                    {property.type}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl text-[var(--color-primary-text)] group-hover:text-[var(--color-accent-gold)] transition-colors">{property.address}</h3>
                  </div>
                  <span className="block font-sans text-xl font-semibold mb-2">{property.price}</span>
                  <p className="font-sans text-sm text-gray-500 uppercase tracking-wide mb-1">{property.neighborhood}, {property.city}</p>
                  <div className="font-sans text-sm text-gray-500 flex items-center gap-3">
                    <span>{property.beds} BD</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{property.baths} BA</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{property.sqft} SF</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
