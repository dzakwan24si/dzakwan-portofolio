"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import { deleteFile } from "@/utils/supabase/storage";

export default function GalleryTableClient({ initialGallery }) {
  const [gallery, setGallery] = useState(initialGallery || []);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus foto galeri ini?")) {
      return;
    }

    setDeletingId(id);
    try {
      if (imageUrl) {
        await deleteFile(imageUrl);
      }

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGallery(gallery.filter(g => g.id !== id));
      router.refresh();
      
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      alert("Gagal menghapus foto galeri: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Kelola Galeri</h1>
          <p className="text-navy/70 text-sm mt-1">
            Manajemen foto dokumentasi untuk ditampilkan di halaman Awards.
          </p>
        </div>
        <Link 
          href="/admin/gallery/create"
          className="inline-flex items-center gap-2 bg-navy text-beige px-5 py-2.5 rounded-xl font-bold hover:bg-navy-light transition-colors shadow-md shadow-navy/10"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Foto Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy/70 text-xs tracking-wider uppercase">
                <th className="px-6 py-4 font-bold">Foto</th>
                <th className="px-6 py-4 font-bold">Keterangan (EN/ID)</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-navy">
              {gallery.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-navy/50">
                    Belum ada data. Silakan tambah data baru.
                  </td>
                </tr>
              ) : (
                gallery.map((item) => (
                  <tr key={item.id} className="hover:bg-navy/[0.02] transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-navy/5 border border-navy/10">
                        {item.image_url ? (
                          <Image 
                            src={item.image_url} 
                            alt={item.title_id || "Foto Galeri"} 
                            fill 
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy/30 text-[10px]">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="font-bold text-navy mb-1">{item.title_id || "-"}</div>
                      <div className="text-sm text-navy/60">{item.title_en || "-"}</div>
                    </td>
                    <td className="px-6 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/gallery/${item.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Foto"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id, item.image_url)}
                          disabled={deletingId === item.id}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus Foto"
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
