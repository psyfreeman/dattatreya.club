'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full relative z-10 border-t border-teal-500/10 backdrop-blur-sm bg-black/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <p className="text-xs sm:text-sm text-teal-500/50 text-center sm:text-left">
            &copy; {siteConfig.year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-3 sm:gap-4">
            <Link 
              href="/privacy" 
              className="text-xs sm:text-sm text-teal-500/50 hover:text-teal-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs sm:text-sm text-teal-500/50 hover:text-teal-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 