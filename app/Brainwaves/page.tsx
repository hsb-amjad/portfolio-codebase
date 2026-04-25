"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Close button icon

export default function Brainwaves() {
  const [activeTab, setActiveTab] = useState<"publications" | "blogs">(
    "publications"
  );
  const [selectedPub, setSelectedPub] = useState<null | typeof publications[0]>(
    null
  );

  const [atPageEnd, setAtPageEnd] = useState(false);

  // Detect if scrolled to bottom
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
  const handleScrollClick = () => {
    if (atPageEnd) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const publications = [
    {
      year: 2026,
      title:
        "Learning Sleep Apnea Patterns from Raw ECG via Convolutional–Recurrent Architectures",
      authors: "Nija Asif, Haseeb Amjad, Ahmad Taqir, Umar Khan, And Hassan Elahi",
      venue: "15th IEEE International Conference on Information & Communication Technology and System (ICTS)",
      link: "https://doi.org/10.1109/ICTS67612.2025.11369676",
      abstract:
        "Sleep apnea is a common but serious and underdiagnosed sleep disorder caused by repeated interruptions in breathing patterns during sleep, posing significant risks to cardiovascular and neurological health. Traditional diagnostic approaches such as polysomnography (PSG) are accurate but expensive, inconvenient, and resource intensive. This research presents a robust, end-to-end deep learning framework for automated diagnosis of sleep apnea using raw single-lead ECG signals. The data has been taken from the PhysioNet Apnea-ECG database. This study proposes a hybrid model architecture that extracts spatial features using Convolutional Neural Networks (CNNs) and Long Short-Term Memory (LSTM) layers for temporal sequence modeling. This approach allows effective capture of both morphological and rhythmic patterns in ECG data. A comprehensive preprocessing pipeline is employed, including Z-score normalization, baseline drift removal using a high-pass filter, class balancing through under-sampling, and the removal of flat and outlier segments, resulting in high-quality input signals. The model has been trained and validated on a balanced dataset. It has been further improved through stratified split and optimized with early stopping and learning rate scheduling. Experimental results highlight that the proposed method achieves high accuracy of 0.91 in classifying apnea and normal events, showing strong potential for real-time, non-invasive, and scalable screening of sleep apnea in wearable health monitoring systems.",
      underReview: false,
    },
    {
      year: 2025,
      title:
        "Label-Agnostic Representation Learning: A Contrastive Self-Supervised Framework for Benign vs Malignant Skin Lesion Detection",
      authors: "Haseeb Amjad, Umar Shahbaz Khan, Hassan Elahi, Ali R. Ansari",
      venue: "PLOS ONE (Under Review, 2025)",
      link: "#",
      abstract:
        "This paper is currently under peer review and the abstract will be available upon publication.",
      underReview: true,
    },
    {
      year: 2025,
      title:
        "Dynamic Temporal Modeling using Cascaded Deep Networks and Encoder Transformers for Human Action Recognition",
      authors:
        "Haseeb Amjad, Nija Asif, Umar Shahbaz Khan, Hassan Elahi",
      venue:
        "International Conference on Robotics and Automation in Industry (ICRAI), 2024",
      link: "https://doi.org/10.1109/ICRAI62391.2024.10894302",
      abstract:
        "Human action recognition is an important area of research in computer vision with applications in healthcare, smart manufacturing, video surveillance, and AI-driven systems. The rise of human-robot interactions further emphasizes its role. Gesture-based control enables robots to recognize and respond to human actions in real-time. However, action recognition models demand high computational power. This paper proposes a dynamic temporal modeling framework that captures short-term, long-term, and global dependencies with balanced accuracy and efficiency. CNNs extract spatial features, GRUs capture short-term patterns, LSTMs support long-term dependencies, and transformers enhance global understanding. The cascaded architecture integrates EfficientNetB0 with LSTMs, GRUs, and transformers, achieving 92% accuracy on UCF50 with improved inference time and robustness.",
      underReview: false,
    },
    {
      year: 2024,
      title:
        "Precision Segmentation and Binary Masking of Skin Lesions in Automated Dermatological Diagnostics Using Detectron2",
      authors:
        "Haseeb Amjad, Nija Asif, Hassan Elahi, Umar Shahbaz Khan, Hassan Akbar, Ali R. Ansari, And Raheel Nawaz",
      venue: "IEEE Access, 2024",
      link: "https://doi.org/10.1109/ACCESS.2024.3514865",
      abstract:
        "Skin cancer is a common but preventable type of cancer. Observing the rising trend of cases being reported every year, accurate timely diagnosis can stop the spread of disease in the body. Manual diagnosis requires clinical expertise and causes delays whereas automatic diagnosis can bring accuracy and save time. This research introduces Detectron2, a state-of-the-art modular framework for deep learning-based segmentation tasks that enables precise instance-level segmentation, distinguishing overlapping lesions and accurately identifying individual regions of interest. This customized approach handles complex lesion structures and robustness against noise elements like hairlines and ink projections without preprocessing. Using ISIC and PH2 datasets, Detectron2 achieved IoU scores of 0.917 (ISIC 2016), 0.869 (ISIC 2017), 0.942 (ISIC 2018), and 0.915 (PH2).",
      underReview: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-black to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_70%)]" />

      {/* HEADING */}
      <section className="flex flex-col items-center justify-center pt-32 pb-32 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-400 mb-12 tracking-wider drop-shadow-lg text-center"
        >
          BRAINWAVES
        </motion.h1>

        {/* Tabs */}
        <div className="flex items-center space-x-6 mb-12 text-lg md:text-xl font-bold">
          <motion.span
            onClick={() => setActiveTab("publications")}
            whileHover={{ scale: 1.1, color: "#fb923c" }}
            className={
              activeTab === "publications"
                ? "text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer"
                : "text-gray-300 hover:text-orange-300 cursor-pointer"
            }
          >
            PUBLICATIONS
          </motion.span>
          <span className="text-gray-600">|</span>
          <motion.span
            onClick={() => setActiveTab("blogs")}
            whileHover={{ scale: 1.1, color: "#fb923c" }}
            className={
              activeTab === "blogs"
                ? "text-orange-400 border-b-2 border-orange-400 pb-1 cursor-pointer"
                : "text-gray-300 hover:text-orange-300 cursor-pointer"
            }
          >
            BLOGS
          </motion.span>
        </div>

        {/* Publications List */}
        <div className="w-full max-w-4xl px-6">
          <AnimatePresence mode="wait">
            {activeTab === "publications" ? (
              <motion.div
                key="publications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {publications.map((pub, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => !pub.underReview && setSelectedPub(pub)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.01 }}
                    whileHover={
                      pub.underReview
                        ? {}
                        : {
                          scale: 1.02,
                          rotateX: 2,
                          rotateY: -2,
                          boxShadow: "0 8px 30px rgba(251,146,60,0.25)",
                        }
                    }
                    className={`block rounded-xl p-6 backdrop-blur transition border bg-white/5 border-gray-700 hover:bg-white/10 ${pub.underReview ? "cursor-not-allowed" : "cursor-pointer"
                      }`}
                  >
                    <span className="text-sm font-semibold text-orange-300/80">
                      {pub.year}
                    </span>
                    <h3 className="mt-2 text-lg md:text-xl font-bold text-orange-300">
                      {pub.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400 italic">
                      {pub.authors}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{pub.venue}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="blogs"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="text-center py-12"
              >
                <p className="text-lg md:text-xl font-semibold text-gray-400">
                  🚧 Blogs coming soon — stay tuned for insights!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        onClick={handleScrollClick}
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
          {atPageEnd ? "↑" : "↓"}
        </span>
      </motion.div>

      {/* Modal for Publication */}
      <AnimatePresence>
        {selectedPub && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPub(null)}
            />
            {/* Modal Card */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative bg-zinc-900/90 border border-orange-400/40 rounded-2xl max-w-2xl w-full shadow-2xl flex flex-col max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPub(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-orange-400 transition z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto p-8 flex-1 min-h-0">
                  <h2 className="text-2xl font-bold text-orange-300 mb-2 pr-8">
                    {selectedPub.title}
                  </h2>
                  {/* Full authors here */}
                  <p className="text-sm text-gray-400 italic mb-2">
                    {selectedPub.authors}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    {selectedPub.venue}
                  </p>
                  {/* Justified abstract */}
                  <p className="text-gray-300 text-justify">
                    {selectedPub.abstract}
                  </p>
                </div>

                {/* Sticky footer with button */}
                {!selectedPub.underReview && (
                  <div className="flex justify-end px-8 py-4 border-t border-orange-400/20 shrink-0">
                    <a
                      href={selectedPub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-orange-500/80 hover:bg-orange-500 text-white font-semibold transition"
                    >
                      Read Full Paper →
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
