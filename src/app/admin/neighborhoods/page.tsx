"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Loader2, Map } from "lucide-react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminNeighborhoodsList() {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNeighborhoods = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "neighborhoods"), orderBy("name"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNeighborhoods(data);
    } catch (err) {
      console.error("Failed to fetch neighborhoods", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the ${name} neighborhood? The dynamic route will stop working.`)) {
      try {
        await deleteDoc(doc(db, "neighborhoods", id));
        fetchNeighborhoods();
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete neighborhood.");
      }
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Neighborhoods</h1>
          <p className="text-sm text-gray-500 mt-1">Manage global navigation links and dynamic SEO landing pages.</p>
        </div>
        <Link
          href="/admin/neighborhoods/new"
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[var(--color-accent-gold)] transition-colors rounded-sm shadow-md"
        >
          <Plus size={18} />
          Create Area
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
            <p className="text-sm uppercase tracking-widest font-bold">Querying Database...</p>
          </div>
        ) : neighborhoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-gray-50 border-t border-gray-100">
            <Map size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-serif text-gray-900 mb-2">No Regions Defined</p>
            <p className="text-sm">Currently no neighborhoods to display in navigation.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Name / ID Slug</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Featured in Nav</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {neighborhoods.map((hood) => (
                <tr key={hood.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{hood.name}</div>
                    <div className="text-xs text-gray-500 mt-1 font-mono">{hood.id}</div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {hood.isFeatured ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">Yes</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">No</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/neighborhoods/${hood.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                        title="Edit Area"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(hood.id, hood.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete Area"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
