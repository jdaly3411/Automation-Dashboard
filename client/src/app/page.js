"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineFilter, AiOutlineReload } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import AnimatedBackground from "./components/AnimatedBackgroud";
import FilterModal from "./components/FilterModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SensorCard from "./components/SensorCard";
import PcController from "./components/PcController";
import WeatherWidget from "./components/WeatherWidget";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [macAddress, setMacAddress] = useState("");
  const [localIP, setLocalIP] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMacAddress = localStorage.getItem("macAddress");
      const savedLocalIP = localStorage.getItem("localIP");
      const savedTheme = localStorage.getItem("theme");

      if (savedMacAddress) setMacAddress(savedMacAddress);
      if (savedLocalIP) setLocalIP(savedLocalIP);

      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const theme = savedTheme || (prefersDarkMode ? "dark" : "light");
      setIsDarkMode(theme === "dark");
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, []);

  useEffect(() => {
    if (localIP && macAddress) {
      fetchData();
    }
  }, [localIP, macAddress]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  }, [isDarkMode]);

  const fetchData = useCallback(
    async (filters = {}) => {
      try {
        setIsLoading(true);
        setError(null);

        if (!localIP || !/^(\d{1,3}\.){3}\d{1,3}$/.test(localIP)) {
          return;
        }

        const cleanFilters = Object.fromEntries(
          Object.entries(filters).filter(
            ([_, value]) => value != null && value !== ""
          )
        );

        const queryParams = new URLSearchParams(cleanFilters);
        const url = `http://${localIP}:8000/api/sensor-data/?${queryParams.toString()}`;

        const res = await axios.get(url, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        });

        if (!Array.isArray(res.data)) {
          throw new Error("Invalid data format received");
        }

        setSensorData(res.data.slice(0, 9));
        setLastUpdated(new Date());
        toast.success("Data updated successfully");
      } catch (err) {
        const errorMessage = err.response
          ? err.response.data?.message || "Failed to fetch sensor data"
          : err.message || "Network error";

        setError(errorMessage);
        console.error("Fetch error:", err);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [localIP]
  );

  useEffect(() => {
    if (error === null) {
      fetchData(filterParams);
      const intervalId = setInterval(() => fetchData(filterParams), 60000);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, filterParams, error]);

  const handleApplyFilter = useCallback((newFilterParams) => {
    setFilterParams(newFilterParams);
    setIsModalOpen(false);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterParams({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
    toast.info("Filters cleared");
  }, []);

  const openModal = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <AnimatedBackground />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
            <motion.button
              onClick={() => fetchData(filterParams)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800/30 p-2 rounded-full transition-colors"
              aria-label="Refresh data"
            >
              <AiOutlineReload className="text-2xl" />
            </motion.button>
            <motion.button
              onClick={() => router.push("/settings")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-800/30 p-2 rounded-full transition-colors"
              aria-label="Go to settings"
            >
              <FiSettings className="text-2xl" />
            </motion.button>
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
            className="text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            Home Automation Dashboard
          </motion.h1>

          <WeatherWidget />

          {lastUpdated && (
            <div className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}

          {!localIP ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-yellow-500 font-semibold mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg shadow-md"
            >
              Please enter local IP in settings
            </motion.div>
          ) : isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-gray-600 dark:text-gray-400 animate-pulse"
            >
              <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-md">
                Loading sensor data...
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center text-red-500 p-4 bg-red-100 dark:bg-red-900 rounded-lg shadow-md"
            >
              {error}
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {sensorData.map((data, index) => (
                  <SensorCard
                    key={index}
                    temperature={data.temperature}
                    humidity={data.humidity}
                    timestamp={data.timestamp}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center my-16 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400"
          >
            Commands
          </motion.h2>

          <PcController localIP={localIP} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
