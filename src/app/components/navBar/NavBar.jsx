"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
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

    if (token && tokenExpiry && Date.now() < +tokenExpiry) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setIsLoginPage(window.location.pathname === "/auth/login");
  }, []);

  const navLinks = ["/", "/about", "/services", "/contact"];

  const mobileMenuVariants = {
    initial: { opacity: 0, scale: 0.95, y: -20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08, // item delay
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };
  
  const linkVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };
  
  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-[#121212] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold text-primary hover:text-secondary transition-all duration-300 transform hover:scale-105 hover:rotate-1"
            >
              PustakaKu
            </Link>
            <div className="hidden md:flex space-x-6">
              {navLinks.map((path, idx) => (
                <motion.div key={idx} {...linkVariants} whileHover={{ scale: 1.1, rotate: 2 }}>
                  <Link
                    href={path}
                    className="transition-all duration-300 ease-in-out transform hover:text-secondary hover:scale-110"
                  >
                    {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <motion.div {...linkVariants}>
                  <Link
                    href="/dashboard"
                    className="flex items-center hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-110"
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                </motion.div>
                <motion.button
                  onClick={handleLogout}
                  {...linkVariants}
                  className="flex items-center hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </motion.button>
              </>
            ) : (
              <motion.div {...linkVariants}>
                <Link
                  href={isLoginPage ? "/auth/register" : "/auth/login"}
                  className="flex items-center hover:text-secondary transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  <FaSignInAlt className="mr-2" />
                  {isLoginPage ? "Register" : "Login"}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Toggle Mobile */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9, rotate: 90 }}
              className="text-white"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="h-7 w-7" />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={toggleMobileMenu}
            />
            <motion.div
              key="mobile-menu"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden fixed top-0 left-0 w-full h-full bg-[#121212]/90 backdrop-blur-md px-6 pt-24 pb-10 space-y-4 z-40"
            >
              {/* Close Button */}
              <motion.button
                onClick={toggleMobileMenu}
                className="absolute top-6 right-6 text-white"
                aria-label="Close Menu"
              >
                <IoMdClose className="h-8 w-8" />
              </motion.button>

              {navLinks.map((path, idx) => (
                <motion.div key={idx} variants={linkVariants}>
                  <Link
                    href={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg py-2 border-b border-gray-700 hover:text-secondary transition-all transform hover:scale-105"
                  >
                    {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </motion.div>
              ))}

              {isLoggedIn && (
                <motion.div variants={linkVariants}>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center py-2 text-lg hover:text-secondary transition-all transform hover:scale-105"
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                </motion.div>
              )}
              <motion.div variants={linkVariants}>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-lg hover:text-secondary transition-all transform hover:scale-105"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                ) : (
                  <Link
                    href={isLoginPage ? "/auth/register" : "/auth/login"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center py-2 text-lg hover:text-secondary transition-all transform hover:scale-105"
                  >
                    <FaSignInAlt className="mr-2" />
                    {isLoginPage ? "Register" : "Login"}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
