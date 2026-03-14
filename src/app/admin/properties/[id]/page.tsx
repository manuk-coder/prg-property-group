"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud, X, Loader2, GripVertical, Image as ImageIcon } from "lucide-react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

const PROPERTY_TYPES = ["Condo", "Single Family", "Townhouse", "Land", "Commercial"];
const PROPERTY_STATUSES = ["Active", "Coming Soon", "Pending", "Sold", "Off-Market"];

export default function PropertyEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const isNew = resolvedParams.id === "new";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState<any>({
    id: "",
    address: "", unit: "", city: "Miami", state: "FL", zip: "", neighborhood: "",
    price: "", type: "Condo", beds: "", baths: "", halfBaths: "", sqft: "", lotSize: "", yearBuilt: "",
    hoaFee: "", propertyTaxes: "", daysOnMarket: "", parkingSpaces: "",
    virtualTourUrl: "", description: "", features: "", status: "Active",
    agentName: "Manu K", agentEmail: "contact@prg.com", agentPhone: "+13055550198",
    images: [] // { url, storagePath, caption, isPrimary }
  });

  useEffect(() => {
    if (!isNew) {
      const fetchProperty = async () => {
        const docRef = doc(db, "properties", resolvedParams.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Convert features array to CSV for the text input
          if (Array.isArray(data.features)) {
            data.features = data.features.join(", ");
          }
          // Flatten agent
          if (data.agent) {
            data.agentName = data.agent.name || "";
            data.agentEmail = data.agent.email || "";
            data.agentPhone = data.agent.phone || "";
          }
          setFormData({ id: docSnap.id, ...data });
        }
        setLoading(false);
      };
      fetchProperty();
    } else {
      setLoading(false); // If it's new, we're done loading immediately
    }
  }, [resolvedParams.id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    
    // Require an ID (slug) to organize storage
    const propId = formData.id || formData.address.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!propId) {
      alert("Please enter a Property ID or Address first to organize images.");
      return;
    }
    
    // If it's a new ID, set it into state so it's consistent
    if (!formData.id) setFormData((prev: any) => ({ ...prev, id: propId }));

    setUploading(true);
    let uploadedCount = 0;
    const newImages = [...formData.images];

    files.forEach((file) => {
      const storagePath = `properties/${propId}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          alert(`Failed to upload ${file.name}`);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          newImages.push({
            url: downloadUrl,
            storagePath: storagePath,
            caption: "",
            isPrimary: newImages.length === 0 // First image is primary
          });
          uploadedCount++;
          if (uploadedCount === files.length) {
            setFormData((prev: any) => ({ ...prev, images: newImages }));
            setUploading(false);
            setUploadProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = "";
          }
        }
      );
    });
  };

  const handleDeleteImage = async (index: number) => {
    const imgInfo = formData.images[index];
    if (confirm("Remove this image? This will delete it from the cloud permanently.")) {
      try {
        if (imgInfo.storagePath) {
          const imgRef = ref(storage, imgInfo.storagePath);
          await deleteObject(imgRef);
        }
        const updatedImages = formData.images.filter((_: any, i: number) => i !== index);
        // Ensure one primary
        if (imgInfo.isPrimary && updatedImages.length > 0) {
          updatedImages[0].isPrimary = true;
        }
        setFormData((prev: any) => ({ ...prev, images: updatedImages }));
      } catch (err) {
        console.error("Failed to delete image", err);
        alert("Failed to delete image from storage.");
      }
    }
  };

  const setPrimaryImage = (index: number) => {
    const updatedImages = formData.images.map((img: any, i: number) => ({
      ...img,
      isPrimary: i === index
    }));
    // Sort primary to front
    const primary = updatedImages.splice(index, 1)[0];
    updatedImages.unshift(primary);
    setFormData((prev: any) => ({ ...prev, images: updatedImages }));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index].caption = caption;
    setFormData((prev: any) => ({ ...prev, images: updatedImages }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const docId = formData.id || formData.address.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const payload = { ...formData };
      
      // Clean up numbers
      const numFields = ['price', 'beds', 'baths', 'halfBaths', 'sqft', 'yearBuilt', 'hoaFee', 'propertyTaxes', 'daysOnMarket', 'parkingSpaces'];
      numFields.forEach(field => {
        if (payload[field]) payload[field] = Number(payload[field]);
        else delete payload[field];
      });

      // Split features by comma
      if (typeof payload.features === 'string') {
        payload.features = payload.features.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      }

      // Format agent
      payload.agent = {
        name: payload.agentName,
        email: payload.agentEmail,
        phone: payload.agentPhone
      };
      delete payload.agentName; delete payload.agentEmail; delete payload.agentPhone;

      payload.updatedAt = serverTimestamp();
      if (isNew) payload.createdAt = serverTimestamp();

      await setDoc(doc(db, "properties", docId), payload);
      router.push("/admin/properties");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save property. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Property...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/properties" className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          {isNew ? "Add New Property" : `Editing: ${formData.address}`}
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Internal ID (URL Slug)</label>
              <input required name="id" value={formData.id} onChange={handleChange} disabled={!isNew} placeholder="e.g. 450-alton-road" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none disabled:bg-gray-50 disabled:text-gray-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none bg-white">
                {PROPERTY_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Street Address</label>
              <input required name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Unit / Apt</label>
              <input name="unit" value={formData.unit} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
              <input required name="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">State / Zip</label>
              <div className="flex gap-2">
                <input required name="state" value={formData.state} onChange={handleChange} className="w-16 px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
                <input required name="zip" value={formData.zip} onChange={handleChange} className="flex-1 px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Neighborhood</label>
              <input required name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" placeholder="e.g. South Beach" />
            </div>
          </div>
        </div>

        {/* Pricing & Dimensions */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2">Pricing & Fundamentals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (USD)</label>
              <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Property Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none bg-white">
                {PROPERTY_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Beds</label>
              <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Baths</label>
              <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
             <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Half Baths</label>
              <input type="number" name="halfBaths" value={formData.halfBaths} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Living SqFt</label>
              <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
          </div>
        </div>

        {/* Premium Data Insights */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2">Premium Financial & Physical Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Monthly HOA ($)</label>
              <input type="number" name="hoaFee" value={formData.hoaFee} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Annual Taxes ($)</label>
              <input type="number" name="propertyTaxes" value={formData.propertyTaxes} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Lot Size</label>
              <input type="text" name="lotSize" value={formData.lotSize} onChange={handleChange} placeholder="e.g. 0.25 Acres" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Year Built</label>
              <input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
             <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Parking Spaces</label>
              <input type="number" name="parkingSpaces" value={formData.parkingSpaces} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Days on Market</label>
              <input type="number" name="daysOnMarket" value={formData.daysOnMarket} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
            </div>
          </div>
        </div>

        {/* Media & Marketing */}
        <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm space-y-6">
          <h2 className="text-lg font-serif font-bold border-b border-gray-100 pb-2">Media & Marketing Copy</h2>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 mt-4 text-black">Property Image Gallery (Cloud Storage)</label>
            <div className={`mt-2 p-8 border-2 border-dashed ${uploading ? 'border-[var(--color-accent-gold)] bg-yellow-50' : 'border-gray-300 hover:border-black'} flex flex-col items-center justify-center rounded-sm transition-colors text-center`}>
              {uploading ? (
                 <div className="flex flex-col items-center justify-center">
                   <Loader2 className="w-10 h-10 animate-spin text-[var(--color-accent-gold)] mb-4" />
                   <p className="text-sm font-bold uppercase tracking-widest text-[var(--color-accent-gold)]">Uploading to Secure Vault... {Math.round(uploadProgress)}%</p>
                 </div>
              ) : (
                <>
                  <UploadCloud size={32} className="text-gray-400 mb-3" />
                  <p className="text-gray-600 mb-4 font-sans text-sm">Drag and drop high-res images, or click to browse.</p>
                  <label className="bg-black text-white px-6 py-2 text-xs uppercase tracking-widest font-bold cursor-pointer hover:bg-gray-800 transition-colors">
                    Select Photos
                    <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  </label>
                </>
              )}
            </div>
            
            {/* Image Grid */}
            {formData.images && formData.images.length > 0 && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.images.map((img: any, idx: number) => (
                  <div key={idx} className={`relative bg-gray-50 border ${img.isPrimary ? 'border-[var(--color-accent-gold)] shadow-md' : 'border-gray-200'} rounded-sm overflow-hidden flex flex-col`}>
                    <div className="relative h-48 w-full bg-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                      
                      <div className="absolute top-2 right-2 flex gap-2">
                        {!img.isPrimary && (
                           <button type="button" onClick={() => setPrimaryImage(idx)} className="bg-black/70 hover:bg-black text-white p-1.5 rounded-sm backdrop-blur-sm transition-colors" title="Set as Primary Header Image">
                             <ImageIcon size={16} />
                           </button>
                        )}
                        <button type="button" onClick={() => handleDeleteImage(idx)} className="bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-sm backdrop-blur-sm transition-colors" title="Permanently Delete">
                           <X size={16} />
                        </button>
                      </div>
                      
                      {img.isPrimary && (
                        <div className="absolute top-2 left-2 bg-[var(--color-accent-gold)] text-white text-[10px] uppercase font-bold px-2 py-1 tracking-widest">
                          Hero Image
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <input 
                        type="text" 
                        placeholder="Image Caption (e.g. Master En-Suite)" 
                        value={img.caption || ""}
                        onChange={(e) => handleCaptionChange(idx, e.target.value)}
                        className="w-full text-sm px-2 py-1.5 border border-transparent hover:border-gray-300 focus:border-black outline-none bg-transparent transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Virtual Tour (Matterport URL)</label>
            <input type="url" name="virtualTourUrl" value={formData.virtualTourUrl} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Listing Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={6} className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none resize-y" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Distinguishing Features (Comma Separated)</label>
            <input name="features" value={formData.features} onChange={handleChange} placeholder="Smart Home, Ocean Views, Wine Cellar" className="w-full px-3 py-2 border border-gray-300 focus:ring-1 focus:ring-black outline-none" />
          </div>
        </div>

        {/* Global Save */}
        <div className="fixed bottom-0 left-64 right-0 p-4 bg-white border-t border-gray-200 flex justify-end gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
          <Link href="/admin/properties" className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-colors rounded-sm">
            Cancel
          </Link>
          <button type="submit" disabled={saving || uploading} className="bg-[var(--color-accent-gold)] hover:bg-[#a68641] disabled:opacity-50 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors rounded-sm shadow-md">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {saving ? "Saving to Vault..." : "Publish to Site"}
          </button>
        </div>

      </form>
    </div>
  );
}
