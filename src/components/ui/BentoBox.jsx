import { twMerge } from "tailwind-merge";

export default function BentoBox({ children, className = "", noPadding = false }) {
  return (
    <div 
      className={twMerge(
        "bg-navy-light rounded-2xl border border-navy shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-beige/20",
        !noPadding && "p-6 md:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
