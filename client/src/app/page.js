"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineReload,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineFilter,
} from "react-icons/ai";
import { SunIcon, MoonIcon } from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackgroud";
import FilterModal from "./components/FilterModal";
import NavItem from "./components/NavItem";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SensorCard from "./components/SensorCard";

// Main Dashboard Component
export default function Dashboard() {
  const [sensorData, setSensorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filter state
  const [filterParams, setFilterParams] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (prefersDarkMode ? "dark" : "light");
    setIsDarkMode(theme === "dark");
    document.documentElement.classList.add(theme);
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      setIsLoading(true);

      // Construct query parameters
      const queryParams = new URLSearchParams();

      if (filters.startDate) {
        queryParams.append("start_date", filters.startDate);
      }
      if (filters.endDate) {
        queryParams.append("end_date", filters.endDate);
      }
      if (filters.startTime) {
        queryParams.append("start_time", filters.startTime);
      }
      if (filters.endTime) {
        queryParams.append("end_time", filters.endTime);
      }

      // Construct the full URL with query parameters
      const url = `http://127.0.0.1:8000/api/sensor-data/?${queryParams.toString()}`;

      const res = await axios.get(url);
      setSensorData(res.data.slice(0, 9)); // Limit to 9 sensor cards
      setLastUpdated(new Date());
    } catch (err) {
      setError("Failed to fetch sensor data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterParams);
    const intervalId = setInterval(() => fetchData(filterParams), 60000);
    return () => clearInterval(intervalId);
  }, [filterParams]);

  const handleApplyFilter = (newFilterParams) => {
    setFilterParams(newFilterParams);
  };

  const clearFilter = () => {
    setFilterParams({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilter={handleApplyFilter}
        initialStartDate={filterParams.startDate}
        initialEndDate={filterParams.endDate}
        initialStartTime={filterParams.startTime}
        initialEndTime={filterParams.endTime}
      />

      <Header
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        extraButtons={
          <>
            <motion.button
              onClick={() => setIsFilterModalOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-300 hover:bg-purple-800/30 p-2 rounded-full transition-colors relative"
            >
              <AiOutlineFilter className="text-2xl" />
              {(filterParams.startDate ||
                filterParams.endDate ||
                filterParams.startTime ||
                filterParams.endTime) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            {(filterParams.startDate ||
              filterParams.endDate ||
              filterParams.startTime ||
              filterParams.endTime) && (
              <motion.button
                onClick={clearFilter}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-red-300 hover:bg-red-800/30 p-2 rounded-full transition-colors"
              >
                Clear Filter
              </motion.button>
            )}
          </>
        }
      />

      <div className="min-h-screen pt-20 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Home Automation Dashboard
          </motion.h1>

          {lastUpdated && (
            <div className="text-center text-gray-400 mb-4">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}

          {isLoading ? (
            <div className="text-center text-gray-400 animate-pulse">
              Loading sensor data...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <AnimatePresence>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
