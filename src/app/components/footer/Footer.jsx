// Footer.js
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8 px-6 mt-16 relative">
      <div className="container mx-auto text-center">
        <div className="text-2xl font-bold mb-4 animate__animated animate__fadeIn animate__delay-1s">
          Pustakaku - Your Digital Library
        </div>
        <p className="mb-6 text-lg opacity-80 animate__animated animate__fadeIn animate__delay-2s">
          A place where knowledge grows and evolves.
        </p>
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-white hover:text-[#1E40AF] transition-colors duration-300"
          >
            Privacy Policy
          </a>
        </div>
        <div className="animate__animated animate__fadeIn animate__delay-3s">
          <p className="opacity-60 text-sm">
            &copy; 2025 Pustakaku. All rights reserved.
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 animate__animated animate__pulse animate__infinite"></div>
    </footer>
  );
}
