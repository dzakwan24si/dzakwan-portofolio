"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function WorkGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();
  const currentData = mockData[lang];

  return (
    <section className="relative py-32 px-6 md:px-12 w-full overflow-hidden" id="work">
      
      {/* Background Wavy Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex flex-col justify-between overflow-hidden z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto scale-150 transform-gpu">
          <path fill="none" stroke="#E8DCC4" strokeWidth="2" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96" />
        </svg>
        <svg viewBox="0 0 1440 320" className="w-full h-auto mt-auto scale-150 transform-gpu">
          <path fill="none" stroke="#E8DCC4" strokeWidth="2" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,234.7C672,245,768,203,864,181.3C960,160,1056,160,1152,176C1248,192,1344,224,1392,240L1440,256" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
              SELECTED WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-beige mb-4">
              Work Gallery
            </h2>
            <p className="text-beige-dark text-base md:text-lg max-w-xl">
              {lang === 'ID' ? 'Koleksi sistem, proyek digital, dan pekerjaan teknis yang telah saya buat.' : 'A collection of systems, digital projects, and technical work I\'ve built.'}
            </p>
          </div>
          
          <a 
            href="/projects"
            className="flex items-center justify-center gap-3 bg-beige text-navy px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors hover-trigger self-start md:self-end"
          >
            {currentData.general.viewMoreProjects}
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 3D Coverflow Carousel */}
        <div className="relative h-[200px] md:h-[320px] w-full flex items-center justify-center mb-16" style={{ perspective: "1000px" }}>
          {currentData.projects.map((project, index) => {
            const offset = index - activeIndex;
            const isActive = offset === 0;
            
            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: `${offset * 60}%`,
                  scale: isActive ? 1 : 0.85,
                  zIndex: 30 - Math.abs(offset),
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  rotateY: offset * -10, // slight 3D rotation for side items
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute w-[75vw] md:w-[450px] h-full rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-[filter,box-shadow] duration-200 ${
                  isActive 
                  ? 'ring-2 md:ring-4 ring-[#1a3a6e] shadow-[0_20px_50px_rgba(26,58,110,0.5)]' 
                  : 'brightness-[0.4] hover:brightness-[0.6]'
                }`}
              >
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Active Project Details */}
        <div className="text-center max-w-3xl mx-auto h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl md:text-4xl font-display font-bold text-beige mb-4 leading-tight">
                {currentData.projects[activeIndex].title}
              </h3>
              <p className="text-beige-dark text-sm md:text-base mb-8 leading-relaxed">
                {currentData.projects[activeIndex].description}
              </p>
              <a href="/projects" className="inline-flex items-center gap-2 text-beige font-bold hover:text-white transition-colors hover-trigger group">
                {currentData.general.viewProject}
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
