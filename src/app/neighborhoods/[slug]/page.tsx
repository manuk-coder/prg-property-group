"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Key } from "lucide-react";
import { getNeighborhoodBySlug } from "@/lib/firebaseUtils";

export default function NeighborhoodSkeletonPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dbData = await getNeighborhoodBySlug(params.slug);
      setData(dbData);
      setLoading(false);
    };
    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-primary-bg)] flex items-center justify-center pt-24">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[var(--color-accent-gold)] rounded-full animate-spin mb-4"></div>
          <p className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold">Loading Neighborhood...</p>
        </div>
      </div>
    );
  }

  // If no database record is found, show a standard 404-like graceful state
  if (!data) {
    return (
      <div className="min-h-screen bg-[var(--color-primary-bg)] flex flex-col items-center justify-center pt-24 px-6 text-center">
        <Home size={64} className="text-gray-300 mb-6" />
        <h1 className="font-serif text-4xl text-[var(--color-primary-text)] mb-4">Neighborhood Not Found</h1>
        <p className="font-sans text-gray-500 max-w-md mx-auto mb-8">
          The neighborhood profile for "{params.slug}" does not currently exist in our active database.
        </p>
        <Link href="/listings" className="bg-[#1A1A1A] text-white px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[var(--color-accent-gold)] transition-colors">
          Browse Portfolio
        </Link>
      </div>
    );
  }

  // Normal Skeleton for a newly created Neighborhood
  return (
    <div className="min-h-screen bg-[var(--color-primary-bg)]">
      {/* Skeleton Hero */}
      <div className="relative h-[60vh] w-full flex flex-col items-center justify-center bg-gray-900 overflow-hidden">
        {data.heroImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.heroImageUrl} alt={data.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
        ) : (
          <div className="absolute inset-0 opacity-10 flex flex-wrap gap-8 justify-center items-center content-center">
             {/* Pattern placeholder */}
             {[...Array(20)].map((_, i) => <Key key={i} size={120} className="text-white" />)}
          </div>
        )}
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Link href="/listings" className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest font-semibold text-white/70 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Search
          </Link>
          <h1 className="text-white font-serif text-5xl md:text-7xl mb-6 drop-shadow-lg">{data.name}</h1>
          <div className="bg-white/10 backdrop-blur-md inline-block px-6 py-2 border border-white/20">
            <p className="text-white/90 font-sans text-sm uppercase tracking-widest font-bold">
              Exclusive Access Preview
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl py-24 text-center">
        <h2 className="font-serif text-3xl text-[var(--color-primary-text)] mb-6">Discover {data.name}</h2>
        
        {data.description ? (
          <p className="text-xl text-gray-600 font-sans leading-relaxed mb-12 text-balance">
            {data.description}
          </p>
        ) : (
          <div className="mb-16">
            <div className="w-16 h-1 bg-[var(--color-accent-gold)] mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 font-sans leading-relaxed italic text-balance mb-4">
              "A highly anticipated neighborhood profile is currently being curated by the PRG Research Team."
            </p>
            <p className="text-sm text-gray-500 font-sans uppercase tracking-widest">
              Full editorial guide coming soon
            </p>
          </div>
        )}

        {data.marketStats && (
          <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-12">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Median Price</p>
              <p className="font-serif text-4xl text-[var(--color-primary-text)]">${data.marketStats.medianPrice?.toLocaleString() || "TBD"}</p>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Active Listings</p>
              <p className="font-serif text-4xl text-[var(--color-primary-text)]">{data.marketStats.activeListings || "TBD"}</p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
