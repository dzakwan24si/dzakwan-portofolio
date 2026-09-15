"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUp } from "react-icons/fi";
import { mockData } from "@/data/mockData";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const currentData = mockData[lang];
  const { socials } = mockData;

  const contactLinks = [
    { id: "01", title: "EMAIL", value: socials.email, url: `mailto:${socials.email}`, icon: FiMail },
    { id: "02", title: "LINKEDIN", value: "linkedin.com/in/m-dzakwan-syafiq", url: socials.linkedin, icon: FiLinkedin },
    { id: "03", title: "GITHUB", value: "github.com/dzakwan24si", url: socials.github, icon: FiGithub }
  ];

  return (
    <footer className="relative bg-navy pt-24 md:pt-32 pb-6 px-6 md:px-12 w-full overflow-hidden" id="footer">
      
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none flex justify-center z-0 overflow-hidden">
        <h2 className="text-[25vw] font-display font-bold text-beige leading-none select-none translate-y-1/4">
          DZAKWAN
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-beige-dark text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase mb-6 block">
              {currentData.footer.getInTouch}
            </span>
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[100px] leading-[0.9] font-display font-bold text-beige mb-10 tracking-tight whitespace-pre-line">
              {currentData.footer.letsWork}
            </h1>
            
            <h3 className="text-xl md:text-2xl font-bold text-beige mb-6 max-w-md">
              {currentData.footer.lookingFor}
            </h3>
            
            <p className="text-beige-dark text-base md:text-lg mb-10 max-w-md leading-relaxed">
              {currentData.footer.openTo}
            </p>
            
            <a 
              href="/files/Resume_M_Dzakwan_Syafiq_Programmer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-beige text-navy px-8 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white transition-colors hover-trigger"
            >
              {currentData.footer.download}
            </a>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4">
            
            {contactLinks.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <a 
                  key={contact.id}
                  href={contact.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-card-bg border border-beige/5 rounded-[2rem] p-6 flex items-center justify-between hover:bg-card-hover transition-colors shadow-lg hover-trigger group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-navy/20 border border-beige/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-beige opacity-80" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-beige-dark text-[10px] font-bold tracking-[0.2em] uppercase">
                        {contact.title}
                      </span>
                      <span className="text-beige font-bold text-sm md:text-base group-hover:text-white transition-colors break-all">
                        {contact.value}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-between items-end h-12">
                    <span className="text-beige-dark text-[10px] font-mono opacity-60 font-bold">
                      {contact.id}
                    </span>
                    <FiArrowUp className="w-4 h-4 text-beige opacity-50 rotate-45 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              )
            })}

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-beige/10 gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-beige-dark text-xs md:text-sm font-mono uppercase font-bold tracking-wider">
              {lang === 'ID' ? 'TERSEDIA UNTUK BEKERJA' : 'AVAILABLE FOR HIRE'}
            </span>
          </div>

          <p className="text-beige-dark text-xs md:text-sm font-bold opacity-80 text-center">
            &copy; {new Date().getFullYear()} M. DZAKWAN SYAFIQ
          </p>
        </div>

      </div>
    </footer>
  );
}
