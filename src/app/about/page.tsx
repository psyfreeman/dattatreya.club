'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMusic, FaUtensils, FaUsers, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
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

const features = [
  {
    icon: FaMusic,
    title: "World-Class Music",
    description: "Experience the best electronic music from talented DJs and live performers."
  },
  {
    icon: FaUtensils,
    title: "Vegetarian Food",
    description: "Enjoy our carefully curated selection of delicious vegetarian dishes and snacks."
  },
  {
    icon: FaUsers,
    title: "Vibrant Community",
    description: "Join our diverse community of music lovers and party enthusiasts."
  }
];

export default function About() {
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
            About Dattatreya Club
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="prose prose-invert prose-teal max-w-none mb-12"
          >
            <p className="text-teal-500/70 text-lg mb-6">
              Welcome to Dattatreya Club, where music meets magic. Since our opening, we've been dedicated to providing an unforgettable experience for music lovers and party enthusiasts.
            </p>
            <p className="text-teal-500/70 text-lg mb-6">
              Our club features state-of-the-art sound systems, stunning visual effects, and a carefully curated selection of the best electronic music. Whether you're a seasoned club-goer or just starting your journey into electronic music, Dattatreya Club offers something for everyone.
            </p>
            <p className="text-teal-500/70 text-lg">
              Join us for unforgettable nights of music, dancing, and celebration. Our resident DJs and special guests bring the best beats from around the world, creating an atmosphere that's both electric and intimate.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-black/50 border border-teal-500/10 rounded-xl p-6 backdrop-blur-sm hover:border-teal-500/30 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-teal-500 mb-4" />
                <h3 className="text-xl font-semibold text-teal-500 mb-2">{feature.title}</h3>
                <p className="text-teal-500/50">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/50 border border-teal-500/10 rounded-xl p-6 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-teal-500 mb-4">Our Mission</h2>
            <p className="text-teal-500/70 text-lg mb-4">
              At Dattatreya Club, we're committed to creating an inclusive space where music brings people together. Our mission is to provide an exceptional clubbing experience that combines cutting-edge music, stunning visuals, and a welcoming atmosphere.
            </p>
            <div className="flex items-center gap-2 text-teal-500/70">
              <FaStar className="w-5 h-5" />
              <span>Join us for an unforgettable experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.main>
  );
} 