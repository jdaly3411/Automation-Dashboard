import React from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaThermometerHalf,
  FaLock,
  FaCamera,
} from "react-icons/fa";

const QuickActions = ({ localIP }) => {
  // Declare the handleAction function correctly
  const handleAction = async (actionType) => {
    try {
      const response = await fetch(`http://${localIP}:8000/api/quick-action/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: actionType }),
      });

      if (!response.ok) {
        throw new Error("Failed to perform quick action");
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error performing quick action:", error);
    }
  };

  const actions = [
    {
      icon: FaLightbulb,
      label: "Toggle Lights",
      action: () => handleAction("lights"),
    },
    {
      icon: FaThermometerHalf,
      label: "Adjust Thermostat",
      action: () => handleAction("thermostat"),
    },
    {
      icon: FaLock,
      label: "Lock/Unlock Doors",
      action: () => handleAction("doors"),
    },
    {
      icon: FaCamera,
      label: "View Cameras",
      action: () => handleAction("cameras"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            onClick={action.action}
            className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <action.icon className="text-3xl mb-2 text-blue-500 dark:text-blue-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
