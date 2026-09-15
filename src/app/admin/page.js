import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch some summary stats
  const [
    { count: projectsCount },
    { count: experiencesCount },
    { count: awardsCount }
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: 'exact', head: true }),
    supabase.from("experiences").select("*", { count: 'exact', head: true }),
    supabase.from("awards").select("*", { count: 'exact', head: true })
  ]);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-navy mb-2">
          Dashboard
        </h1>
        <p className="text-navy/70 text-sm md:text-base">
          Selamat datang di panel kontrol portofolio Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-navy/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-navy/50 text-xs tracking-widest font-bold uppercase block mb-4">
              Total Proyek
            </span>
            <span className="text-5xl font-display font-bold text-navy">
              {projectsCount || 0}
            </span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-navy/5 rounded-full blur-2xl group-hover:bg-navy/10 transition-colors"></div>
        </div>

        <div className="bg-white border border-navy/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-navy/50 text-xs tracking-widest font-bold uppercase block mb-4">
              Total Pengalaman
            </span>
            <span className="text-5xl font-display font-bold text-navy">
              {experiencesCount || 0}
            </span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-navy/5 rounded-full blur-2xl group-hover:bg-navy/10 transition-colors"></div>
        </div>

        <div className="bg-white border border-navy/10 p-6 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-navy/50 text-xs tracking-widest font-bold uppercase block mb-4">
              Total Penghargaan
            </span>
            <span className="text-5xl font-display font-bold text-navy">
              {awardsCount || 0}
            </span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-navy/5 rounded-full blur-2xl group-hover:bg-navy/10 transition-colors"></div>
        </div>

      </div>

      {/* Getting Started Guide */}
      <div className="bg-white/50 border border-navy/10 p-8 rounded-2xl mt-4">
        <h2 className="text-xl font-bold text-navy mb-4">Petunjuk Singkat</h2>
        <p className="text-navy/70 text-sm leading-relaxed mb-4">
          Gunakan menu di sidebar kiri untuk mengelola konten portofolio Anda.
        </p>
        <ul className="text-navy/70 text-sm space-y-2 list-disc list-inside">
          <li><strong>Kelola Proyek:</strong> Tambah, edit, atau hapus daftar proyek teknis Anda.</li>
          <li><strong>Kelola Pengalaman:</strong> Perbarui riwayat magang, pelatihan, dan organisasi.</li>
          <li><strong>Kelola Penghargaan:</strong> Kelola sertifikat dan pencapaian Anda.</li>
          <li><strong>Kelola Galeri:</strong> Atur foto-foto yang akan muncul di *masonry layout* bagian Penghargaan.</li>
        </ul>
      </div>

    </div>
  );
}
