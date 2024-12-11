import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineReload,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineFilter,
} from "react-icons/ai";
import { SunIcon, MoonIcon } from "lucide-react";
import NavItem from "./NavItem";

// Header Component

const Header = ({ toggleTheme, isDarkMode, openFilterModal }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-gray-900/50 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold text-2xl">
            HomeSync
          </div>
          <nav className="flex items-center space-x-4 ml-6">
            <NavItem icon={<AiOutlineHome />} label="Dashboard" />
            <NavItem icon={<AiOutlineSetting />} label="Settings" />
            <NavItem icon={<AiOutlineUser />} label="Profile" />
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="text-2xl" />
            ) : (
              <MoonIcon className="text-2xl" />
            )}
          </motion.button>
          <motion.button
            onClick={handleReload}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            <AiOutlineReload className="text-2xl" />
          </motion.button>
          <motion.button
            onClick={openFilterModal}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors"
          >
            <AiOutlineFilter className="text-2xl" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
export default Header;
