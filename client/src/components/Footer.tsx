import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaDiscord, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="bg-yellow-400 text-white py-6"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold mb-2">Rhythm Reef</h2>
            <p>&copy; {new Date().getFullYear()} Rhythm Reef. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <motion.div
              // href="https://wa.me/1234567890"
              aria-label="WhatsApp"
              className="text-green-400 hover:text-green-300"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <FaWhatsapp className="w-6 h-6" />
            </motion.div>
            <motion.div
              // href="https://discord.gg/yourserver"
              aria-label="Discord"
              className="text-blue-500 hover:text-blue-400"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <FaDiscord className="w-6 h-6" />
            </motion.div>
            <motion.div
              // href="https://github.com/yourusername"
              aria-label="GitHub"
              className="text-gray-400 hover:text-gray-300"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <FaGithub className="w-6 h-6" />
            </motion.div>
            <motion.div
              // href="mailto:you@example.com"
              aria-label="Email"
              className="text-red-400 hover:text-red-500"
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <FaEnvelope className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
