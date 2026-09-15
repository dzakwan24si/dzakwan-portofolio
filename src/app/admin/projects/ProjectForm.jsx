"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiUpload, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { uploadImage, deleteImage } from "@/utils/supabase/storage";

export default function ProjectForm({ initialData = null }) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const isEdit = !!initialData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title_id: initialData?.title_id || "",
    title_en: initialData?.title_en || "",
    description_id: initialData?.description_id || "",
    description_en: initialData?.description_en || "",
    category_id: initialData?.category_id || "",
    category_en: initialData?.category_en || "",
    link_url: initialData?.link_url || "",
    tech_stack: initialData?.tech_stack ? initialData.tech_stack.join(", ") : "",
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

    try {
      let finalImageUrl = initialData?.image_url || null;

      // 1. Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile, 'projects');
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
          
          // Delete old image if it exists and we are editing
          if (isEdit && initialData?.image_url) {
            await deleteImage(initialData.image_url);
          }
        }
      } else if (!imagePreview && isEdit && initialData?.image_url) {
        // User removed the image without uploading a new one
        await deleteImage(initialData.image_url);
        finalImageUrl = null;
      }

      // 2. Prepare payload
      const techStackArray = formData.tech_stack
        .split(",")
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const payload = {
        title_id: formData.title_id,
        title_en: formData.title_en,
        description_id: formData.description_id,
        description_en: formData.description_en,
        category_id: formData.category_id,
        category_en: formData.category_en,
        link_url: formData.link_url,
        tech_stack: techStackArray,
        image_url: finalImageUrl,
      };

      // 3. Insert or Update to database
      if (isEdit) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', initialData.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([payload]);
          
        if (insertError) throw insertError;
      }

      // 4. Redirect on success
      router.refresh();
      router.push("/admin/projects");

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
          href="/admin/projects"
          className="p-2 bg-navy/5 rounded-xl text-navy/70 hover:text-navy hover:bg-navy/10 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">
            {isEdit ? "Edit Proyek" : "Tambah Proyek Baru"}
          </h1>
          <p className="text-navy/70 text-sm mt-1">
            {isEdit ? "Perbarui informasi proyek yang sudah ada." : "Lengkapi form di bawah ini untuk menambahkan proyek baru."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-navy/5 p-6 md:p-8 flex flex-col gap-8">
        
        {/* Basic Info Section (ID) */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">Informasi Bahasa Indonesia (ID)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Judul Proyek</label>
              <input
                type="text"
                name="title_id"
                required
                value={formData.title_id}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="Contoh: Sistem Informasi Kasir"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Kategori</label>
              <input
                type="text"
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="Contoh: Laravel & MySQL"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Deskripsi</label>
              <textarea
                name="description_id"
                required
                rows="4"
                value={formData.description_id}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all resize-y"
                placeholder="Deskripsikan proyek secara detail..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* English Info Section */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">English Information (EN)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Project Title</label>
              <input
                type="text"
                name="title_en"
                required
                value={formData.title_en}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="e.g: Cashier Information System"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Category</label>
              <input
                type="text"
                name="category_en"
                required
                value={formData.category_en}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="e.g: Laravel & MySQL"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Description</label>
              <textarea
                name="description_en"
                required
                rows="4"
                value={formData.description_en}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all resize-y"
                placeholder="Describe the project in detail..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Link, Tech Stack & Image */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">Tautan, Teknologi & Media</h2>
          
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Tautan Proyek (Link URL)</label>
            <input
              type="url"
              name="link_url"
              value={formData.link_url}
              onChange={handleChange}
              className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
              placeholder="Contoh: https://github.com/... atau https://..."
            />
            <p className="text-xs text-navy/50 mt-1">Opsional: Tautan menuju repositori GitHub atau website live.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Tech Stack</label>
              <input
                type="text"
                name="tech_stack"
                required
                value={formData.tech_stack}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="Pisahkan dengan koma (misal: React, TailwindCSS)"
              />
              <p className="text-xs text-navy/50 mt-1">Masukkan teknologi yang digunakan, pisahkan dengan koma (,).</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Gambar Thumbnail</label>
              <div className="relative border-2 border-dashed border-navy/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-navy/[0.02] transition-colors min-h-[160px]">
                {imagePreview ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden group border border-navy/10">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
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
                      Klik atau seret gambar ke sini
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
                />
              </div>
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
                {isEdit ? "Simpan Perubahan" : "Simpan Proyek"}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
