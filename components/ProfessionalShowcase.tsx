"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Indigenous Path Planning Robot with Pick-and-Place Mechanism",
    desc: "Designed an autonomous robot with custom PCB H-Bridge motor driver, SolidWorks CAD base, integrated sensors & microcontroller, and Arduino programming.",
    image: "/path-planning.jpg",
  },
  {
    title: "AI-Powered Healthcare Translator Web App",
    desc: "Built a web-based healthcare translator with Next.js, LangChain, Whisper, and ElevenLabs for real-time multilingual speech-to-speech medical translation.",
    image: "/translator.png",
  },
  {
    title: "Self-Improving AI System Orchestration Pipeline",
    desc: "Developed an ML orchestration pipeline using Prefect with auto-retraining, drift detection, and MLflow tracking.",
  },
  {
    title: "Transformer-Based Object Detection and Segmentation",
    desc: "Implemented transformer architectures for object detection and image segmentation tasks with strong generalization.",
    image: "/transformer.png",
  },
  {
    title: "Custom YOLOv12 Head Training for OBB Task",
    desc: "Trained custom YOLOv12 heads for oriented bounding box (OBB) detection on specialized datasets.",
  },
  {
    title: "End-To-End Model Evaluation Pipelines",
    desc: "Built evaluation pipelines for OBB, classification, and segmentation, integrated with Slack and MLflow.",
  },
  {
    title: "Unit and Integration Tests for Python Classes",
    desc: "Wrote unit/integration test suites for critical Python classes ensuring robustness and coverage.",
  },
  {
    title: "Fine-Tuning Pre-Trained Models",
    desc: "Optimized transfer learning pipelines with regularization and augmentation for better generalization.",
  },
  {
    title: "Waste Classification using CNNs",
    desc: "Developed CNN models to classify waste types for smart recycling applications.",
  },
  {
    title: "Multivariable Regression for Housing Prices",
    desc: "Implemented regression models with multiple features to predict housing prices with strong accuracy.",
  },
];

export default function ProfessionalShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start gap-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {projects.map((proj, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="border border-orange-400/30 rounded-xl bg-black/40 shadow-md mb-4 overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="text-lg font-semibold text-orange-300">
                  {proj.title}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-orange-300" />
                </motion.div>
              </button>

              {/* Content with AnimatePresence */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-5 overflow-hidden"
                  >
                    {proj.image ? (
                      <div className="flex flex-col md:flex-row items-start gap-6 pb-4 text-gray-300 text-justify">
                        {/* IMAGE */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                          className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg border border-orange-400/30"
                        >
                          <Image
                            src={proj.image}
                            alt={proj.title}
                            width={800}
                            height={500}
                            className="rounded-2xl object-contain"
                          />
                        </motion.div>

                        {/* TEXT */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6 }}
                          className="w-full md:w-1/2"
                        >
                          {proj.desc}
                        </motion.div>
                      </div>
                    ) : (
                      <div className="pb-4 text-gray-300 text-justify">
                        {proj.desc}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
