import { motion } from "framer-motion";
import {
  AiOutlineReload,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { SunIcon, MoonIcon } from "lucide-react";
import NavItem from "./NavItem";

const Header = ({ toggleTheme, isDarkMode, extraButtons }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <motion.div
            className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white font-bold text-2xl"
            whileHover={{ scale: 1.05 }}
          >
            HomeSync
          </motion.div>
          <nav className="hidden md:flex items-center space-x-4 ml-6">
            <NavItem icon={<AiOutlineHome />} label="Dashboard" active />
            <NavItem
              icon={<AiOutlineSetting />}
              label="Settings"
              href="/settings"
            />
            <NavItem icon={<AiOutlineUser />} label="Profile" />
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"
          >
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </motion.button>
          <motion.button
            onClick={handleReload}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"
          >
            <AiOutlineReload className="w-5 h-5" />
          </motion.button>

          {extraButtons}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
