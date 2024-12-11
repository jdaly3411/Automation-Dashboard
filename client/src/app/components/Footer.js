// Footer Component

import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";
const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-900/50 shadow-2xl"
  >
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-gray-400 text-sm">
        © 2024 HomeSync. All rights reserved.
      </div>
      <motion.a
        href="https://github.com/jdaly3411/Home-Automation-Dashboard"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
      >
        <AiOutlineGithub className="text-2xl" />
      </motion.a>
    </div>
  </motion.footer>
);

export default Footer;
