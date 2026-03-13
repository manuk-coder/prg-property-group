"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Loader2, Home } from "lucide-react";
import { getAllProperties } from "@/lib/firebaseUtils";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminPropertiesList() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    const data = await getAllProperties();
    setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, "properties", id));
        fetchProperties(); // Refresh list
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete property.");
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Properties</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your active, pending, and sold listings.</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="bg-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[var(--color-accent-gold)] transition-colors rounded-sm shadow-md"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
            <p className="text-sm uppercase tracking-widest font-bold">Loading Database...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 bg-gray-50 border-t border-gray-100">
            <Home size={48} className="mb-4 text-gray-300" />
            <p className="text-lg font-serif text-gray-900 mb-2">No Properties Found</p>
            <p className="text-sm">Your database is currently empty.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Neighborhood</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">{prop.address} {prop.unit && `#${prop.unit}`}</div>
                    <div className="text-xs text-gray-500 mt-1">{prop.type} • {prop.beds}BD / {prop.baths}BA</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{prop.neighborhood || "N/A"}</td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {typeof prop.price === 'number' ? `$${prop.price.toLocaleString()}` : prop.price}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      prop.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                      prop.status === "Pending" ? "bg-orange-50 text-orange-700 border-orange-200" :
                      prop.status === "Sold" ? "bg-gray-100 text-gray-800 border-gray-300" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    }`}>
                      {prop.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/properties/${prop.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-colors"
                        title="Edit Property"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(prop.id, prop.address)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                        title="Delete Property"
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
