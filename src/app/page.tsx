"use client";
import React, { useMemo } from "react";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import HeroSection from "./components/hero/HeroSection";
import BookSection from "./components/book/BookSection";
import ListBookSection from "./components/listBook/ListBookSection";
import ParticlesComponent from "./components/particles/particlesreact";

export default function Home() {
  const MemoizedParticles = useMemo(() => <ParticlesComponent id="particles" />, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-[#121212] overflow-x-hidden w-full z-0">
      {/* Background particles */}
      <div id="particles" className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        {MemoizedParticles}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <NavBar />
        <HeroSection />

        {/* Content section */}
        <section className="container mx-auto px-6 sm:px-12 py-16 space-y-24">
          <BookSection />
          <ListBookSection />
        </section>

        <Footer />
      </div>
    </main>
  );
}
