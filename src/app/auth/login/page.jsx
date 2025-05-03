"use client";
import React, { useState, useMemo, useEffect } from "react";
import NavBar from "../../components/navBar/NavBar";
import Footer from "../../components/footer/Footer";
import ParticlesComponent from "../../components/particles/particlesreact";
import { HiOutlineMail, HiLockClosed, HiEye, HiEyeOff } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Check for existing token and expiration
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const tokenExpiry = localStorage.getItem("token_expiry");

    if (token && tokenExpiry && Date.now() < tokenExpiry) {
      // If token exists and is not expired, redirect to dashboard
      window.location.href = "/dashboard";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/v1/auth/login/", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log(response.data);
  
      if (response.data.success) {
        const { token, expires_in } = response.data;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("token_expiry", Date.now() + expires_in * 1000); // Store expiry timestamp in localStorage
  
        Swal.fire({
          icon: 'success',
          title: 'Login berhasil!',
          text: response.data.message,
        }).then(() => {
          window.location.href = "/dashboard"; // Redirect to dashboard
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal!',
          text: response.data.error,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan!',
        text: 'Coba lagi nanti.',
      });
    }
  };
  
  const MemoizedParticles = useMemo(() => <ParticlesComponent id="particles" />, []);

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen flex flex-col justify-between">
        <div id="particles" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          {MemoizedParticles}
        </div>

        <motion.div 
          className="flex-grow flex items-center justify-center z-10 relative px-6 py-12 md:px-8 mt-16 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="bg-[#121212] text-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-lg transform transition-all duration-700 hover:scale-[1.01] hover:shadow-[#00c6ff80]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
              <BsFillPersonFill className="inline-block text-primary text-4xl mr-2" />
              Selamat Datang
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HiOutlineMail className="absolute left-3 top-3 text-gray-400 text-xl md:text-2xl" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HiLockClosed className="absolute left-3 top-3 text-gray-400 text-xl md:text-2xl" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full py-3 pl-10 pr-4 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-gray-400 text-xl md:text-2xl"
                >
                  {passwordVisible ? <HiEyeOff /> : <HiEye />}
                </button>
              </motion.div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="h-5 w-5"
                />
                <span className="text-gray-400">Remember Me</span>
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary hover:bg-secondary transition-all duration-300 font-semibold text-white transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.button>
            </form>
            <p className="text-center mt-6 text-gray-400">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:text-secondary transition duration-300"
              >
                Daftar di sini
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
