"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function ProfessionalDistinctions({ onBack }: { onBack: () => void }) {
  const distinctions = [
    {
      date: "09/09/2024",
      title: "RUNNERS UP AT ZINDIGI PRIZE STARTUP PITCH COMPETITION",
      desc: "I was the runner-up in Zindigi Prize Startup Pitch Competition, a large scale social entrepreneurship program in Pakistan, where I presented the compelling MedTech idea to provide AI based medical solutions.",
    },
    {
      date: "13/07/2024",
      title: "WINNER OF NATIONAL ENGINEERING ROBOTICS CONTEST'24 (NERC)",
      desc: "Led my team to 1st place out of 22 teams in Pakistan’s biggest robotics competition by designing an indigenous path-planning robot with a pick-and-place mechanism, featuring IR sensors, a QTR array, and Arduino-controlled motors for autonomous navigation.",
    },
    {
      date: "26/09/2023",
      title: "MERIT CERTIFICATE",
      desc: "I have been awarded with merit certificate for securing 4.0/4.0 SGPA in two regular consecutive semesters.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-green-200 font-mono px-6 py-12 overflow-y-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.07),transparent_70%)] pointer-events-none" />

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 p-2 rounded-full bg-green-900/30 border border-green-500/40 text-green-300 hover:bg-green-900/50 transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold text-center mb-12 drop-shadow-[0_0_8px_rgba(34,197,94,0.9)]"
      >
        ► PROFESSIONAL DISTINCTIONS
      </motion.h1>

      {/* Distinctions */}
      <div className="space-y-12 max-w-4xl mx-auto">
        {distinctions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
            className="border-t border-green-500/40 pt-6"
          >
            <p className="text-sm text-green-400 mb-2">{item.date}</p>
            <h2 className="text-xl md:text-2xl font-bold text-green-300 mb-4">
              {item.title}
            </h2>
            <p className="text-green-200 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-green-500 text-sm mt-16 opacity-70">
        Press ESC or use the arrow button to return to THE VAULT
      </p>
    </div>
  );
}
