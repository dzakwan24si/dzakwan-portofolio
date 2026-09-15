"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { FiAward, FiStar, FiChevronRight, FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function Awards({ awards = [], gallery = [] }) {
  const containerRef = useRef(null);
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { recognition } = currentData;

  if (!awards || awards.length === 0) return null;

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full" id="awards">
      
      {/* Title Section */}
      <div className="mb-16">
        <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
          {recognition.subtitle}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-[64px] leading-tight font-display font-bold text-beige tracking-tight mb-4">
          {recognition.title}
        </h2>
        <p className="text-beige-dark text-sm md:text-[15px] leading-relaxed max-w-2xl">
          {recognition.description}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Collage (Masonry Style) */}
        <div className="lg:col-span-7 columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative w-full break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
            >
              {/* Randomize heights slightly for the masonry effect if using natural image sizes, 
                  but here we force some aspect ratios based on index for a consistent staggered look */}
              <div className={`relative w-full ${i % 3 === 0 ? 'aspect-square' : i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <Image 
                  src={item.image_url} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Awards List */}
        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 mt-8 lg:mt-0">
          {awards.map((award, i) => {
            const Icon = award.icon === "academic" ? FiAward : FiAward;
            
            return (
              <motion.a 
                key={award.id}
                href={award.link_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card-bg border border-beige/10 rounded-2xl p-5 md:p-6 flex items-center gap-5 hover:border-beige/30 transition-all shadow-xl hover:shadow-2xl cursor-pointer group hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-beige/5 border border-beige/5 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-beige opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
                
                <h4 className="flex-1 text-beige font-bold text-base md:text-lg">
                  {lang === 'ID' ? award.title_id : award.title_en}
                </h4>
                
                <FiExternalLink className="w-4 h-4 text-beige-dark group-hover:text-beige transition-colors" />
              </motion.a>
            )
          })}
        </div>

      </div>

    </section>
  );
}
