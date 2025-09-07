"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, GraduationCap } from "lucide-react";
import ThesisShowcase from "@/components/ThesisShowcase";
import CourseworkShowcase from "@/components/CourseworkShowcase";
import ProfessionalShowcase from "@/components/ProfessionalShowcase"; // ✅ added

const categories = [
  {
    id: "professional",
    title: "PROFESSIONAL PROJECTS",
    icon: Briefcase,
    desc: "Explore real-world and industry projects across ML, IoT, and Robotics.",
  },
  {
    id: "thesis",
    title: "THESIS",
    icon: FileText,
    desc: "My bachelor’s thesis research on IoT, ECG signal monitoring, and sleep apnea detection.",
  },
  {
    id: "coursework",
    title: "COURSEWORK",
    icon: GraduationCap,
    desc: "Selected academic coursework projects and assignments in engineering and AI.",
  },
];

export default function ProjectsLanding() {
  const [selected, setSelected] = useState<string | null>(null);
  const [atPageEnd, setAtPageEnd] = useState(false);

  // Ref to track selected section
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Track if user is at bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;
      setAtPageEnd(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (atPageEnd) {
      // Scroll back to hero
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const currentY = window.scrollY;

      // If not yet at the section, go exactly to its top
      if (currentY + 50 < sectionTop) {
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
      } else {
        // Already at/inside section → scroll one full viewport down
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    } else {
      // Fallback → always scroll one viewport
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />

      {/* HERO */}
      <section className="relative text-center py-20 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-orange-400 drop-shadow-lg"
        >
          LABORATORY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 max-w-3xl mx-auto text-lg font-semibold text-orange-200 tracking-wide drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]"
        >
          FLOATING ORBS — CLICK AN ORB TO EXPLORE PROJECTS.
        </motion.p>
      </section>

      {/* FLOATING ORBS */}
      <div className="relative z-10 flex justify-center items-end gap-10 px-10 py-16 flex-wrap">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = selected === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -15, 0] }}
              transition={{
                delay: 0.6 + i * 0.2,
                opacity: { duration: 0.8, ease: "easeOut" },
                y: { duration: 4 + i, ease: "easeInOut", repeat: Infinity },
              }}
              whileHover={{
                y: -30,
                scale: 1.1,
                transition: { type: "spring", stiffness: 80, damping: 12 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(cat.id)}
              className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center cursor-pointer
                transition shadow-lg 
                ${
                  isActive
                    ? "border-2 border-orange-400 bg-orange-400/20 shadow-orange-500/40 scale-110"
                    : "border border-orange-400/30 bg-gradient-to-br from-orange-400/10 to-black hover:border-orange-400 hover:shadow-orange-500/30"
                }`}
            >
              <Icon
                className={`w-12 h-12 ${
                  isActive
                    ? "text-orange-300 drop-shadow-[0_0_15px_rgba(249,115,22,1)]"
                    : "text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                }`}
              />
              <h3
                className={`mt-3 text-sm font-bold text-center px-2 ${
                  isActive ? "text-orange-200" : "text-orange-300"
                }`}
              >
                {cat.title}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* SELECTED CONTENT */}
      {selected === "thesis" ? (
        <div ref={sectionRef}>
          <ThesisShowcase />
        </div>
      ) : selected === "coursework" ? (
        <div ref={sectionRef}>
          <CourseworkShowcase />
        </div>
      ) : selected === "professional" ? (
        <div ref={sectionRef}>
          <ProfessionalShowcase /> {/* ✅ the stacked auto-cycling cards */}
        </div>
      ) : null}

      {/* FOOTER */}
      <footer className="relative z-10 text-center py-12 border-t border-orange-400/10 mt-20">
        <p className="text-gray-400">
          ⚡ Hovering makes the orbs float higher. Clicking selects a category.
        </p>
      </footer>

     {/* SCROLL INDICATOR → only when a category is selected */}
{selected && (
  <motion.div
    onClick={handleScrollClick}
    initial={{ opacity: 0, y: 10 }}
    animate={{
      opacity: [0.6, 1, 0.6],
      y: [0, 6, 0],
      boxShadow: [
        "0 0 6px rgba(251,146,60,0.4)",
        "0 0 16px rgba(251,146,60,0.7)",
        "0 0 6px rgba(251,146,60,0.4)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
               w-10 h-10 rounded-full border border-orange-400/40 
               bg-orange-400/10 shadow-md cursor-pointer"
  >
    <span
      className="relative -translate-y-0.5 text-orange-400 text-lg font-bold leading-none 
                 drop-shadow-[0_0_6px_rgba(251,146,60,0.9)] select-none pointer-events-none"
    >
      {atPageEnd ? "↑" : "↓"}
    </span>
  </motion.div>
)}
    </div>
  );
}
