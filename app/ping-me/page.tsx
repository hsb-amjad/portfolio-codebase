"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import OfferSection from "@/components/OfferSection"; // ✅ Import Offer Section
import ImmediateReachOut from "@/components/ImmediateReachOut"; // ✅ Import Contact Section

export default function PingMe() {
  const [phase, setPhase] = useState<"intro" | "main">("intro");

  // Refs for scrolling
  const offerRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("main"), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToOffer = () => {
    offerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ========= SCREEN 1 ========= */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1),transparent_70%)]" />

        {/* INTRO */}
        <AnimatePresence>
          {phase === "intro" && (
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute z-20 text-4xl sm:text-5xl md:text-8xl font-extrabold text-orange-400 
             drop-shadow-[0_0_16px_rgba(249,115,22,0.7)] whitespace-nowrap text-center"
            >
              {Array.from("AT YOUR SERVICE").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* MAIN RADAR HUB */}
        <AnimatePresence>
          {phase === "main" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center justify-center"
            >
              {/* Ripples */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border border-orange-400/30"
                animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-96 h-96 rounded-full border border-orange-400/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-[32rem] h-[32rem] rounded-full border border-orange-400/10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 text-5xl md:text-7xl font-extrabold text-orange-400 drop-shadow-lg"
              >
                PING ME
              </motion.h1>

              {/* Icons */}
              <div className="absolute w-[16rem] sm:w-[20rem] md:w-[22rem] 
                h-[16rem] sm:h-[20rem] md:h-[22rem] 
                rounded-full flex items-center justify-center">
                <motion.a
                  href="mailto:haseebamjad447@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -top-6 p-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-300 hover:bg-orange-400/30 transition"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Mail className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/hsb-amjad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -right-6 p-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-300 hover:bg-orange-400/30 transition"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="https://github.com/hsb-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -bottom-6 p-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-300 hover:bg-orange-400/30 transition"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="https://wa.me/923398899333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -left-6 p-3 rounded-full bg-orange-400/20 border border-orange-400/40 text-orange-300 hover:bg-orange-400/30 transition"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        {phase === "main" && (
          <div className="absolute bottom-6 right-6 flex flex-col gap-4">
            {/* WHAT I OFFER */}
            <motion.button
              onClick={scrollToOffer}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(249,115,22,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-400/40 text-orange-300 font-semibold shadow-md cursor-pointer backdrop-blur-md hover:bg-orange-500/20 text-center"
            >
              WHAT I HAVE FOR YOU
            </motion.button>

            {/* IMMEDIATE CONTACT CARD */}
            <motion.button
              onClick={scrollToContact}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(249,115,22,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-400/40 text-orange-300 font-semibold shadow-md cursor-pointer backdrop-blur-md hover:bg-orange-500/20 text-center"
            >
              IMMEDIATE REACH-OUT
            </motion.button>
          </div>
        )}
      </div>

      {/* ========= SCREEN 2 (Offer Section) ========= */}
      <div ref={offerRef}>
        <OfferSection />
      </div>

      {/* ========= SCREEN 3 (Contact Section) ========= */}
      <div ref={contactRef}>
        <ImmediateReachOut />
      </div>
    </div>
  );
}
