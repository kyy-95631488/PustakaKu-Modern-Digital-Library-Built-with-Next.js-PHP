"use client";
import React, { useMemo, useState } from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ParticlesComponent from "../../components/particles/particlesreact";
import { FaUser, FaLock, FaEnvelope, FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Password dan konfirmasi tidak cocok.',
        showConfirmButton: true,
      });
      return;
    }

    try {
      const response = await fetch("https://5009-180-252-88-174.ngrok-free.app/v1/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Registrasi berhasil!',
          showConfirmButton: true,
        }).then(() => {
          window.location.href = "/auth/login";
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: data.error,
          showConfirmButton: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan saat registrasi.',
        showConfirmButton: true,
      });
    }
  };

  const MemoizedParticles = useMemo(() => <ParticlesComponent id="particles" />, []);

  return (
    <>
      <NavBar />

      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <div id="particles" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          {MemoizedParticles}
        </div>

        <motion.div
          className="flex-grow flex items-center justify-center z-10 relative px-4 py-12 pt-32 pb-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="bg-[#121212] text-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-md transform transition-all duration-700 hover:scale-[1.01] hover:shadow-[#00c6ff80]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-8"> 
              <FaUserPlus className="inline-block mr-2 text-primary" /> Daftar Akun Baru 
            </h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Nama Lengkap"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Konfirmasi Password"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary hover:bg-secondary transition-all duration-300 font-semibold text-white transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                Daftar
              </motion.button>
            </form>
            <p className="text-center mt-6 text-gray-400">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:text-secondary transition duration-300"
              >
                Login di sini
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
