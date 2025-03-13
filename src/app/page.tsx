'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaVolumeUp, 
  FaVolumeDown, 
  FaPlay, 
  FaPause,
  FaMusic,
  FaCalendarAlt,
  FaUserFriends,
  FaStar
} from 'react-icons/fa';
import { 
  RiVolumeUpFill,
  RiVolumeDownFill
} from 'react-icons/ri';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

interface Event {
  id: number;
  title: string;
  date: string;
}

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

const featuredEvents: Event[] = [
  {
    id: 1,
    title: "Weekend Party",
    date: "This Saturday"
  },
  {
    id: 2,
    title: "Live DJ Set",
    date: "Next Friday"
  },
  {
    id: 3,
    title: "Special Guest",
    date: "Coming Soon"
  }
];

const Spinner = () => {
  const dots = [0, 1, 2];
  
  return (
    <div className="relative w-8 h-8">
      {dots.map((dot, index) => (
        <motion.div
          key={dot}
          className="absolute w-2 h-2 bg-teal-500 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1, 0.8],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.cos((index * 2 * Math.PI) / 3) * 12 + 12}px`,
            top: `${Math.sin((index * 2 * Math.PI) / 3) * 12 + 12}px`
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [error, setError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Simulate track updates
  useEffect(() => {
    if (isPlaying) {
      const tracks = [
        "963 Hz Returning to Oneness"
      ];
      
      const updateTrack = () => {
        const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
        setCurrentTrack(randomTrack);
      };

      updateTrack();
      const interval = setInterval(updateTrack, 10000); // Update every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handlePlay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      } catch (err) {
        setError('Failed to play audio. Please try again.');
        setIsPlaying(false);
      }
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Внешний круг */}
            <div className="w-24 h-24 rounded-full border-4 border-teal-500/10"></div>
            {/* Вращающийся круг */}
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-transparent border-t-teal-500 animate-spin"></div>
            {/* Внутренний круг */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-teal-500/20"></div>
            {/* Центральная точка */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-yellow-500 text-xl font-medium">Loading</p>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-teal-500/5 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-teal-500/5 rounded-full"
          ></motion.div>
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
            Welcome to Dattatreya Club
          </motion.h1>
          
          {/* Radio Player */}
          <motion.div
            variants={itemVariants}
            className="bg-black/50 border border-teal-500/10 rounded-xl p-4 sm:p-8 backdrop-blur-sm hover:border-teal-500/30 transition-colors relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-teal-500/30 flex items-center justify-center">
                  <FaMusic className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl sm:text-2xl font-bold text-teal-500">Live Radio</h2>
                  {currentTrack && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs sm:text-sm text-teal-500/70 mt-1"
                    >
                      {currentTrack}
                    </motion.p>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="cursor-pointer">
                    <RiVolumeDownFill className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500/70" />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="flex-1 sm:w-32 h-1.5 bg-teal-500/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 sm:[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-yellow-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg [&::-webkit-slider-thumb]:hover:shadow-teal-500/20 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/10"
                  />
                  <div className="cursor-pointer">
                    <RiVolumeUpFill className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500/70" />
                  </div>
                </div>
                <button
                  onClick={togglePlay}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal-500 to-yellow-500 hover:from-teal-400 hover:to-yellow-400 text-black font-bold px-4 sm:px-6 py-2 rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/20 flex items-center justify-center gap-2 text-sm sm:text-base relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isPlaying ? (
                      <>
                        <FaPause className="w-4 h-4 sm:w-5 sm:h-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <FaPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                        Play
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            <audio
              ref={audioRef}
              src="http://s02.radio-tochka.com:1250/stream"
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => {
                setError('Failed to load audio stream. Please try again later.');
                setIsPlaying(false);
              }}
              onCanPlay={() => setError(null)}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
            />
          </motion.div>

          {/* Featured Events */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-12"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-teal-500 mb-4 sm:mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/50 border border-teal-500/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-teal-500/30 transition-colors"
                >
                  <div className="aspect-video bg-teal-500/10 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {index === 0 && <FaCalendarAlt className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500/30" />}
                      {index === 1 && <FaMusic className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500/30" />}
                      {index === 2 && <FaUserFriends className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500/30" />}
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-teal-500 mb-1 sm:mb-2">{event.title}</h3>
                    <p className="text-xs sm:text-sm text-teal-500/70 mb-3 sm:mb-4">{event.date}</p>
                    <Link href={`/events/${event.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-1.5 sm:py-2 rounded-lg transition-colors hover:shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        <FaStar className="w-3 h-3 sm:w-4 sm:h-4" />
                        Learn More
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.main>
  );
}
