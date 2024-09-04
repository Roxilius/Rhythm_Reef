import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertProps } from '@/types';

const AlertPopup: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const gradientColor = type? 'from-green-400 via-green-500 to-green-600' : 'from-red-400 via-red-500 to-red-600';
  useEffect(() => {
    const interval = setInterval(() => {
      onClose();
    }, 2000);
    return () => clearInterval(interval);
  })
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed z-50 left-2 bottom-2 m-auto transform -translate-x-1/2 bg-gradient-to-r ${gradientColor} text-white p-6 rounded-lg shadow-2xl w-80 max-w-xs`}
    >
      <div className="flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {type? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300"
        >
          &times;
        </button>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-semibold text-center">{message}</h1>
      </div>
    </motion.div>
  );
};

export default AlertPopup;
