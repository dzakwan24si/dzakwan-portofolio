"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FiCode, FiActivity, FiCpu } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/utils/supabase/client";

const iconMap = {
  code: FiCode,
  test: FiActivity,
  learn: FiCpu,
};

export default function About() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { profile } = currentData;
  const [counts, setCounts] = useState({ projects: null, awards: null });

  useEffect(() => {
    async function fetchCounts() {
      const supabase = createClient();
      try {
        const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
        const { count: awardCount } = await supabase.from('awards').select('*', { count: 'exact', head: true });
        setCounts({ 
          projects: projectCount !== null ? projectCount : null,
          awards: awardCount !== null ? awardCount : null
        });
      } catch (error) {
        console.error("Error fetching stats counts:", error);
      }
    }
    fetchCounts();
  }, []);

  if (!profile || !profile.stats) return null;

  const displayStats = profile.stats.map(stat => {
    const labelUpper = stat.label.toUpperCase();
    if (labelUpper === 'PROJECTS' || labelUpper === 'PROYEK') {
      return { ...stat, value: counts.projects !== null ? `${counts.projects}+` : stat.value };
    }
    if (labelUpper === 'AWARDS' || labelUpper === 'PENGHARGAAN') {
      return { ...stat, value: counts.awards !== null ? counts.awards.toString() : stat.value };
    }
    return stat;
  });

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-[1200px] mx-auto w-full" id="about">
      
      {/* Title Section */}
      <div className="mb-10">
        <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
          ABOUT ME
        </span>
        <h2 className="text-5xl md:text-6xl lg:text-[72px] leading-[1.1] font-display font-bold text-beige tracking-tight mb-16">
          Problem Solver. Digital Generalist.
        </h2>
      </div>

      {/* Main Content (Photo + Details) */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-32 h-32 md:w-40 md:h-40 lg:w-[170px] lg:h-[170px] shrink-0 rounded-full overflow-hidden bg-white relative shadow-2xl mt-2"
        >
          <Image 
            src={profile.photo} 
            alt={profile.name}
            fill
            sizes="(max-width: 768px) 150px, 200px"
            priority
            className="object-cover object-top"
          />
        </motion.div>

        {/* Details Column */}
        <div className="flex-1 flex flex-col">
          
          {/* Name & Verified */}
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl md:text-2xl font-display font-bold text-beige uppercase tracking-wide">
              {profile.name}
            </h3>
            <MdVerified className="text-[#1D9BF0] w-5 h-5 md:w-6 md:h-6" />
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-8 md:gap-12 mb-6">
            {displayStats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-beige-dark text-[10px] font-bold tracking-[0.15em] uppercase">
                  {stat.label}
                </span>
                <span className="text-beige text-base md:text-lg font-bold">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Bio Text */}
          <p className="text-beige-dark text-sm md:text-[15px] leading-[1.8] mb-6 max-w-[850px]">
            {profile.about}
          </p>

          <p className="text-beige-dark text-sm md:text-[15px]">
            {lang === 'EN' ? 'Want to know more about my experience? ' : 'Ingin tahu lebih banyak tentang pengalaman saya? '}
            <a href="/files/Resume_M_Dzakwan_Syafiq_Programmer.pdf" target="_blank" rel="noopener noreferrer" className="text-beige font-bold underline hover:text-white transition-colors">
              {lang === 'EN' ? 'Download my resume' : 'Unduh resume saya'}
            </a>.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-beige/5 mt-12 mb-8 md:mt-16 md:mb-10" />

      {/* Currently Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-16 lg:gap-8 relative">
        
        {/* Left: Activities */}
        <div className="w-full lg:w-auto">
          <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-6 block">
            {lang === 'EN' ? 'CURRENTLY' : 'SAAT INI'}
          </span>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
            {profile.currently.map((item, i) => {
              const Icon = iconMap[item.icon] || FiCode;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-card-bg border border-beige/10 flex items-center justify-center shrink-0 transition-colors duration-500">
                    <Icon className="w-4 h-4 text-beige" />
                  </div>
                  <div>
                    <h4 className="text-beige font-bold text-[13px] md:text-sm mb-0.5">{item.title}</h4>
                    <p className="text-beige-dark text-[11px] md:text-xs">{item.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Trait Cards */}
        <div className="relative w-full lg:w-[350px] h-32 md:h-40 flex items-center justify-center lg:justify-end pr-0 lg:pr-4 perspective-1000 mt-10 lg:mt-0">
          {profile.traits.map((trait, i) => {
            const rotations = ["rotate-[-10deg]", "rotate-[-2deg]", "rotate-[8deg]"];
            const translates = ["-translate-x-12 translate-y-4", "-translate-x-4 -translate-y-2", "translate-x-6 translate-y-4"];
            const zIndexes = ["z-10", "z-20", "z-30"];
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`absolute w-[140px] h-[90px] md:w-[170px] md:h-[110px] bg-card-bg border border-beige/10 rounded-2xl p-4 shadow-2xl flex flex-col justify-between ${rotations[i]} ${translates[i]} ${zIndexes[i]} hover:z-40 hover:scale-105 hover:-translate-y-2 transition-all cursor-pointer`}
              >
                <span className="text-[8px] md:text-[9px] text-beige-dark font-bold tracking-[0.2em] uppercase">
                  {lang === 'EN' ? 'TRAIT' : 'KUALITAS'}
                </span>
                <span className="text-beige font-bold text-sm md:text-base leading-tight">{trait}</span>
              </motion.div>
            )
          })}
        </div>

      </div>

    </section>
  );
}
