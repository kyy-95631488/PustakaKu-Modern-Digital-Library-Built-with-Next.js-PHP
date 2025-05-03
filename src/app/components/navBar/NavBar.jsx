"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function NavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_expiry");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const tokenExpiry = localStorage.getItem("token_expiry");

    if (token && tokenExpiry && Date.now() < tokenExpiry) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setIsLoginPage(window.location.pathname === "/auth/login");
  }, []);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#121212] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary hover:text-secondary transition-all duration-500 transform hover:scale-105 hover:rotate-1">
              PustakaKu
            </Link>

            <div className="hidden md:flex space-x-6">
              {["/", "/about", "/services", "/contact"].map((path, idx) => (
                <Link
                  key={idx}
                  href={path}
                  className="hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
                >
                  {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
                >
                  <FaTachometerAlt className="mr-2" /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link
                href={isLoginPage ? "/auth/register" : "/auth/login"}
                className="flex items-center hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
              >
                <FaSignInAlt className="mr-2" />
                {isLoginPage ? "Register" : "Login"}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-white">
              {isMobileMenuOpen ? (
                <IoMdClose className="h-7 w-7 transition-all duration-500 transform hover:rotate-180" />
              ) : (
                <svg
                  className="h-6 w-6 transition-all duration-500 transform hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#121212] transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-screen opacity-100 transform translate-y-0" : "max-h-0 opacity-0 overflow-hidden translate-y-10"
        }`}
      >
        <div className="flex flex-col px-6 pb-4 space-y-2">
          {["/", "/about", "/services", "/contact"].map((path, idx) => (
            <Link
              key={idx}
              href={path}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-700 hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
            >
              {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center py-2 hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <Link
              href={isLoginPage ? "/auth/register" : "/auth/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-secondary transition-all duration-500 ease-in-out transform hover:scale-110"
            >
              <FaSignInAlt className="mr-2" />
              {isLoginPage ? "Register" : "Login"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
