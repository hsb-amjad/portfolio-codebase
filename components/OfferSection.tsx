"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Bot,
  Database,
  Boxes,
  Server,
  Globe,
  Cpu,
  Cog,
  Activity,
  PenTool,
} from "lucide-react";

const services = [
  {
    title: "Custom Machine Learning & Deep Learning Models",
    icon: <Brain className="w-10 h-10 text-orange-400" />,
    keywords: "Classification · Prediction · Optimization",
  },
  {
    title: "Generative AI Applications & Agentic RAG Chatbots",
    icon: <Bot className="w-10 h-10 text-orange-400" />,
    keywords: "LLMs · RAG · Conversational AI",
  },
  {
    title: "Production-Ready AI Pipelines with Full MLOps",
    icon: <Boxes className="w-10 h-10 text-orange-400" />,
    keywords: "MLflow · Prefect · CI/CD · Docker",
  },
  {
    title: "Automated Data Engineering & Preprocessing Workflows",
    icon: <Database className="w-10 h-10 text-orange-400" />,
    keywords: "ETL · Feature Engineering · Scaling",
  },
  {
    title: "Scalable APIs & Backend Systems (FastAPI, Flask)",
    icon: <Server className="w-10 h-10 text-orange-400" />,
    keywords: "APIs · Deployment · Integration",
  },
  {
    title: "Modern Web Portfolios & Interactive Websites",
    icon: <Globe className="w-10 h-10 text-orange-400" />,
    keywords: "Next.js · Tailwind · Animations",
  },
  {
    title: "Smart IoT Devices & Embedded Systems (Arduino, ESP32)",
    icon: <Cpu className="w-10 h-10 text-orange-400" />,
    keywords: "Sensors · Firmware · Connectivity",
  },
  {
    title: "Robotics Systems with Control & 3D Simulation",
    icon: <Cog className="w-10 h-10 text-orange-400" />,
    keywords: "Path Planning · ROS · Simulation",
  },
  {
    title: "AI-Powered Healthcare & MedTech Solutions",
    icon: <Activity className="w-10 h-10 text-orange-400" />,
    keywords: "ECG · Diagnostics · Monitoring",
  },
  {
    title: "Research Publications, Technical Reports & Mentorship",
    icon: <PenTool className="w-10 h-10 text-orange-400" />,
    keywords: "Writing · Papers · Supervision",
  },
];

export default function OfferSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-30% 0px", // show indicator only when ~70% of section is visible
  });

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-black px-6 py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_70%)]" />

      {/* Stack of cards */}
      <div className="flex flex-col gap-8 w-full max-w-4xl relative z-10">
        {services.map((srv, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
              boxShadow: "0px 0px 30px rgba(249,115,22,0.5)",
            }}
            className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-orange-400/20 backdrop-blur-md shadow-lg transition-transform"
          >
            <div className="flex-shrink-0">{srv.icon}</div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-orange-300">
                {srv.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{srv.keywords}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 Scroll Indicator (only when OfferSection is in view) */}
{isInView && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{
      opacity: [0.6, 1, 0.6],
      y: [0, 6, 0],
      boxShadow: [
        "0 0 6px rgba(251,146,60,0.4)",
        "0 0 16px rgba(251,146,60,0.8)",
        "0 0 6px rgba(251,146,60,0.4)",
      ],
    }}
    transition={{ duration: 2, repeat: Infinity }}
    className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
              w-10 h-10 rounded-full border border-orange-400/40 
              bg-orange-400/10 cursor-pointer"
    onClick={() => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }}
  >
    <span
      className="relative -translate-y-0.5 text-orange-400 text-lg font-bold 
                 drop-shadow-[0_0_6px_rgba(251,146,60,0.9)] leading-none 
                 select-none pointer-events-none"
    >
      ↓
    </span>
  </motion.div>
)}
    </div>
  );
}
