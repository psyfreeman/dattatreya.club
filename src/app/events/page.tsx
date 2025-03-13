'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaCalendarAlt, FaMusic, FaUserFriends, FaStar } from 'react-icons/fa';
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

const events = [
  {
    id: 1,
    title: "Weekend Party",
    date: "This Saturday",
    description: "Join us for an unforgettable night of electronic music and dancing.",
    category: "party"
  },
  {
    id: 2,
    title: "Live DJ Set",
    date: "Next Friday",
    description: "Experience the best DJs performing live on our stage.",
    category: "music"
  },
  {
    id: 3,
    title: "Special Guest",
    date: "Coming Soon",
    description: "A surprise guest appearance that you won't want to miss.",
    category: "special"
  }
];

export default function Events() {
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
            Upcoming Events
          </motion.h1>

          <div className="grid grid-cols-1 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-black/50 border border-teal-500/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-teal-500/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="aspect-video sm:aspect-square sm:w-48 bg-teal-500/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {event.category === "party" && <FaCalendarAlt className="w-12 h-12 text-teal-500/30" />}
                      {event.category === "music" && <FaMusic className="w-12 h-12 text-teal-500/30" />}
                      {event.category === "special" && <FaUserFriends className="w-12 h-12 text-teal-500/30" />}
                    </div>
                  </div>
                  <div className="flex-1 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-semibold text-teal-500 mb-2">{event.title}</h3>
                    <p className="text-teal-500/70 text-sm mb-4">{event.date}</p>
                    <p className="text-teal-500/50 text-sm mb-6">{event.description}</p>
                    <Link href={`/events/${event.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg transition-colors hover:shadow-lg hover:shadow-yellow-500/20 flex items-center gap-2"
                      >
                        <FaStar className="w-4 h-4" />
                        Learn More
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