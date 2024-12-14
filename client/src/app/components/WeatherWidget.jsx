import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=St+Helens&appid=844c96a2cb5ad34a5d8621fdaad1b41f&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    // Fetch weather data every 30 minutes
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) return <WiThunderstorm />;
    if (weatherCode >= 300 && weatherCode < 600) return <WiRain />;
    if (weatherCode >= 600 && weatherCode < 700) return <WiSnow />;
    if (weatherCode >= 700 && weatherCode < 800) return <WiFog />;
    if (weatherCode === 800) return <WiDaySunny />;
    return <WiCloudy />;
  };

  if (loading) {
    return <div className="text-center">Loading weather data...</div>;
  }

  if (!weather) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 text-center"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Weather data unavailable
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {weather.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="text-4xl text-blue-500 dark:text-blue-400">
          {getWeatherIcon(weather.weather[0].id)}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {Math.round(weather.main.temp)}°C
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Feels like {Math.round(weather.main.feels_like)}°C
        </p>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
