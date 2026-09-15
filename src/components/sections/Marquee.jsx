"use client";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";

export default function Marquee() {
  // Array duplication for seamless infinite scroll
  const marqueeText = Array(10).fill(mockData.profile.role).join(" • ");

  return (
    <div className="w-full bg-beige text-navy py-4 overflow-hidden border-y border-navy-light/20 my-10">
      <motion.div
        className="whitespace-nowrap font-display font-bold text-2xl md:text-4xl"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 15 
        }}
      >
        {marqueeText}
      </motion.div>
    </div>
  );
}
