"use client";

import { motion } from "framer-motion";
import { Calendar, Cloud, Droplets, Wind } from "lucide-react";
import { getWeatherIcon, getWeatherDescription } from "@/lib/weather";

interface ForecastGridProps {
  data: {
    daily: {
      time: string[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
      weather_code: number[];
    };
  };
}

export default function ForecastGrid({ data }: ForecastGridProps) {
  const { daily } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      {daily.time.slice(0, 5).map((date, index) => (
        <motion.div
          key={date}
          variants={itemVariants}
          className="forecast-item group"
        >
          <div className="flex items-center gap-2 text-slate-400 text-sm mb-3 pb-3 border-b border-slate-700/50">
            <Calendar className="w-4 h-4" />
            {formatDate(date)}
          </div>

          <div className="text-4xl mb-3">
            {getWeatherIcon(daily.weather_code[index])}
          </div>

          <div className="text-xs text-slate-500 mb-4 line-clamp-2">
            {getWeatherDescription(daily.weather_code[index])}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs">High / Low</span>
              <span className="text-indigo-300 font-semibold">
                {Math.round(daily.temperature_2m_max[index])}° /{" "}
                {Math.round(daily.temperature_2m_min[index])}°
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Droplets className="w-3 h-3" />
                Precipitation
              </span>
              <span className="text-indigo-300 font-semibold">
                {daily.precipitation_sum[index].toFixed(1)} mm
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-slate-500 text-xs text-center">
              Click for more details
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
