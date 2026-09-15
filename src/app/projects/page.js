"use client";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { mockData } from "@/data/mockData";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, 
  SiTailwindcss, SiPhp, SiLaravel, SiMysql, 
  SiFigma, SiGithub, SiPython
} from "react-icons/si";

const iconMap = {
  html5: { icon: SiHtml5, color: "text-[#E34F26]" },
  css3: { icon: SiCss, color: "text-[#1572B6]" },
  javascript: { icon: SiJavascript, color: "text-[#F7DF1E]" },
  react: { icon: SiReact, color: "text-[#61DAFB]" },
  tailwindcss: { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  php: { icon: SiPhp, color: "text-[#777BB4]" },
  laravel: { icon: SiLaravel, color: "text-[#FF2D20]" },
  mysql: { icon: SiMysql, color: "text-[#4479A1]" },
  figma: { icon: SiFigma, color: "text-[#F24E1E]" },
  github: { icon: SiGithub, color: "text-white" },
  python: { icon: SiPython, color: "text-[#3776AB]" }
};

export default function ProjectsArchive() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { archive } = currentData;

  return (
    <main className="relative w-full min-h-screen pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto">
      <CustomCursor />
      <Header />
      
      {/* Page Header */}
      <div className="mb-20">
        <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-6 block">
          {lang === 'ID' ? 'ARSIP PROYEK' : 'PROJECT ARCHIVE'}
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-[72px] leading-tight font-display font-bold text-beige tracking-tight mb-6">
          {lang === 'ID' ? 'Proyek Teknis' : 'Technical Projects'}
        </h1>
        <p className="text-beige-dark text-base md:text-lg max-w-2xl">
          {lang === 'ID' ? 'Koleksi lengkap dari pekerjaan teknis, sistem, dan proyek digital saya.' : 'A complete collection of my technical work, systems, and digital projects.'}
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col border-t border-beige/10">
        {archive.map((project, idx) => (
          <div 
            key={idx}
            className="group flex flex-col md:flex-row items-start md:items-center py-10 border-b border-beige/10 hover:bg-white/5 transition-colors px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl"
          >
            {/* Number */}
            <div className="w-16 md:w-24 shrink-0 mb-4 md:mb-0">
              <span className="text-beige-dark font-mono text-sm opacity-60 font-bold">
                {project.id}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pr-8">
              <h3 className="text-beige font-bold text-lg md:text-xl mb-3 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-beige-dark text-sm md:text-[15px] leading-relaxed mb-5 max-w-4xl">
                {project.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <span className="text-beige-dark text-[10px] font-bold tracking-widest uppercase">
                  {project.category}
                </span>
                <div className="flex items-center gap-3">
                  {project.tech.map((tech, i) => {
                    const IconData = iconMap[tech];
                    if (!IconData) return null;
                    const Icon = IconData.icon;
                    return (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-lg bg-card-bg border border-beige/5 flex items-center justify-center shadow-sm"
                        title={tech}
                      >
                        <Icon className={`w-4 h-4 ${IconData.color}`} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Link Icon */}
            <div className="hidden md:flex shrink-0">
              <FiExternalLink className="w-5 h-5 text-beige-dark group-hover:text-beige transition-colors" />
            </div>
          </div>
        ))}
      </div>
      
    </main>
  );
}
