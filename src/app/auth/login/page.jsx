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
  const [loading, setLoading] = useState(false); // <-- state loading

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    const rememberedPassword = localStorage.getItem("remembered_password");
    const rememberMeChecked = localStorage.getItem("remember_me") === "true";

    if (rememberMeChecked && rememberedEmail && rememberedPassword) {
      setForm({
        email: rememberedEmail,
        password: rememberedPassword,
        rememberMe: true,
      });
    }

    const token = localStorage.getItem("auth_token");
    const tokenExpiry = localStorage.getItem("token_expiry");

    if (token && tokenExpiry && Date.now() < tokenExpiry) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const promptVerification = async (email) => {
    try {
      showLoading();
      const sendResp = await axios.post("https://pustakaku.rf.gd/v1/auth/sendVerification/", { email });
      hideLoading();

      if (!sendResp.data.success) {
        return Swal.fire("Gagal", sendResp.data.error || "Gagal mengirim kode verifikasi.", "error");
      }

      const { value: code } = await Swal.fire({
        title: "Verifikasi Akun",
        input: "text",
        inputLabel: "Masukkan kode verifikasi yang dikirim ke email",
        inputPlaceholder: "Kode verifikasi",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Kode harus diisi!";
        },
      });

      if (code) {
        try {
          showLoading();
          const resp = await axios.post("https://pustakaku.rf.gd/v1/auth/verifCode/", { email, code });
          hideLoading();

          if (resp.data.success) {
            Swal.fire("Sukses", "Akun berhasil diverifikasi, silakan login ulang.", "success");
          } else {
            Swal.fire("Gagal", resp.data.error || "Kode tidak valid.", "error");
          }
        } catch (error) {
          hideLoading();
          Swal.fire("Error", "Gagal memverifikasi. Coba lagi nanti.", "error");
        }
      }
    } catch (error) {
      hideLoading();
      Swal.fire("Error", "Gagal mengirim kode verifikasi.", "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return Swal.fire("Gagal", "Email dan password wajib diisi.", "warning");
    }

    try {
      showLoading();
      const { data } = await axios.post("https://pustakaku.rf.gd/v1/auth/login/", form);
      hideLoading();

      if (!data.success && data.unverified) {
        return promptVerification(form.email);
      }

      if (data.success) {
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("token_expiry", Date.now() + data.expires_in * 1000);
        return Swal.fire("Login Berhasil", data.message, "success")
          .then(() => window.location.href = "/dashboard");
      } else {
        Swal.fire("Login Gagal", data.error || "Email atau password salah", "error");
      }
    } catch (error) {
      hideLoading();
      Swal.fire("Error", "Terjadi kesalahan server.", "error");
    }

    if (form.rememberMe) {
      localStorage.setItem("remembered_email", form.email);
      localStorage.setItem("remembered_password", form.password);
      localStorage.setItem("remember_me", "true");
    } else {
      localStorage.removeItem("remembered_email");
      localStorage.removeItem("remembered_password");
      localStorage.setItem("remember_me", "false");
    }
  };

  const MemoizedParticles = useMemo(() => <ParticlesComponent id="particles" />, []);

  return (
    <>
      <NavBar />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <svg
            className="animate-spin h-16 w-16 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      )}

      <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
        <div id="particles" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          {MemoizedParticles}
        </div>

        <motion.div
          className="flex-grow flex items-center justify-center z-10 px-6 py-12 mt-16 mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="bg-[#121212] text-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-lg transform hover:scale-[1.01] hover:shadow-[#00c6ff80] transition-transform duration-700"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
              <BsFillPersonFill className="inline-block text-primary text-4xl mr-2" />
              Selamat Datang
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
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
              </div>

              <div className="relative">
                <HiLockClosed className="absolute left-3 top-3 text-gray-400 text-xl md:text-2xl" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full py-3 pl-10 pr-10 rounded-lg bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-gray-400 text-xl"
                >
                  {passwordVisible ? <HiEyeOff /> : <HiEye />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleChange}
                    className="form-checkbox text-primary"
                  />
                  <span>Ingat saya</span>
                </label>
                <Link href="/lupa-password" className="text-sm text-primary hover:underline">
                  Lupa password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Masuk
              </button>
            </form>
            <p className="text-center mt-6">
              Belum punya akun?{" "}
              <Link href="/daftar" className="text-primary hover:underline">
                Daftar Sekarang
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}
