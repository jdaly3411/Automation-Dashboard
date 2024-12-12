import { motion } from "framer-motion";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { AiOutlineClockCircle } from "react-icons/ai";

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
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transform transition-all duration-300"
  >
    <div className="flex justify-between items-center mb-4">
      <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Sensor Data
      </div>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <AiOutlineClockCircle className="mr-1" />
        {new Date(timestamp).toLocaleString()}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
        <WiThermometer className="text-4xl text-blue-500 dark:text-blue-400 mx-auto mb-2" />
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {temperature.toFixed(1)}°C
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Temperature
        </div>
      </div>
      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
        <WiHumidity className="text-4xl text-green-500 dark:text-green-400 mx-auto mb-2" />
        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
          {humidity.toFixed(1)}%
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Humidity
        </div>
      </div>
    </div>
  </motion.div>
);

export default SensorCard;
