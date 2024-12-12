import { motion } from "framer-motion";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg"
  >
    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} HomeSync. All rights reserved.
      </div>
      <motion.a
        href="https://github.com/jdaly3411/Home-Automation-Dashboard"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 p-2 rounded-full transition-colors"
      >
        <AiOutlineGithub className="w-6 h-6" />
      </motion.a>
    </div>
  </motion.footer>
);

export default Footer;
