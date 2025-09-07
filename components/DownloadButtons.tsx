"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function DownloadButtons() {
  return (
    <div className="flex gap-4 mt-1">
      {/* CV Button */}
      <motion.a
        href="/cv.pdf" // replace with actual path
        download
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 
                   text-white text-sm font-bold tracking-wide shadow-lg
                   hover:from-orange-400 hover:to-orange-500 
                   transition-all duration-300 flex items-center gap-2"
      >
        <FileDown size={18} />
        CV
      </motion.a>

      {/* Resume Button */}
      <motion.a
        href="/resume.pdf" // replace with actual path
        download
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="px-6 py-2.5 rounded-full border border-orange-400/60 bg-white/5 
                   text-orange-300 text-sm font-bold tracking-wide
                   shadow-md hover:bg-orange-500/10 hover:shadow-orange-500/30
                   transition-all duration-300 flex items-center gap-2"
      >
        <FileDown size={18} />
        RESUME
      </motion.a>
    </div>
  );
}
