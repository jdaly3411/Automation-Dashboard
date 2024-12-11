import { motion } from "framer-motion";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { AiOutlineClockCircle, AiOutlineFlag } from "react-icons/ai";
import { formatDistance } from "date-fns";
// Sensor Card Component
const SensorCard = ({ temperature, humidity, timestamp, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.1,
    }}
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-700/50 hover:border-purple-500/50 transform transition-all duration-100"
  >
    <div className="flex justify-between items-center mb-4">
      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Sensor Data
      </div>
      <span className="text-xs text-gray-400">
        {new Date(timestamp).toLocaleString()}
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-900/50 rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-blue-400">
          {temperature.toFixed(1)}°
        </div>
        <div className="text-xs text-gray-400 mt-1">Temperature</div>
      </div>
      <div className="bg-gray-900/50 rounded-xl p-4 text-center">
        <div className="text-3xl font-bold text-green-400">
          {humidity.toFixed(1)}%
        </div>
        <div className="text-xs text-gray-400 mt-1">Humidity</div>
      </div>
    </div>
  </motion.div>
);

export default SensorCard;
