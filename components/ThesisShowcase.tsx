"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ThesisShowcase() {
  const techStack = [
    "ESP32-S3",
    "ADS1298",
    "Python",
    "PyTorch",
    "TensorFlow",
    "CNNs",
    "LSTMs",
    "PhysioNet Apnea-ECG",
    "GRU",
  ];

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start gap-12">
      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg border border-orange-400/30"
      >
        <Image
          src="/thesis.png"
          alt="Thesis"
          width={800}
          height={500}
          className="rounded-2xl object-contain"
        />
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-400 mb-6 drop-shadow-lg leading-snug">
          Design and Development of a Smart IoT-Based Device to Detect Abnormal Myocardial Activities
        </h2>
        <p className="text-gray-300 leading-relaxed mb-6 text-justify">
          This thesis presents a smart IoT system for real-time detection of{" "}
          <span className="text-orange-300 font-semibold">myocardial infarction (MI)</span> and{" "}
          <span className="text-orange-300 font-semibold">sleep apnea</span> using ECG signals.  
          Leveraging deep learning models trained on large clinical datasets (PTB-XL, PhysioNet Apnea-ECG), 
          the system demonstrates accurate, accessible, and affordable diagnostics.  
          Hardware integration with an <span className="text-orange-300">ESP32-S3</span> and{" "}
          <span className="text-orange-300">ADS1298</span> enables portable ECG acquisition.
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-3 mb-6">
          {techStack.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/30 
                        text-orange-300 text-sm font-semibold shadow-sm hover:bg-orange-400/20 
                        transition cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* BUTTON */}
        <a
          href="https://drive.google.com/file/d/1-VrgeTyTUKAwt_bcWMpP_QMh3YBV8vHo/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-lg bg-orange-400/20 border border-orange-400/40 
                     text-orange-300 font-semibold hover:bg-orange-400/30 transition"
        >
          📄 Read Full Thesis
        </a>
      </motion.div>
    </section>
  );
}
