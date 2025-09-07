"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function MulticulturalActivities({ onBack }: { onBack: () => void }) {
  const activities = [
    {
      date: "21/01/2025",
      title: "WOMEN IN STEM COMMUNITY OUTREACH",
      desc: "Led a Women in STEM community outreach project funded by Global UGRAD Pakistan, engaging students through hands-on STEM activities and motivational sessions.",
    },
    {
      date: "07/2024 – 10/2024",
      title: "YOUTH 4 COP (VOICES TO IGNITE CLIMATE ACTION)",
      desc: "I participated in the Youth 4 Cop training program, focusing on youth leadership and understanding UNFCCC processes.",
    },
    {
      date: "08/2023 – 11/2023",
      title: "MILLENNIUM FELLOWSHIP",
      desc: "Selected as a Class of 2023 Millennium Fellow, joining 4,000+ peers from 260+ campuses worldwide, committed to sustainable societal impact.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-green-200 font-mono px-6 py-16 overflow-y-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.04),transparent_75%)] pointer-events-none" />

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
        ► MULTICULTURAL ACTIVITIES
      </motion.h1>

      {/* Activities */}
      <div className="max-w-4xl mx-auto space-y-8">
        {activities.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.6 }}
            className="bg-green-900/5 border border-green-500/30 rounded-lg px-5 py-4 shadow-inner hover:bg-green-900/10 transition"
          >
            <p className="text-green-400 text-sm mb-2">$ log [{item.date}]</p>
            <p className="text-green-300 font-bold mb-2">➤ {item.title}</p>
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
