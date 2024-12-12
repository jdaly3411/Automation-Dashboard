"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineFilter } from "react-icons/ai";
import AnimatedBackground from "./components/AnimatedBackgroud";
import FilterModal from "./components/FilterModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import PcController from "./components/PcController";

export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterParams, setFilterParams] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (prefersDarkMode ? "dark" : "light");

    setIsDarkMode(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      setIsLoading(true);
      setError(null);

      // Clean up filters to exclude empty values
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value != null && value !== ""
        )
      );

      const queryParams = new URLSearchParams(cleanFilters);

      // Dynamically determine the base URL
      const BASE_URL =
        process.env.NODE_ENV === "production"
          ? "http://192.168.4.22:8000"
          : "http://127.0.0.1:8000";

      const url = `${BASE_URL}/api/sensor-data/?${queryParams.toString()}`;

      // Send the GET request
      const res = await axios.get(url);
      setSensorData(res.data.slice(0, 9)); // Limit the displayed results
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch sensor data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(cleanParams(filterParams));
    const intervalId = setInterval(() => fetchData(filterParams), 60000);
    return () => clearInterval(intervalId);
  }, [filterParams]);

  const cleanParams = (params) => {
    return Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value != null && value !== ""
      )
    );
  };

  const handleApplyFilter = (newFilterParams) => {
    setFilterParams(newFilterParams);
    setIsModalOpen(false);
  };

  const clearFilter = () => {
    setFilterParams({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  };

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AnimatedBackground />

      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        extraButtons={
          <>
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/30 p-2 rounded-full transition-colors relative"
              aria-label="Open filter modal"
            >
              <AiOutlineFilter className="text-2xl" />
              {Object.values(filterParams).some(Boolean) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </motion.button>

            {Object.values(filterParams).some(Boolean) && (
              <motion.button
                onClick={clearFilter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800/30 p-2 rounded-full transition-colors"
                aria-label="Clear filter"
              >
                Clear Filter
              </motion.button>
            )}
          </>
        }
      />

      {isModalOpen && (
        <FilterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onApplyFilter={handleApplyFilter}
          initialStartDate={filterParams.startDate}
          initialEndDate={filterParams.endDate}
          initialStartTime={filterParams.startTime}
          initialEndTime={filterParams.endTime}
        />
      )}

      <main className="min-h-screen pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-center mb-10 text-gray-800 dark:text-gray-100 filter drop-shadow-lg"
          >
            Home Automation Dashboard
          </motion.h1>

          {lastUpdated && (
            <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-600 dark:text-gray-400 animate-pulse">
              Loading sensor data...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <AnimatePresence>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sensorData.map((data, index) => (
                  <SensorCard
                    key={index}
                    temperature={data.temperature}
                    humidity={data.humidity}
                    timestamp={data.timestamp}
                    index={index}
                  />
                ))}
              </div>
            </AnimatePresence>
          )}

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center my-16 text-gray-800 dark:text-gray-100 filter drop-shadow-lg"
          >
            Commands
          </motion.h2>

          <PcController />
        </div>
      </main>
      <Footer />
    </div>
  );
}
