"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { createClient } from "@/utils/supabase/client";
import { deleteImage } from "@/utils/supabase/storage";

export default function ProjectsTableClient({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();
  const supabase = createClient();

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setDeletingId(id);
    try {
      // 1. Delete image from storage if exists
      if (imageUrl) {
        await deleteImage(imageUrl);
      }

      // 2. Delete from database
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // 3. Update local state
      setProjects(projects.filter(p => p.id !== id));
      router.refresh();
      
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Gagal menghapus proyek: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy">Kelola Proyek</h1>
          <p className="text-navy/70 text-sm mt-1">
            Tambah, ubah, dan hapus proyek portofolio Anda.
          </p>
        </div>
        <Link 
          href="/admin/projects/create"
          className="inline-flex items-center gap-2 bg-navy text-beige px-5 py-2.5 rounded-xl font-bold hover:bg-navy-light transition-colors shadow-md shadow-navy/10"
        >
          <FiPlus className="w-5 h-5" />
          Tambah Proyek Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy/5 text-navy/70 text-xs tracking-wider uppercase">
                <th className="px-6 py-4 font-bold">Thumbnail</th>
                <th className="px-6 py-4 font-bold">Judul (EN/ID)</th>
                <th className="px-6 py-4 font-bold">Kategori</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5 text-navy">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-navy/50">
                    Belum ada proyek. Silakan tambah proyek baru.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-navy/[0.02] transition-colors">
                    <td className="px-6 py-4 align-middle">
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-navy/5 border border-navy/10">
                        {project.image_url ? (
                          <Image 
                            src={project.image_url} 
                            alt={project.title_id || "Thumbnail"} 
                            fill 
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-navy/30 text-xs">No Image</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <div className="font-bold text-navy mb-1">{project.title_id || "-"}</div>
                      <div className="text-sm text-navy/60">{project.title_en || "-"}</div>
                    </td>
                    <td className="px-6 py-4 align-middle">
                      <span className="inline-block bg-navy/5 text-navy px-3 py-1 rounded-full text-xs font-medium border border-navy/10">
                        {project.category_id || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit Proyek"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.image_url)}
                          disabled={deletingId === project.id}
                          className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus Proyek"
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
