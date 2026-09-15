"use client";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-end overflow-hidden pt-24">
      
      {/* Concentric Circles Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-30 transition-opacity duration-500">
        <div className="absolute w-[40vw] h-[40vw] rounded-full border border-beige-dark/20"></div>
        <div className="absolute w-[60vw] h-[60vw] rounded-full border border-beige-dark/15"></div>
        <div className="absolute w-[80vw] h-[80vw] rounded-full border border-beige-dark/10"></div>
        <div className="absolute w-[100vw] h-[100vw] rounded-full border border-beige-dark/5"></div>
      </div>

      {/* Raksasa Background Text (Marquee Style) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden flex items-center z-0">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap"
        >
          {Array(4).fill(currentData.profile.name.toUpperCase() + "   ").map((text, i) => (
            <h1 
              key={i} 
              className="text-[35vw] md:text-[28vw] font-display font-bold leading-none text-outline text-outline-hover opacity-50 select-none px-4 tracking-tighter transition-all duration-300"
            >
              {text}
            </h1>
          ))}
        </motion.div>
      </div>

      {/* Profil Cutout */}
      <div className="relative z-10 w-full max-w-4xl h-[85vh] flex justify-center items-end">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image 
            src={currentData.profile.photo} 
            alt="Dzakwan Cutout Profile"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-4 z-20"
      >
        <div className="w-[1px] h-16 bg-beige/30"></div>
        <span className="text-beige-dark text-xs tracking-[0.3em] font-medium rotate-90 origin-top translate-y-16">
          SCROLL DOWN
        </span>
      </motion.div>
    </section>
  );
}
