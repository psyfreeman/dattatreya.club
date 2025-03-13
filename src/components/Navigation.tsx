'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative z-10 border-b border-teal-500/10 backdrop-blur-sm bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="group relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-yellow-500/30 flex items-center justify-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full"
                ></motion.div>
              </motion.div>
              <div className="flex flex-col">
                <motion.div
                  animate={{ 
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-yellow-500 via-teal-500 to-yellow-500 bg-clip-text text-transparent tracking-wider bg-[length:200%_auto] font-['Orbitron']"
                >
                  DATTATREYA CLUB
                </motion.div>
              </div>
            </motion.div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-8">
            <Link href="/events" className="text-teal-500/70 hover:text-teal-400 transition-colors">
              Events
            </Link>
            <Link href="/news" className="text-teal-500/70 hover:text-teal-400 transition-colors">
              News
            </Link>
            <Link href="/about" className="text-teal-500/70 hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-teal-500/70 hover:text-teal-400 transition-colors">
              Contact
            </Link>
          </div>
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button sm:hidden text-teal-500/70 hover:text-teal-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="mobile-menu sm:hidden overflow-hidden bg-black/50 backdrop-blur-sm"
      >
        <div className="px-4 py-3 space-y-2">
          <Link 
            href="/events" 
            className="block text-teal-500/70 hover:text-teal-400 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link 
            href="/news" 
            className="block text-teal-500/70 hover:text-teal-400 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            href="/about" 
            className="block text-teal-500/70 hover:text-teal-400 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-teal-500/70 hover:text-teal-400 transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}