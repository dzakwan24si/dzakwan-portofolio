"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiPlus, FiFileText } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import { deleteFile } from "@/utils/supabase/storage";

export default function AwardsTableClient({ initialAwards }) {
  const [awards, setAwards] = useState(initialAwards || []);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id, fileUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus penghargaan ini?")) {
      return;
    }

    setDeletingId(id);
    try {
      if (fileUrl) {
        await deleteFile(fileUrl);
      }

      const { error } = await supabase
        .from('awards')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAwards(awards.filter(a => a.id !== id));
      router.refresh();
      
    } catch (error) {
      console.error("Error deleting award:", error);
      alert("Gagal menghapus penghargaan: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Kelola Penghargaan</h1>
          <p className="text-navy/70 text-sm mt-1">
            Manajemen daftar sertifikat, medali, dan pencapaian Anda.
          </p>
        </div>
        <Link 
          href="/admin/awards/create"
          className="inline-flex items-center gap-2 bg-navy text-beige px-5 py-2.5 rounded-xl font-bold hover:bg-navy-light transition-colors shadow-md shadow-navy/10"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Penghargaan
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy/70 text-xs tracking-wider uppercase">
                <th className="px-6 py-4 font-bold w-16">Ikon</th>
                <th className="px-6 py-4 font-bold">Judul (EN/ID)</th>
                <th className="px-6 py-4 font-bold">File Sertifikat</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-navy">
              {awards.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-navy/50">
                    Belum ada data. Silakan tambah data baru.
                  </td>
                </tr>
              ) : (
                awards.map((award) => (
                  <tr key={award.id} className="hover:bg-navy/[0.02] transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center text-navy/50 border border-navy/10">
                        <FiFileText className="w-5 h-5" />
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="font-bold text-navy mb-1">{award.title_id || "-"}</div>
                      <div className="text-sm text-navy/60">{award.title_en || "-"}</div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      {award.link_url ? (
                        <a 
                          href={award.link_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Lihat Dokumen
                        </a>
                      ) : (
                        <span className="text-sm text-navy/40">Tidak ada file</span>
                      )}
                    </td>
                    <td className="px-6 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/awards/${award.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Penghargaan"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(award.id, award.link_url)}
                          disabled={deletingId === award.id}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus Penghargaan"
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
