"use client";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperiencePage() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { trainings } = currentData;

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-navy">
      <CustomCursor />
      <Header />
      
      <div className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto z-10">
        
        {/* Page Header */}
        <div className="mb-20">
          <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-6 block">
            {lang === 'ID' ? 'PERTUMBUHAN & PENGALAMAN' : 'GROWTH & EXPERIENCE'}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-[72px] leading-tight font-display font-bold text-beige tracking-tight mb-6">
            {lang === 'ID' ? 'Semua Pengalaman' : 'All Experiences'}
          </h1>
          <p className="text-beige-dark text-base md:text-lg max-w-2xl">
            {lang === 'ID' ? 'Koleksi lengkap dari magang, pelatihan teknis, workshop, dan pengalaman kepemimpinan organisasi saya.' : 'A complete collection of my internships, technical trainings, workshops, and organizational leadership experiences.'}
          </p>
        </div>

        {/* Experience List */}
        <div className="flex flex-col gap-24 border-t border-beige/10 pt-20">
          {trainings.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-2">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-beige">
                    {item.title}
                  </h3>
                  <span className="text-beige-dark text-xs md:text-sm font-mono opacity-80">
                    {item.date}
                  </span>
                </div>
                
                <h4 className="text-beige font-bold text-base md:text-lg mb-6">
                  {item.organization}
                </h4>
                
                <p className="text-beige-dark text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  {item.description}
                </p>

                <div className="flex flex-col gap-4">
                  {item.links && item.links.map((link, i) => (
                    <a 
                      key={i}
                      href={link.url}
                      className="inline-flex items-center gap-2 text-beige hover:text-white font-bold text-xs md:text-sm tracking-widest uppercase transition-colors hover-trigger w-fit group"
                    >
                      {link.label}
                      <FiExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="lg:col-span-5 relative">
                {/* Secondary Image Stack Effect */}
                <div className="absolute inset-0 bg-card-bg border border-beige/10 rounded-2xl md:rounded-[2rem] transform -rotate-6 scale-95 opacity-50"></div>
                
                <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border border-beige/10 shadow-2xl hover:rotate-0 hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                  <Image 
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle overlay for light mode / dark mode blend */}
                  <div className="absolute inset-0 bg-navy/10 pointer-events-none"></div>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
      
      <Footer />
    </main>
  );
}
