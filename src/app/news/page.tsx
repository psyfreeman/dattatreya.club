'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaNewspaper, FaCalendarAlt, FaStar } from 'react-icons/fa';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const news = [
  {
    id: 1,
    title: "New DJ Lineup Announced",
    date: "March 15, 2024",
    excerpt: "We're excited to announce our new resident DJs who will be bringing the best electronic music to our club.",
    category: "announcement"
  },
  {
    id: 2,
    title: "Club Renovation Complete",
    date: "March 10, 2024",
    excerpt: "Our club has undergone a major renovation to provide you with an even better experience.",
    category: "update"
  },
  {
    id: 3,
    title: "Special Event Series",
    date: "March 5, 2024",
    excerpt: "Get ready for our upcoming series of special events featuring world-class DJs and performers.",
    category: "event"
  }
];

export default function News() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black relative flex flex-col items-center"
    >
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-teal-950/20"></div>
        <div className="absolute inset-0 flex flex-col justify-between py-20 opacity-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="w-full h-px bg-teal-400"
            ></motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8"
          >
            Latest News
          </motion.h1>

          <div className="grid grid-cols-1 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-black/50 border border-teal-500/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-teal-500/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="aspect-video sm:aspect-square sm:w-48 bg-teal-500/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaNewspaper className="w-12 h-12 text-teal-500/30" />
                    </div>
                  </div>
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <FaCalendarAlt className="w-4 h-4 text-teal-500/70" />
                      <span className="text-teal-500/70 text-sm">{item.date}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-teal-500 mb-4">{item.title}</h3>
                    <p className="text-teal-500/50 text-sm mb-6">{item.excerpt}</p>
                    <Link href={`/news/${item.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg transition-colors hover:shadow-lg hover:shadow-yellow-500/20 flex items-center gap-2"
                      >
                        <FaStar className="w-4 h-4" />
                        Read More
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.main>
  );
} 