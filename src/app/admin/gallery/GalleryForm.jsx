"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUpload, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { uploadFile, deleteFile } from "@/utils/supabase/storage";

export default function GalleryForm({ initialData = null }) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title_id: initialData?.title_id || "",
    title_en: initialData?.title_en || "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image_url || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 5MB");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // If it's a new entry, image is required
    if (!isEdit && !imageFile) {
      setError("Foto wajib diunggah untuk entri galeri baru.");
      setLoading(false);
      return;
    }

    try {
      let finalImageUrl = initialData?.image_url || null;

      if (imageFile) {
        const uploadedUrl = await uploadFile(imageFile, 'gallery');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
          
          if (isEdit && initialData?.image_url) {
            await deleteFile(initialData.image_url);
          }
        }
      } else if (!imagePreview && isEdit && initialData?.image_url) {
        await deleteFile(initialData.image_url);
        finalImageUrl = null;
      }

      const payload = {
        title_id: formData.title_id,
        title_en: formData.title_en,
        image_url: finalImageUrl,
      };

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('gallery')
          .update(payload)
          .eq('id', initialData.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('gallery')
          .insert([payload]);
          
        if (insertError) throw insertError;
      }

      router.refresh();
      router.push("/admin/gallery");

    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/gallery"
          className="p-2 bg-navy/5 rounded-xl text-navy/70 hover:text-navy hover:bg-navy/10 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">
            {isEdit ? "Edit Foto" : "Tambah Foto Baru"}
          </h1>
          <p className="text-navy/70 text-sm mt-1">
            {isEdit ? "Perbarui keterangan foto galeri." : "Unggah foto baru ke galeri portofolio Anda."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-navy/5 p-6 md:p-8 flex flex-col gap-8">
        
        {/* Basic Info Section */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">Informasi Foto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Keterangan Singkat (ID)</label>
              <input
                type="text"
                name="title_id"
                required
                value={formData.title_id}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="Contoh: Dokumentasi GINECO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Short Caption (EN)</label>
              <input
                type="text"
                name="title_en"
                required
                value={formData.title_en}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="e.g: GINECO Documentation"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">File Foto</h2>
          <div className="flex flex-col gap-2">
            <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Unggah Gambar</label>
            <div className="relative border-2 border-dashed border-navy/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-navy/[0.02] transition-colors min-h-[200px] md:w-1/2">
              {imagePreview ? (
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden group border border-navy/10">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {/* Hover overlay for aesthetics */}
                  </div>
                  {/* Always visible remove button at top right */}
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition-colors shadow-lg z-10 flex items-center gap-2 font-bold text-sm"
                    title="Hapus Foto"
                  >
                    <FiX className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className="w-8 h-8 text-navy/30 mb-2" />
                  <p className="text-sm text-navy/60 text-center font-medium">
                    Klik atau seret foto ke sini
                  </p>
                  <p className="text-xs text-navy/40 text-center">
                    PNG, JPG, WEBP hingga 5MB
                  </p>
                </>
              )}
              
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={!!imagePreview}
                required={!isEdit} // Required for new entries
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-navy/5">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-navy text-beige px-8 py-3.5 rounded-xl font-bold hover:bg-navy-light transition-all shadow-lg hover:shadow-navy/20 disabled:opacity-50 disabled:hover:bg-navy disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-beige" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                {isEdit ? "Simpan Perubahan" : "Simpan Foto"}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
