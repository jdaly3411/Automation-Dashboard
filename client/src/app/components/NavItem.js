const NavItem = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all ${
      active
        ? "bg-gradient-to-r from-purple-700/30 to-pink-700/30 text-purple-200"
        : "hover:bg-gray-800 text-gray-400"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
);

export default NavItem;
