"use client";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function Trainings({ experiences = [] }) {
  const { lang } = useLanguage();
  const currentData = mockData[lang];

  if (!experiences || experiences.length === 0) return null;

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full overflow-hidden" id="trainings">
      
      {/* Background Wavy Lines - using similar subtle curves from gallery */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden z-0">
        <svg viewBox="0 0 1440 320" className="w-[150%] h-auto transform-gpu">
          <path fill="none" stroke="#E8DCC4" strokeWidth="2" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-20">
          <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
            {currentData.trainingsHeader.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-display font-bold text-beige mb-6 tracking-tight">
            {currentData.trainingsHeader.title}
          </h2>
          <p className="text-beige-dark text-sm md:text-base max-w-2xl leading-relaxed">
            {currentData.trainingsHeader.description}
          </p>
        </div>

        {/* Trainings List */}
        <div className="flex flex-col gap-24">
          {experiences.slice(0, 3).map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-7 flex flex-col"
              >
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-2">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-beige">
                    {lang === 'ID' ? item.title_id : item.title_en}
                  </h3>
                  <span className="text-beige-dark text-xs md:text-sm font-mono opacity-80">
                    {lang === 'ID' ? item.date_id : item.date_en}
                  </span>
                </div>
                
                <h4 className="text-beige font-bold text-base md:text-lg mb-6">
                  {item.organization}
                </h4>
                
                <p className="text-beige-dark text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  {lang === 'ID' ? item.description_id : item.description_en}
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
              </motion.div>

              {/* Right Column: Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-5 relative"
              >
                {/* Secondary Image Stack Effect */}
                <div className="absolute inset-0 bg-card-bg border border-beige/10 rounded-2xl md:rounded-[2rem] transform -rotate-6 scale-95 opacity-50"></div>
                
                <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border border-beige/10 shadow-2xl hover:rotate-0 hover:scale-[1.02] transition-all duration-500 cursor-pointer">
                  <Image 
                    src={item.image_url || "/images/galeri2.jpg"}
                    alt={lang === 'ID' ? item.title_id : item.title_en}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle overlay for light mode / dark mode blend */}
                  <div className="absolute inset-0 bg-navy/10 pointer-events-none"></div>
                </div>
              </motion.div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        {experiences.length > 3 && (
          <div className="mt-20 flex justify-center">
            <a 
              href="/experience"
              className="inline-flex items-center gap-3 bg-beige text-navy px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white transition-colors hover-trigger"
            >
              {currentData.general.viewAllExperience}
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
