"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfessionalDistinctions from "@/components/ProfessionalDistinctions";
import OnlineCourses from "@/components/OnlineCourses";
import MulticulturalActivities from "@/components/MulticulturalActivities";

export default function TheVault() {
  const [phase, setPhase] = useState<"typing" | "granted" | "main" | "viewing">("typing");
  const [typed, setTyped] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activePage, setActivePage] = useState<string | null>(null);

  const options = [
    "Professional Distinctions",
    "Online Courses",
    "Multicultural Activities",
  ];

  const text = "> ACCESSING THE VAULT...";

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    let currentChar = 0;
    let output = "";
    const interval = setInterval(() => {
      if (currentChar < text.length) {
        output += text[currentChar];
        currentChar++;
        setTyped(output);
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("granted"), 500);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Transition granted -> main
  useEffect(() => {
    if (phase === "granted") {
      const timer = setTimeout(() => setPhase("main"), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle arrow navigation + Enter
  useEffect(() => {
    if (phase !== "main") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % options.length);
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      } else if (e.key === "Enter") {
        setActivePage(options[selectedIndex]);
        setPhase("viewing");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, options.length, selectedIndex, options]);

  // Escape to go back
  useEffect(() => {
    if (phase !== "viewing") return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePage(null);
        setPhase("main");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [phase]);

  // Back handler for subpages
  const handleBack = () => {
    setActivePage(null);
    setPhase("main");
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />

      <AnimatePresence mode="wait">
        {phase === "typing" && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-green-200 text-2xl md:text-3xl drop-shadow-[0_0_6px_rgba(0,255,0,0.8)] flex items-center z-10"
          >
            <span>{typed}</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </motion.div>
        )}

        {phase === "granted" && (
          <motion.pre
            key="granted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-green-200 text-2xl md:text-3xl whitespace-pre-wrap drop-shadow-[0_0_6px_rgba(0,255,0,0.8)] text-center z-10"
          >
            ✅ ACCESS GRANTED
          </motion.pre>
        )}

        {phase === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center space-y-8 sm:space-y-10 z-10 max-w-md px-4 text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-orange-400 tracking-widest drop-shadow-lg text-center">
              THE VAULT
            </h1>

            <div className="flex flex-col space-y-4 sm:space-y-6 font-mono text-lg sm:text-xl md:text-2xl">
              {options.map((opt, i) => (
                <motion.div
                  key={i}
                  animate={i === selectedIndex ? { scale: 1.1, color: "#f97316" } : { scale: 1, color: "#9ca3af" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3 cursor-pointer"
                  onMouseEnter={() => setSelectedIndex(i)}
                  onClick={() => {
                    setActivePage(opt);
                    setPhase("viewing");
                  }}
                >
                  <span className="w-4 text-orange-400 select-none">{i === selectedIndex ? ">" : ""}</span>
                  <span
                    className={`transition ${
                      i === selectedIndex
                        ? "text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.9)]"
                        : "text-gray-400"
                    }`}
                  >
                    {opt}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-sm mt-12">
              Use ↑ ↓ arrow keys or mouse to navigate, Enter / click to select
            </p>
          </motion.div>
        )}

        {phase === "viewing" && activePage === "Professional Distinctions" && (
          <ProfessionalDistinctions onBack={handleBack} />
        )}
        {phase === "viewing" && activePage === "Online Courses" && (
          <OnlineCourses onBack={handleBack} />
        )}
        {phase === "viewing" && activePage === "Multicultural Activities" && (
          <MulticulturalActivities onBack={handleBack} />
        )}
      </AnimatePresence>
    </div>
  );
}
