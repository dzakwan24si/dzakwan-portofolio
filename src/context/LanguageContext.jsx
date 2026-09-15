"use client";
import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    if (localStorage.lang) {
      setLang(localStorage.lang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "EN" ? "ID" : "EN";
    setLang(newLang);
    localStorage.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
