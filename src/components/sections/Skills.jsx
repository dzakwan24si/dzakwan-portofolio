"use client";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, 
  SiTailwindcss, SiPhp, SiLaravel, SiMysql, 
  SiFigma, SiGithub 
} from "react-icons/si";
import { FiCode, FiLayout } from "react-icons/fi";

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
};

export default function Skills() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { capabilities } = currentData;

  // Jika struktur data lama masih ter-cache, fallback sementara
  if (!capabilities) return null;

  return (
    <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto w-full" id="what-i-can-do">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Text & Icons */}
        <div className="lg:col-span-5 flex flex-col">
          <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-4 block">
            {capabilities.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-beige mb-6">
            {capabilities.title}
          </h2>
          <p className="text-beige-dark text-base md:text-lg mb-12 leading-relaxed max-w-md">
            {capabilities.description}
          </p>
          
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-4 max-w-[320px]">
            {capabilities.techIcons.map((tech, idx) => {
              const IconData = iconMap[tech];
              if (!IconData) return null;
              const Icon = IconData.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-14 h-14 md:w-16 md:h-16 bg-card-bg rounded-2xl flex items-center justify-center border border-beige/5 hover:border-beige/20 hover:bg-card-hover transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${IconData.color} drop-shadow-md`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 lg:mt-0">
          {capabilities.cards.map((card, idx) => (
            <motion.div 
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.2) }}
              className="bg-card-bg border border-beige/10 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden hover:border-beige/30 transition-colors shadow-2xl"
            >
              {/* Card Header (Number & Title) */}
              <div className="flex justify-between items-start mb-12">
                <span className="text-7xl font-display text-beige font-light leading-none opacity-90">
                  {card.id}
                </span>
                <span className="text-[9px] md:text-[10px] text-right text-beige-dark font-bold tracking-[0.2em] whitespace-pre-line leading-relaxed max-w-[130px]">
                  {card.title}
                </span>
              </div>

              {/* Icon Box */}
              <div className="w-16 h-16 bg-beige/5 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-beige/10">
                {card.icon === "code" ? (
                  <FiCode className="w-7 h-7 text-beige opacity-80" />
                ) : (
                  <FiLayout className="w-7 h-7 text-beige opacity-80" />
                )}
              </div>

              {/* Description */}
              <p className="text-beige-dark text-sm leading-relaxed mb-8 text-left opacity-80">
                {card.description}
              </p>

              {/* Tags Container */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {card.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 bg-beige/5 text-beige-dark text-[10px] font-mono rounded-lg border border-beige/5 hover:border-beige/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
