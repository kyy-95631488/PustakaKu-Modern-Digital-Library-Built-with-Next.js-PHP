import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import Typewriter from "typewriter-effect";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0f172a] text-white">
      {/* Gradient Glow Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 blur-3xl opacity-30 animate-pulse"
      />

      {/* Overlay for darkness */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
        {/* Icon */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full shadow-lg">
            <BookOpen size={48} className="text-white drop-shadow-lg" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Typewriter
            options={{
              strings: ['Selamat Datang di <span class="text-blue-400">Pustakaku</span>'],
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-lg md:text-xl font-light text-gray-300 drop-shadow"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          Temukan koleksi buku favorit Anda dan jelajahi dunia pengetahuan tanpa batas.
        </motion.p>

        {/* Button */}
        <motion.button
          className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-lg font-medium shadow-lg hover:bg-white/20 hover:scale-105 transition-transform duration-300 flex items-center gap-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.6 }}
        >
          Jelajahi Sekarang <ArrowRight size={20} />
        </motion.button>
      </div>

      {/* Modern Animated Wave Effect Below */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-400/30 via-purple-400/20 to-pink-400/30 blur-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  );
};

export default HeroSection;
