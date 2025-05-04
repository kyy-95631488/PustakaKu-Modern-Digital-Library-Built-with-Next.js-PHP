"use client";
import React from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <>
      <NavBar />

      <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden bg-gradient-to-r from-blue-500 to-purple-600">
        <motion.div
          className="flex-grow flex items-center justify-center z-10 px-6 py-12 mt-16 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white text-gray-900 shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-lg transform hover:scale-[1.02] hover:shadow-[#00c6ff80] transition-transform duration-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
              Dashboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-gray-800 text-white p-6 rounded-xl transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold">Statistik Pengguna</h3>
                <p className="text-4xl mt-4">1,245</p>
              </motion.div>

              <motion.div
                className="bg-gray-800 text-white p-6 rounded-xl transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold">Transaksi Hari Ini</h3>
                <p className="text-4xl mt-4">320</p>
              </motion.div>

              <motion.div
                className="bg-gray-800 text-white p-6 rounded-xl transform hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h3 className="text-xl font-semibold">Pendapatan Bulanan</h3>
                <p className="text-4xl mt-4">$15,600</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
