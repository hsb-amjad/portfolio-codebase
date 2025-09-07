"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function OnlineCourses({ onBack }: { onBack: () => void }) {
  const enrolled = [
    "Fundamentals of AI Agents using RAG and LangChain - IBM",
    "Introduction to Computer Vision and Image Processing - IBM",
    "Advanced Computer Vision with TensorFlow - DeepLearning.AI",
  ];

  const completed = [
    "Generative AI with Large Language Models - DeepLearning.AI and Amazon Web Services",
    "Complete A.I. and Machine Learning, Data Science Bootcamp - Andrei Neagoie, Daniel Bourke (Zero to Mastery Udemy)",
    "Advanced Learning Algorithms - DeepLearning.AI and Stanford | Online",
    "Python Projects (Data Engineering) - Great Learning Academy",
    "Supervised Machine Learning: Regression and Classification - DeepLearning.AI and Stanford | Online",
    "Python and Pandas for Data Engineering - Duke University",
    "Crash Course on Python - Google IT and Automation",
  ];

  return (
    <div className="relative min-h-screen w-full bg-black text-green-200 font-mono px-6 py-12 overflow-y-auto">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.05),transparent_70%)] pointer-events-none" />

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
        ► ONLINE COURSES
      </motion.h1>

      {/* Enrolled */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl font-bold text-green-300 mb-6"
      >
        Currently Enrolled:
      </motion.h2>
      <div className="space-y-6 mb-12">
        {enrolled.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * i }}
            className="flex items-start space-x-3 bg-green-900/10 border border-green-500/30 px-4 py-3 rounded-md hover:bg-green-900/20 transition"
          >
            <span className="text-green-400">›</span>
            <p className="text-green-200 leading-relaxed">{course}</p>
          </motion.div>
        ))}
      </div>

      {/* Completed */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl md:text-2xl font-bold text-green-300 mb-6"
      >
        Completed:
      </motion.h2>
      <div className="space-y-6">
        {completed.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i }}
            className="flex items-start space-x-3 bg-green-900/5 border border-green-500/20 px-4 py-3 rounded-md hover:bg-green-900/15 transition"
          >
            <span className="text-green-400">›</span>
            <p className="text-green-200 leading-relaxed">{course}</p>
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
