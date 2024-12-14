"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AiOutlineSave } from "react-icons/ai";
import AnimatedBackground from "../components/AnimatedBackgroud";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SettingsPage = () => {
  const [macAddress, setMacAddress] = useState("");
  const [localIP, setLocalIP] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIP = localStorage.getItem("localIP");
      const savedMAC = localStorage.getItem("macAddress");
      if (savedIP) setLocalIP(savedIP);
      if (savedMAC) setMacAddress(savedMAC);

      const savedTheme = localStorage.getItem("theme");
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = savedTheme || (prefersDarkMode ? "dark" : "light");
      setIsDarkMode(theme === "dark");
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("localIP", localIP);
      localStorage.setItem("macAddress", macAddress);
      alert("Settings saved!");
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AnimatedBackground />
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      <main className="min-h-screen pt-24 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100 filter drop-shadow-lg"
          >
            Settings
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="macAddress"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  MAC Address
                </label>
                <input
                  type="text"
                  id="macAddress"
                  value={macAddress}
                  onChange={(e) => setMacAddress(e.target.value)}
                  placeholder="Enter MAC Address"
                  required
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="localIP"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Local IP
                </label>
                <input
                  type="text"
                  id="localIP"
                  value={localIP}
                  onChange={(e) => setLocalIP(e.target.value)}
                  placeholder="Enter Local IP"
                  required
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <AiOutlineSave className="mr-2" />
                Save Settings
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
