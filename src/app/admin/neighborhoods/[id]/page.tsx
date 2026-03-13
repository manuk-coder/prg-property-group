"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function NeighborhoodEditor({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    heroImageUrl: "",
    isFeatured: true,
    medianPrice: "",
    activeListings: ""
  });

  useEffect(() => {
    if (!isNew) {
      const fetchNeighborhood = async () => {
        const docRef = doc(db, "neighborhoods", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            id: docSnap.id,
            name: data.name || "",
            description: data.description || "",
            heroImageUrl: data.heroImageUrl || "",
            isFeatured: data.isFeatured ?? false,
            medianPrice: data.marketStats?.medianPrice || "",
            activeListings: data.marketStats?.activeListings || "",
          });
        }
        setLoading(false);
      };
      fetchNeighborhood();
    }
  }, [params.id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docId = formData.id || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const payload = {
        name: formData.name,
        description: formData.description,
        heroImageUrl: formData.heroImageUrl,
        isFeatured: formData.isFeatured,
        marketStats: {
          medianPrice: formData.medianPrice ? Number(formData.medianPrice) : null,
          activeListings: formData.activeListings ? Number(formData.activeListings) : null,
        }
      };

      await setDoc(doc(db, "neighborhoods", docId), payload);
      router.push("/admin/neighborhoods");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save neighborhood.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Neighborhood...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/neighborhoods" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {isNew ? "Create Neighborhood Profile" : `Editing: ${formData.name}`}
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Structure */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2">Global Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Design District" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">URL Slug (ID)</label>
              <input required name="id" value={formData.id} onChange={handleChange} disabled={!isNew} placeholder="e.g. design-district" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none disabled:bg-gray-50 disabled:text-gray-400 font-mono" />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200">
            <input 
              type="checkbox" 
              name="isFeatured" 
              id="isFeatured"
              checked={formData.isFeatured} 
              onChange={handleChange} 
              className="w-5 h-5 accent-black cursor-pointer" 
            />
            <label htmlFor="isFeatured" className="cursor-pointer text-sm font-bold text-gray-900 uppercase tracking-wide">
              Feature in Site Navigation Dropdown
            </label>
          </div>
        </div>

        {/* Dynamic Skeleton Content */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2 mb-2">Skeleton Page Content</h2>
            <p className="text-xs text-gray-500 mb-6">This data will automatically populate a dynamic `{`/neighborhoods/${formData.id || '[slug]'}`}` page until you hardcode a custom layout for it.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hero Image URL</label>
            <input name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none font-mono text-sm" />
            {formData.heroImageUrl && (
              <div className="mt-4 w-full h-32 relative bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.heroImageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Editorial Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="A short promotional overview of the area..." className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none resize-y" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Median Sale Price ($)</label>
              <input type="number" name="medianPrice" value={formData.medianPrice} onChange={handleChange} placeholder="e.g. 1500000" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Active PRG Listings</label>
              <input type="number" name="activeListings" value={formData.activeListings} onChange={handleChange} placeholder="e.g. 12" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
          </div>
        </div>

        {/* Global Save */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-gray-200 flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <Link href="/admin/neighborhoods" className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors rounded-sm">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="bg-[var(--color-accent-gold)] hover:bg-[#a68641] disabled:opacity-50 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded-sm shadow-md">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>

      </form>
    </div>
  );
}
