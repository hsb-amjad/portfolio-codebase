"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lottie from "lottie-react";

// ✅ Static imports for Lottie files
import robotAnim from "@/public/robot.json";
import aiAnim from "@/public/ml-ai.json";
import spaceAnim from "@/public/space.json";
import iotAnim from "@/public/iot.json";
import medtechAnim from "@/public/medtech.json";
import mlopsAnim from "@/public/mlops.json";
import researchAnim from "@/public/research.json";
import competitionAnim from "@/public/competition.json";

export default function DecodeMe() {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const educationRef = useRef<HTMLDivElement | null>(null);
  const interestsRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  // ✅ Memoize refs
  const sectionRefs = useMemo(
    () => [profileRef, educationRef, interestsRef, skillsRef],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [atPageEnd, setAtPageEnd] = useState(false);

  // Detect current section
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.forEach((ref, i) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) setCurrentIndex(i);
          },
          { threshold: 0.2 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionRefs]);

  // Detect if at bottom
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

  // Scroll behavior
  const scrollToNext = () => {
    if (currentIndex === sectionRefs.length - 1) {
      if (atPageEnd) {
        sectionRefs[0]?.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      }
    } else {
      const nextRef = sectionRefs[currentIndex + 1];
      if (nextRef?.current) {
        nextRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />

      {/* HEADING + PROFILE + INTRO */}
      <section
        ref={profileRef}
        className="flex flex-col lg:flex-row items-center justify-center gap-12 px-6 min-h-screen max-w-6xl mx-auto relative"
      >
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute top-12 text-4xl md:text-6xl font-extrabold text-orange-400 tracking-wide drop-shadow-lg text-center"
        >
          DECODE ME
        </motion.h1>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 mt-24 lg:mt-0"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="rounded-2xl object-cover border-4 border-orange-500 shadow-xl"
          />
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-orange-300"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl text-lg leading-relaxed text-gray-200 space-y-6 text-justify"
        >
          <p>
            I’m <span className="text-orange-400 font-semibold">Haseeb Amjad</span>, a Machine Learning Engineer and Mechatronics mind who builds bridges between algorithms and machines. My world swings between writing neural networks that learn from multispectral data, to crafting robots that roll and fly. I’m not just a coder who trains models; I’m an engineer who deploys them, scales them, and tests them in the real world. My journey started with mechatronics at NUST, but curiosity pushed me deeper, from robotics competitions where sparks literally flew, to research labs where I fused IoT devices with Artificial Intelligence. Along the way, I’ve published papers, won prizes, and turned messy data into systems that actually solve problems.
          </p>
          <p>
            Skills? Think Python, PyTorch, MLflow, Docker, LangChain, and beyond, stitched together with a bit of chaos and a lot of discipline. Achievements? From winning national robotics contests to pushing research into peer-review, I carry both the builder’s grease and the researcher’s ink. Decode me, and you’ll find someone who thrives at the intersection of software, hardware, and imagination.
          </p>
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section
        ref={educationRef}
        className="py-20 px-6 max-w-5xl mx-auto min-h-screen"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-orange-400 mb-16 text-center tracking-wider"
        >
          EDUCATION
        </motion.h2>

        <div className="space-y-12">
          {[
            {
              img: "/nust.png",
              alt: "NUST",
              title: "National University of Sciences and Technology (NUST)",
              loc: "Islamabad, Pakistan",
              desc: "B.E. Mechatronics Engineering | CGPA: 3.39/4.0",
            },
            {
              img: "/fccu.png",
              alt: "FCCU",
              title: "Forman Christian College University (FCCU)",
              loc: "Lahore, Pakistan",
              desc: "Higher Secondary School Certificate | Pre-Engineering | Grade: 80%",
            },
            {
              img: "/allied.png",
              alt: "Allied School",
              title: "Allied School",
              loc: "Lahore, Pakistan",
              desc: "Secondary School Certificate | Sciences Group, Computer | Grade: 92%",
            },
          ].map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              className="relative flex items-center gap-6 bg-white/5 rounded-2xl p-6 shadow-lg border border-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/20 transition group"
            >
              <div className="relative flex-shrink-0 w-20 h-20 flex items-center justify-center border-2 border-orange-400 rounded-lg bg-black/60 p-1">
                <Image
                  src={edu.img}
                  alt={edu.alt}
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-300">
                  {edu.title}
                </h3>
                <p className="text-gray-300">{edu.loc}</p>
                <p className="text-gray-400 italic">{edu.desc}</p>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTERESTS */}
      <section
        ref={interestsRef}
        className="py-20 px-6 max-w-6xl mx-auto relative min-h-screen"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-orange-400 mb-16 text-center tracking-wider"
        >
          INTERESTS
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Robotics", anim: robotAnim, desc: "Building robots that roll, fly, and think." },
            { title: "Artificial Intelligence", anim: aiAnim, desc: "Designing neural networks that learn & adapt." },
            { title: "Space Tech", anim: spaceAnim, desc: "Exploring algorithms for beyond Earth." },
            { title: "IoT Systems", anim: iotAnim, desc: "Fusing hardware with AI-driven intelligence." },
            { title: "MedTech", anim: medtechAnim, desc: "Smart devices for healthcare & diagnosis." },
            { title: "MLOps", anim: mlopsAnim, desc: "Deploying and scaling ML in the real world." },
            { title: "Research", anim: researchAnim, desc: "Publishing papers & pushing boundaries." },
            { title: "Competitions", anim: competitionAnim, desc: "Winning robotics & AI challenges." },
          ].map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              className="relative group bg-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg border border-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/20 transition"
            >
              <div className="w-24 h-24 mb-4">
                <Lottie animationData={interest.anim} loop={true} />
              </div>
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                {interest.title}
              </h3>
              <p className="text-gray-400 text-sm">{interest.desc}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section
        ref={skillsRef}
        className="py-20 px-6 max-w-6xl mx-auto relative min-h-screen"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-orange-400 mb-16 text-center tracking-wider"
        >
          SKILLS
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            "Python", "Machine Learning", "Deep Learning", "Data Engineering", "Image Processing", "OpenCV",
            "Scikit-Learn", "PyTorch", "TerraTorch", "TorchServe", "TensorFlow", "MLflow", "FastAPI", "Docker",
            "Postman", "GitLab", "MongoDB", "Slack", "PostgreSQL", "SQLite", "LangChain", "LangGraph",
            "Whisper (STT)", "ElevenLabs (TTS)", "HuggingFace", "Agentic RAG", "OpenAI Embeddings",
            "Arduino", "Matlab",
          ].map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
              whileHover={{
                opacity: 1,
                scale: 1.15,
                textShadow: `
                  0 0 10px rgba(255, 165, 0, 0.9),
                  0 0 20px rgba(255, 140, 0, 0.8),
                  0 0 40px rgba(255, 100, 0, 0.7)
                `,
              }}
              className="cursor-pointer text-gray-400 text-lg font-semibold relative transition duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </section>

      {/* GLOBAL SCROLL INDICATOR */}
      <motion.div
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          y: [0, 6, 0],
          boxShadow: [
            "0 0 6px rgba(251,146,60,0.4)",
            "0 0 12px rgba(251,146,60,0.7)",
            "0 0 6px rgba(251,146,60,0.4)",
          ],
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                  w-10 h-10 rounded-full border border-orange-400/40 
                  bg-orange-400/10 shadow-md cursor-pointer"
      >
        <span
          className="relative -translate-y-0.5 text-orange-400 text-lg font-bold drop-shadow-[0_0_6px_rgba(251,146,60,0.9)] leading-none select-none pointer-events-none"
        >
          {currentIndex === sectionRefs.length - 1 && atPageEnd ? "↑" : "↓"}
        </span>

      </motion.div>
    </div>
  );
}
