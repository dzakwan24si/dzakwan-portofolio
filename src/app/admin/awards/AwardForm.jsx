"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiUpload, FiX, FiSave, FiArrowLeft, FiFileText } from "react-icons/fi";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { uploadFile, deleteFile } from "@/utils/supabase/storage";

export default function AwardForm({ initialData = null }) {
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

  const [documentFile, setDocumentFile] = useState(null);
  const [documentFileName, setDocumentFileName] = useState(
    initialData?.link_url ? initialData.link_url.split('/').pop() : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("Ukuran dokumen maksimal 10MB");
        return;
      }
      setDocumentFile(file);
      setDocumentFileName(file.name);
    }
  };

  const removeFile = () => {
    setDocumentFile(null);
    setDocumentFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalFileUrl = initialData?.link_url || null;

      if (documentFile) {
        const uploadedUrl = await uploadFile(documentFile, 'awards');
        if (uploadedUrl) {
          finalFileUrl = uploadedUrl;
          
          if (isEdit && initialData?.link_url) {
            await deleteFile(initialData.link_url);
          }
        }
      } else if (!documentFileName && isEdit && initialData?.link_url) {
        await deleteFile(initialData.link_url);
        finalFileUrl = null;
      }

      const payload = {
        title_id: formData.title_id,
        title_en: formData.title_en,
        link_url: finalFileUrl,
        icon: 'academic', // default icon
      };

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('awards')
          .update(payload)
          .eq('id', initialData.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('awards')
          .insert([payload]);
          
        if (insertError) throw insertError;
      }

      router.refresh();
      router.push("/admin/awards");

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
          href="/admin/awards"
          className="p-2 bg-navy/5 rounded-xl text-navy/70 hover:text-navy hover:bg-navy/10 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">
            {isEdit ? "Edit Penghargaan" : "Tambah Penghargaan Baru"}
          </h1>
          <p className="text-navy/70 text-sm mt-1">
            {isEdit ? "Perbarui informasi penghargaan yang sudah ada." : "Tambahkan sertifikat atau pencapaian baru."}
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
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">Informasi Penghargaan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Judul Penghargaan (ID)</label>
              <input
                type="text"
                name="title_id"
                required
                value={formData.title_id}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="Contoh: Sertifikasi TKJ Level II"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">Award Title (EN)</label>
              <input
                type="text"
                name="title_en"
                required
                value={formData.title_en}
                onChange={handleChange}
                className="bg-navy/5 border border-navy/10 rounded-xl px-4 py-3 text-navy placeholder:text-navy/40 focus:outline-none focus:border-navy/30 focus:ring-1 focus:ring-navy/30 transition-all"
                placeholder="e.g: Level II Networking Certification"
              />
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <h2 className="text-lg font-bold text-navy border-b border-navy/5 pb-2 mb-4">Dokumen Sertifikat</h2>
          <div className="flex flex-col gap-2">
            <label className="text-navy/70 text-xs font-bold tracking-widest uppercase">File PDF / Gambar</label>
            <div className="relative border-2 border-dashed border-navy/20 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-navy/[0.02] transition-colors md:w-1/2">
              {documentFileName ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="w-16 h-16 bg-navy/5 rounded-xl flex items-center justify-center border border-navy/10">
                    <FiFileText className="w-8 h-8 text-navy/50" />
                  </div>
                  <div className="text-center w-full px-4">
                    <p className="text-sm font-bold text-navy truncate">{documentFileName}</p>
                    <p className="text-xs text-navy/50 mt-1">Siap untuk diunggah</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    <FiX className="w-4 h-4" /> Hapus File
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center">
                    <FiUpload className="w-6 h-6 text-navy/50" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-navy/80 font-medium">Klik atau seret dokumen ke sini</p>
                    <p className="text-xs text-navy/40 mt-1">PDF, JPG, PNG hingga 10MB</p>
                  </div>
                </>
              )}
              
              <input
                type="file"
                accept=".pdf, image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={!!documentFileName}
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
                {isEdit ? "Simpan Perubahan" : "Simpan Penghargaan"}
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
