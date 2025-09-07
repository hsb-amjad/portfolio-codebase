"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Nunito } from "next/font/google";
import RobotModel from "@/components/RobotModel";
import NeuralBackground from "@/components/NeuralBackground"; // ✅ new
import { Languages } from "lucide-react"; // instead of Menu
import DownloadButtons from "@/components/DownloadButtons";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const roles = [
  "SOFTWARE",
  "ALGORITHM",
  "MACHINE LEARNING",
  "ARTIFICIAL INTELLIGENCE",
  "MECHATRONICS ENGINEER",
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    { name: "English", detail: "IELTS 6.5 – B2" },
    { name: "Urdu", detail: "Native" },
    { name: "Punjabi", detail: "Fluent" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roles.length);
    }, 1500); // faster switching
    return () => clearInterval(interval);
  }, []);

  const animateWord = (word: string, delayOffset: number) => {
    return word.split("").map((char, idx) => (
      <motion.span
        key={idx}
        animate={{ color: "#f97316" }}
        transition={{
          delay: delayOffset + idx * 0.08, // faster
          duration: 0.25, // snappier
          ease: "easeOut",
        }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <main
      className={`relative min-h-screen bg-gradient-to-br from-[#1c1917] via-[#111827] to-black text-white overflow-hidden ${nunito.className}`}
    >
      <style jsx>{`
        .blink-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to {
            visibility: hidden;
          }
        }
      `}</style>

{/* Top Bar */}
<div className="absolute top-0 left-0 w-full bg-white/5 backdrop-blur-md z-30 px-8 py-4 shadow-sm">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
    <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-center md:text-left">
      HASEEB <span className="text-orange-500">AMJAD</span>
    </h1>

    {/* 🔥 Right Side Buttons */}
    <div className="flex justify-center md:justify-end gap-4 w-full md:w-auto">
      <DownloadButtons />

      <div className="relative">
        <button
          onClick={() => setShowLanguages((prev) => !prev)}
          className="p-3 bg-orange-500 rounded-full shadow-md hover:bg-orange-600 transition flex justify-center"
        >
          <Languages className="w-6 h-6 text-white" />
        </button>

        {/* Floating Cards */}
        <AnimatePresence mode="wait">
          {showLanguages && (
            <div className="absolute top-14 right-0 flex gap-3">
              {languages.map((lang, i) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg px-5 py-3 
                             border border-orange-400/40 hover:border-orange-400 hover:shadow-orange-500/40 
                             flex flex-col items-center text-center"
                >
                  <span className="font-bold text-orange-300">{lang.name}</span>
                  <span className="font-bold text-white/70 text-sm">{lang.detail}</span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </div>
</div>

      {/* Hero Layout – 3 Columns */}
<div className="flex flex-col md:flex-row gap-6 p-6 md:p-12 relative z-20 mt-28 md:mt-24">
  {/* Left – Cards */}
  <div className="flex flex-col gap-3 items-start ml-4 mt-[1px] w-full md:w-auto">
    {roles.map((role, i) => (
      <div
        key={i}
        className="bg-white/5 rounded-xl w-full md:w-56 h-16 md:h-20 flex items-center justify-center shadow-md text-center backdrop-blur"
      >
        <h1 className="relative text-sm md:text-lg font-semibold tracking-wide whitespace-pre-line">
          <span className="relative flex flex-col items-center whitespace-pre-line text-center">
            {role.split(" ").map((word, wIdx) => (
              <div key={wIdx} className="flex justify-center">
                {word.split("").map((char, idx) => (
                  <motion.span
  key={idx}
  initial={{ opacity: 0 }}
  animate={
    role === "MECHATRONICS ENGINEER"
      ? { opacity: 1, color: "#f97316" } // always visible + orange
      : i === activeIndex
      ? { opacity: 1, color: "#f97316" } // active word → orange
      : { opacity: 0 } // hidden otherwise
  }
  transition={{
    delay:
      role === "MECHATRONICS ENGINEER"
        ? idx * 0.05 // 👈 still letter-by-letter
        : i === activeIndex
        ? (wIdx * 10 + idx) * 0.03
        : 0,
    duration: 0.25,
    ease: "easeOut",
  }}
  style={{
    fontWeight: role === "MECHATRONICS ENGINEER" ? "bold" : "normal",
  }}
  className="whitespace-pre"
>
  {char}
</motion.span>
                ))}
              </div>
            ))}

            {/* subtle ghost layer only for others */}
            {role !== "MECHATRONICS ENGINEER" && (
              <span className="absolute inset-0 text-orange-400 opacity-20 select-none whitespace-pre-line text-center">
                {role}
              </span>
            )}
          </span>
        </h1>
      </div>
    ))}
  </div>

        {/* Middle – Intro + Robot */}
        <div className="flex flex-col gap-3 w-full md:w-auto">
          {/* Intro Block */}
          <div className="bg-white/5 rounded-xl p-6 flex flex-col justify-center shadow-md w-full md:w-[460px] min-h-[80px] md:h-20 backdrop-blur">
            {!done ? (
              <TypeAnimation
                sequence={[
                  "",
                  1000,
                  "I CODE BRAINS",
                  1200,
                  "I CODE BRAINS FOR MACHINES",
                  1600,
                  "I CODE BRAINS FOR MACHINES AND DESIGN MACHINES",
                  1200,
                  "I CODE BRAINS FOR MACHINES AND DESIGN MACHINES FOR BRAINS.",
                  () => setDone(true),
                ]}
                wrapper="p"
                cursor={true}
                repeat={0}
                style={{ display: "inline-block" }}
                className="text-orange-300 text-sm md:text-lg uppercase text-center tracking-tight"
              />
            ) : (
              <p className="text-sm md:text-lg uppercase text-center tracking-tight text-orange-300">
                I {animateWord("CODE", 0.5)} BRAINS FOR MACHINES AND{" "}
                {animateWord("DESIGN", 1.5)} MACHINES FOR BRAINS.
                <span className="blink-cursor text-orange-300">|</span>
              </p>
            )}
          </div>

          {/* Robot Card */}
          <div className="bg-white/5 rounded-xl p-2 shadow-md w-full md:w-[460px] h-[220px] md:h-[355px] backdrop-blur relative overflow-hidden">
            <RobotModel />
          </div>
        </div>

        {/* 🔥 NEW COLUMN with 2 CARDS */}
        <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto justify-center">
          {/* First card */}
          <motion.a
            href="/decode-me"
            whileHover={{
              scale: 1.0,
              rotate: -0.5,
              boxShadow: "0px 0px 10px rgba(251, 146, 60, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="bg-white/5 rounded-xl shadow-md backdrop-blur flex-1 md:w-[185px] h-[150px] md:h-[175px] flex items-center justify-center cursor-pointer"
          >
            <motion.p
              animate={{
                opacity: [1, 0.7, 1, 0.3, 1],
                textShadow: [
                  "0px 0px 0px #f97316",
                  "0px 0px 6px #f97316",
                  "0px 0px 12px #fb923c",
                  "0px 0px 4px #f97316",
                  "0px 0px 0px #f97316",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-orange-300 font-semibold text-sm md:text-lg tracking-wide select-none"
            >
              DECODE ME
            </motion.p>
          </motion.a>

          {/* Second card */}
          <motion.a
            href="/ping-me"
            whileHover={{
              scale: 1.0,
              rotate: -0.5,
              boxShadow: "0px 0px 10px rgba(251, 146, 60, 0.4)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="relative bg-white/5 rounded-xl shadow-md backdrop-blur flex-1 md:w-[185px] h-[150px] md:flex-1 flex items-center justify-center cursor-pointer"
          >
            <motion.span
              className="absolute w-24 h-24 rounded-full border-2 border-orange-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute w-24 h-24 rounded-full border-2 border-orange-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.5, 0], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
            />
            <motion.p
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.9, 1, 0.9],
                textShadow: [
                  "0px 0px 6px #f97316",
                  "0px 0px 14px #fb923c",
                  "0px 0px 6px #f97316",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-orange-400 font-bold text-sm md:text-lg tracking-wide select-none relative z-10"
            >
              PING ME
            </motion.p>
          </motion.a>
        </div>

        {/* Right – Big Neural Card */}
        <div className="flex-1 flex justify-end mr-4">
          <div className="relative bg-white/5 rounded-xl shadow-md backdrop-blur w-full md:w-[460px] h-auto md:h-[447.5px] overflow-hidden flex flex-col items-center justify-center gap-4 p-6">
            <NeuralBackground />

            {/* Mini-Cards */}
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              className="relative z-10 bg-white/5 rounded-lg px-6 py-4 w-full text-center shadow-md hover:shadow-orange-500/30 transition backdrop-blur cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <span className="text-orange-300 font-bold text-lg">MY LAB</span>
                <span className="text-sm text-white/40">PROJECTS</span>
              </div>
            </motion.a>

            <motion.a
              href="/Brainwaves"
              whileHover={{ scale: 1.05 }}
              className="relative z-10 bg-white/5 rounded-lg px-6 py-4 w-full text-center shadow-md hover:shadow-orange-500/30 transition backdrop-blur cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <span className="text-orange-300 font-bold text-lg">BRAINWAVES</span>
                <span className="text-sm text-white/40">RESEARCH & ARTICLES</span>
              </div>
            </motion.a>

            <motion.a
              href="/TheGrind"
              whileHover={{ scale: 1.05 }}
              className="relative z-10 bg-white/5 rounded-lg px-6 py-4 w-full text-center shadow-md hover:shadow-orange-500/30 transition backdrop-blur cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <span className="text-orange-300 font-bold text-lg">THE GRIND</span>
                <span className="text-sm text-white/40">EXPERIENCE</span>
              </div>
            </motion.a>

            <motion.a
              href="/distinctions"
              whileHover={{ scale: 1.05 }}
              className="relative z-10 bg-white/5 rounded-lg px-6 py-4 w-full text-center shadow-md hover:shadow-orange-500/30 transition backdrop-blur cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <span className="text-orange-300 font-bold text-lg">THE VAULT</span>
                <span className="text-sm text-white/40">DISTINCTIONS</span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </main>
  );
}
