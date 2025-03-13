'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
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

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email",
    content: siteConfig.contact.email,
    link: `mailto:${siteConfig.contact.email}`
  },
  {
    icon: FaPhone,
    title: "Phone",
    content: siteConfig.contact.phone,
    link: `tel:${siteConfig.contact.phone}`
  },
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    content: siteConfig.contact.address,
    link: "https://maps.google.com"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      <div className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-8 text-center sm:text-left"
          >
            Contact Us
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-8">
            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 sm:space-y-6"
            >
              <h2 className="text-lg sm:text-2xl font-semibold text-teal-500 mb-3 sm:mb-6 text-center sm:text-left">Get in Touch</h2>
              <div className="space-y-2 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-2 sm:gap-4 p-2.5 sm:p-4 bg-black/50 border border-teal-500/10 rounded-lg sm:rounded-xl hover:border-teal-500/30 transition-colors active:scale-98"
                  >
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm sm:text-lg font-medium text-teal-500">{info.title}</h3>
                      <p className="text-xs sm:text-base text-teal-500/70 break-words">{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-black/50 border border-teal-500/10 rounded-lg sm:rounded-xl p-3 sm:p-6 backdrop-blur-sm"
            >
              <h2 className="text-lg sm:text-2xl font-semibold text-teal-500 mb-3 sm:mb-6 text-center sm:text-left">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-teal-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black/50 border border-teal-500/10 rounded-md sm:rounded-lg focus:outline-none focus:border-teal-500/30 text-teal-500 text-xs sm:text-base placeholder-teal-500/30"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-teal-500 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black/50 border border-teal-500/10 rounded-md sm:rounded-lg focus:outline-none focus:border-teal-500/30 text-teal-500 text-xs sm:text-base placeholder-teal-500/30"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-teal-500 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black/50 border border-teal-500/10 rounded-md sm:rounded-lg focus:outline-none focus:border-teal-500/30 text-teal-500 text-xs sm:text-base placeholder-teal-500/30"
                    placeholder="Enter subject"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-teal-500 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-2.5 sm:px-4 py-1.5 sm:py-2 bg-black/50 border border-teal-500/10 rounded-md sm:rounded-lg focus:outline-none focus:border-teal-500/30 text-teal-500 text-xs sm:text-base placeholder-teal-500/30 resize-none"
                    placeholder="Enter your message"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg transition-colors hover:shadow-lg hover:shadow-yellow-500/20 flex items-center justify-center gap-2 text-xs sm:text-base active:bg-yellow-600"
                >
                  <FaPaperPlane className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </motion.main>
  );
}