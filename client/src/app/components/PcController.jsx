import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPowerOff, FaPause, FaDesktop } from "react-icons/fa";

const PcController = () => {
  const [isLoading, setIsLoading] = useState({
    shutdown: false,
    pauseMedia: false,
  });
  const [localIP, setLocalIP] = useState("");
  const [macAddress, setMacAddress] = useState("");

  // Load macaddress and LocalIP from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMacAddress = localStorage.getItem("macAddress");
      const savedLocalIP = localStorage.getItem("localIP");

      console.log("Saved macAddress:", savedMacAddress);
      console.log("Saved localIP:", savedLocalIP);

      if (savedMacAddress) setMacAddress(savedMacAddress);
      if (savedLocalIP) setLocalIP(savedLocalIP);
    }
  }, []);
  console.log("IP before validation", localIP);
  if (!localIP || !/^(\d{1,3}\.){3}\d{1,3}$/.test(localIP)) {
    return;
  }

  const executeCommand = async (endpoint, commandName) => {
    try {
      setIsLoading((prev) => ({ ...prev, [commandName]: true }));
      await axios.post(`http://${localIP}:8000/api/${endpoint}`);
    } catch (error) {
      console.error(`Error executing ${commandName} command:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [commandName]: false }));
    }
  };

  const pcControlButtons = [
    {
      icon: FaPowerOff,
      text: "Shutdown",
      endpoint: "shutdown/",
      commandName: "shutdown",
      color: "bg-red-500 hover:bg-red-600 text-white",
    },
    {
      icon: FaPause,
      text: "Pause Media",
      endpoint: "pause-media/",
      commandName: "pauseMedia",
      color: "bg-blue-500 hover:bg-blue-600 text-white",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transform transition-all duration-300 mt-8"
    >
      <div className="flex items-center justify-center mb-6">
        <FaDesktop className="text-3xl text-purple-500 dark:text-purple-400 mr-3" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white">
          PC Controller
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {pcControlButtons.map((button) => (
          <motion.button
            key={button.text}
            onClick={() => executeCommand(button.endpoint, button.commandName)}
            disabled={isLoading[button.commandName]}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center justify-center 
              py-3 px-4 rounded-lg 
              transition-all duration-300 
              ${button.color}
              ${
                isLoading[button.commandName]
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `}
          >
            <button.icon className="mr-2" />
            {isLoading[button.commandName] ? "Processing..." : button.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PcController;
