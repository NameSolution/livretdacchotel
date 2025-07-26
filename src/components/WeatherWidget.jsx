import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain } from 'lucide-react';

const WeatherWidget = ({ t }) => {
  const weatherData = {
    city: "Lourdes",
    temperature: "22°C",
    description: t.weather.sunny,
    icon: <Sun className="w-10 h-10 text-majestic-gold" />,
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-xl shadow-majestic flex items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center space-x-4">
        {weatherData.icon}
        <div>
          <p className="font-semibold text-majestic-navy">{weatherData.city}</p>
          <p className="text-sm text-slate-600">{weatherData.description}</p>
        </div>
      </div>
      <p className="text-2xl font-bold text-majestic-navy">{weatherData.temperature}</p>
    </motion.div>
  );
};

export default WeatherWidget;