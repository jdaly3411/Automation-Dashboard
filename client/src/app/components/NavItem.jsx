import { motion } from "framer-motion";

const NavItem = ({ icon, label, active = false }) => (
  <motion.a
    href="/"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all ${
      active
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
        : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </motion.a>
);

export default NavItem;
