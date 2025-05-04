import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8 px-6 mt-16 relative">
      <div className="container mx-auto text-center">
        <motion.div
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Pustakaku - Your Digital Library
        </motion.div>
        <motion.p
          className="mb-6 text-lg opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          A place where knowledge grows and evolves.
        </motion.p>
        <div className="flex justify-center space-x-6 mb-6">
          <motion.a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            About
          </motion.a>
          <motion.a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Contact
          </motion.a>
          <motion.a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Privacy Policy
          </motion.a>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="opacity-60 text-sm">
            &copy; 2025 PustakaKu. All rights reserved.
          </p>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-blue-400"
        animate={{
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      ></motion.div>
    </footer>
  );
}
