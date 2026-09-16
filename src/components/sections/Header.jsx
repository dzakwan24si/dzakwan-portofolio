"use client";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { mockData } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isLight, setIsLight] = useState(false);
  const { lang, toggleLang } = useLanguage();

  useEffect(() => {
    if (localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.theme = 'dark';
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.theme = 'light';
      setIsLight(true);
    }
  };

  const currentData = mockData[lang];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-7xl z-50"
    >
      <div className="bg-card-bg/80 backdrop-blur-md border border-beige/10 rounded-full px-6 md:px-10 py-4 flex items-center justify-between shadow-2xl transition-colors duration-500">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group cursor-pointer">
          <div className="relative w-12 h-12 transition-all duration-500 group-hover:scale-105">
            <Image 
              src={isLight ? "/images/logolightmode.png" : "/images/logodarkmode.png"} 
              alt="Dzakwan Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-bold text-beige hidden md:block tracking-widest text-lg transition-colors duration-500 group-hover:text-white">
            DZAKWAN
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {currentData.header.nav.map((item, idx) => {
            const keys = ["WORK", "WHAT I CAN DO", "ABOUT", "AWARDS", "TRAININGS"];
            const englishKey = keys[idx];
            return (
              <a 
                key={englishKey} 
                href={`/#${englishKey.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm font-bold text-beige-dark hover:text-beige tracking-widest transition-colors hover-trigger"
              >
                {item}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex items-center">
            <button 
              onClick={toggleLang}
              className="text-beige-dark hover:text-beige transition-all duration-300 hover-trigger w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-beige/20 font-bold text-xs"
            >
              {lang}
            </button>
            <button 
              onClick={toggleTheme}
              className="text-beige-dark hover:text-beige transition-all duration-300 hover-trigger w-10 h-10 flex items-center justify-center rounded-full border border-transparent hover:border-beige/20"
            >
              {isLight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <a 
            href={`mailto:${mockData.socials.email}`}
            className="px-8 py-3 rounded-full border border-beige/30 text-beige text-base font-semibold hover:bg-beige hover:text-navy transition-all duration-300 hover-trigger whitespace-nowrap"
          >
            {currentData.header.hireMe}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
