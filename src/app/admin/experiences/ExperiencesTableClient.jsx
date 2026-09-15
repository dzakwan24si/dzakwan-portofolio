"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import { deleteImage } from "@/utils/supabase/storage";

export default function ExperiencesTableClient({ initialExperiences }) {
  const [experiences, setExperiences] = useState(initialExperiences || []);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pengalaman ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setDeletingId(id);
    try {
      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setExperiences(experiences.filter(e => e.id !== id));
      router.refresh();
      
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("Gagal menghapus pengalaman: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Kelola Pengalaman</h1>
          <p className="text-navy/70 text-sm mt-1">
            Tambah, ubah, dan hapus riwayat pengalaman/organisasi Anda.
          </p>
        </div>
        <Link 
          href="/admin/experiences/create"
          className="inline-flex items-center gap-2 bg-navy text-beige px-5 py-2.5 rounded-xl font-bold hover:bg-navy-light transition-colors shadow-md shadow-navy/10"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Pengalaman
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy/70 text-xs tracking-wider uppercase">
                <th className="px-6 py-4 font-bold">Thumbnail</th>
                <th className="px-6 py-4 font-bold">Peran (EN/ID)</th>
                <th className="px-6 py-4 font-bold">Organisasi</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-navy">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-navy/50">
                    Belum ada data. Silakan tambah data baru.
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-navy/[0.02] transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-navy/5 border border-navy/10">
                        {exp.image_url ? (
                          <Image 
                            src={exp.image_url} 
                            alt={exp.title_id || "Thumbnail"} 
                            fill 
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy/30 text-[10px]">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="font-bold text-navy mb-1">{exp.title_id || "-"}</div>
                      <div className="text-sm text-navy/60">{exp.title_en || "-"}</div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span className="font-medium">{exp.organization || "-"}</span>
                      <div className="text-xs text-navy/50 mt-1">{exp.date_id}</div>
                    </td>
                    <td className="px-6 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/experiences/${exp.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Pengalaman"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(exp.id, exp.image_url)}
                          disabled={deletingId === exp.id}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus Pengalaman"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
