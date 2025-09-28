"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const categories = ["WORK", "INTERNSHIPS", "LEADERSHIP"];

export default function TheGrind() {
  const workRef = useRef<HTMLDivElement | null>(null);
  const internshipsRef = useRef<HTMLDivElement | null>(null);
  const leadershipRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = [workRef, internshipsRef, leadershipRef];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [atPageEnd, setAtPageEnd] = useState(false);

  // Detect current section in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.forEach((ref, i) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setCurrentIndex(i);
            }
          },
          { threshold: 0.05 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionRefs]);

  // Detect bottom of page
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

  // Scroll logic
const scrollToNext = () => {
  if (currentIndex === sectionRefs.length - 1) {
    if (!atPageEnd) {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
      setCurrentIndex(sectionRefs.length - 1); // ✅ force sync
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentIndex(0); // ✅ reset to top
    }
  } else {
    const nextIndex = currentIndex + 1;
    const nextRef = sectionRefs[nextIndex];
    if (nextRef?.current) {
      nextRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentIndex(nextIndex); // ✅ update immediately
    }
  }
};

  // Jump via tabs
  const scrollToRef = (index: number) => {
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const work = {
    company: "Cowlar Design Studio",
    role: "Software Algorithm Machine Learning and AI (SAMA) Engineer",
    period: "June 2025 – Current",
    desc: "Research, design, and develop next-gen AI/IoT and software solutions with focus on security, scalability, and real-world deployment.",
    logo: "/cowlar.png",
  };

  const internships = [
    {
      company: "Spatial Stack",
      role: "Geo-AI Intern",
      period: "Feb 2025 – June 2025",
      desc: "Built deep learning pipelines for object detection and segmentation on aerial imagery, with GIS-driven urban and environmental analysis.",
      logo: "/spatialstack.png",
    },
    {
      company: "National Centre of Robotics & Automation (NCRA)",
      role: "ML Engineer Intern",
      period: "June 2024 – Aug 2024",
      desc: "Developed biomedical AI models for skin lesion segmentation and cancer diagnostics using computer vision and deep learning.",
      logo: "/ncra.png",
    },
  ];

  const leadership = [
    {
      org: "Eminent Aeromodelling Club",
      role: "Vice President",
      period: "Dec 2024 – Apr 2025",
      desc: "Supervised club operations, managed 50+ members, oversaw workshops, and provided strategic direction for drone and aircraft projects aligned with emerging technologies.",
      logo: "/eamc.png",
    },
    {
      org: "Robotics & Automation Club (RAC), NUST",
      role: "Technical Workshops Supervisor",
      period: "June 2024 – Apr 2025",
      desc: "Planned and executed technical workshops in AI/ML, UAVs, and biomedical robotics. Mentored domain leads and ensured engaging sessions.",
      logo: "/rac.png",
    },
    {
      org: "Robotics & Automation Club (RAC), NUST",
      role: "Team Lead Artificial Intelligence",
      period: "Sep 2023 – June 2024",
      desc: "Conducted ML sessions and led biomedical AI projects including plant disease classification and ECG analysis.",
      logo: "/rac.png",
    },
    {
      org: "Human Alliance Organization (HAO)",
      role: "Community Engagement Manager",
      period: "June 2023 – Oct 2024",
      desc: "Led outreach, fostered partnerships, and implemented engagement strategies for community initiatives.",
      logo: "/hao.png",
    },
    {
      org: "Robotics & Automation Club (RAC), NUST",
      role: "Sponsorship Manager",
      period: "Mar 2022 – June 2023",
      desc: "Secured sponsorships, negotiated agreements, and ensured value delivery for partner organizations.",
      logo: "/rac.png",
    },
    {
      org: "Formanites Mathematics Society (FMS), FCCU",
      role: "Director of Logistics",
      period: "Feb 2019 – Aug 2021",
      desc: "Coordinated operations, optimized processes, and ensured smooth execution of society events.",
      logo: "/fms.png",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-black opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_70%)]" />

      {/* TOP SEGMENTED CONTROL */}
      <div className="sticky top-0 z-50 flex justify-center py-6 bg-black/60 backdrop-blur border-b border-orange-400/10">
        <div className="flex bg-white/5 backdrop-blur rounded-full border border-orange-400/20 shadow-lg overflow-hidden">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => scrollToRef(i)}
              className={`relative px-6 py-3 font-semibold text-sm transition 
                ${currentIndex === i ? "text-black" : "text-orange-300"}`}
            >
              {currentIndex === i && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 bg-orange-400 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section
        ref={workRef}
        className="min-h-screen flex flex-col items-center px-6 relative z-10 pt-32"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-orange-400 mb-16 tracking-wider drop-shadow-lg"
        >
          WORK
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} // ✅ appear earlier
          transition={{ duration: 0.4 }} // ✅ faster
          whileHover={{ scale: 1.03, rotate: -0.5 }}
          className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/30 transition group overflow-hidden max-w-3xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
          <div className="flex items-center gap-6 relative z-10">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="relative w-20 h-20 flex-shrink-0"
            >
              <Image
                src={work.logo}
                alt={work.company}
                fill
                className="rounded-full object-contain border-2 border-orange-400 p-2 bg-black/60"
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-orange-300 mb-1">{work.role}</h3>
              <p className="text-gray-400 italic">{work.company}</p>
              <p className="text-sm text-gray-500">{work.period}</p>
              <p className="text-gray-300 mt-3 leading-relaxed">{work.desc}</p>
            </div>
          </div>
        </motion.div>

      </section>

      {/* INTERNSHIPS */}
      <section
        ref={internshipsRef}
        className="min-h-screen flex flex-col items-center px-6 relative z-10 pt-32"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-orange-400 mb-16 tracking-wider drop-shadow-lg"
        >
          INTERNSHIPS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
          {internships.map((job, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // ✅ earlier
            transition={{ duration: 0.4, delay: i * 0.05 }} // ✅ faster stagger
            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
            className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/30 transition group overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-center gap-6 relative z-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative w-20 h-20 flex-shrink-0"
              >
                <Image
                  src={job.logo}
                  alt={job.company}
                  fill
                  className="rounded-full object-contain border-2 border-orange-400 p-2 bg-black/60"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-orange-300 mb-1">{job.role}</h3>
                <p className="text-gray-400 italic">{job.company}</p>
                <p className="text-sm text-gray-500">{job.period}</p>
                <p className="text-gray-300 mt-3 leading-relaxed">{job.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section
        ref={leadershipRef}
        className="min-h-screen flex flex-col items-center px-6 relative z-10 pt-32 pb-32"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-16 text-center tracking-wider drop-shadow-lg"
        >
          LEADERSHIP & VOLUNTEERING
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          {leadership.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // ✅ appear earlier
            transition={{ duration: 0.4, delay: i * 0.05 }} // ✅ smoother, not too slow
            whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -0.5 : 0.5 }}
            className="relative bg-white/5 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-orange-500/20 hover:border-orange-400 hover:shadow-orange-500/30 transition group overflow-hidden"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition" />
            <div className="flex items-center gap-5 relative z-10">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="relative w-16 h-16 flex-shrink-0"
              >
                <Image
                  src={item.logo}
                  alt={item.org}
                  fill
                  className="rounded-full object-contain border-2 border-orange-400 p-2 bg-black/60"
                />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-orange-300">{item.role}</h3>
                <p className="text-gray-400 italic">{item.org}</p>
                <p className="text-sm text-gray-500">{item.period}</p>
                <p className="text-gray-300 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </section>

      {/* GLOBAL SCROLL INDICATOR */}
<motion.div
  onClick={scrollToNext}
  initial={{ opacity: 0, y: 10 }}
  animate={{
    opacity: [0.6, 1, 0.6],
    y: [0, 6, 0],
    boxShadow: [
      "0 0 6px rgba(251,146,60,0.4)",
      "0 0 16px rgba(251,146,60,0.7)",
      "0 0 6px rgba(251,146,60,0.4)",
    ],
  }}
  transition={{ duration: 2, repeat: Infinity }}
  className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
             w-10 h-10 rounded-full border border-orange-400/40 
             bg-orange-400/10 shadow-md cursor-pointer"
>
  <span
    className="relative -translate-y-0.5 text-orange-400 text-lg font-bold leading-none 
               drop-shadow-[0_0_6px_rgba(251,146,60,0.9)] select-none pointer-events-none"
  >
    {currentIndex === sectionRefs.length - 1 && atPageEnd ? "↑" : "↓"}
  </span>
</motion.div>

    </div>
  );
}
