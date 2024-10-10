// AnimatedButton.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    style={{
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    {children}
  </motion.button>
);

export default AnimatedButton;
