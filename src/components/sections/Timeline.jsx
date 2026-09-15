"use client";
import { motion } from "framer-motion";
import { mockData } from "@/data/mockData";
import BentoBox from "../ui/BentoBox";

export default function Timeline() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-4xl md:text-6xl font-display font-bold mb-16 text-center"
      >
        PROBLEM SOLVER
      </motion.h2>

      <div className="relative border-l-2 border-navy-light/50 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2">
        {mockData.timeline.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              className={`mb-12 relative flex items-center w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-beige rounded-full shadow-[0_0_10px_var(--color-beige)] z-10" />

              {/* Content Box */}
              <div className={`ml-8 md:ml-0 md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                <BentoBox className="p-6 hover-trigger">
                  <span className="inline-block px-3 py-1 bg-navy text-beige-dark text-sm rounded-full mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold font-display text-beige mb-1">
                    {item.title}
                  </h3>
                  <h4 className="text-md text-beige-dark mb-4">
                    {item.organization}
                  </h4>
                  <p className="text-beige/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </BentoBox>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
