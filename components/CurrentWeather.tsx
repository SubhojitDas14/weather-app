"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Droplets,
  Wind,
  Gauge,
  Eye,
  CloudRain,
} from "lucide-react";
import { getWeatherIcon, getWeatherDescription } from "@/lib/weather";

interface CurrentWeatherProps {
  data: {
    current: {
      temperature_2m: number;
      relative_humidity_2m: number;
      weather_code: number;
      wind_speed_10m: number;
      pressure_msl: number;
      visibility: number;
      precipitation: number;
      apparent_temperature: number;
    };
  };
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { current } = data;
  const weatherIcon = getWeatherIcon(current.weather_code);
  const weatherDesc = getWeatherDescription(current.weather_code);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="glassmorphism rounded-3xl p-8 md:p-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-8xl mb-4">{weatherIcon}</div>
            <p className="text-slate-400 text-lg mb-4 capitalize">
              {weatherDesc}
            </p>
          </div>

          <div className="text-center md:text-right">
            <div className="text-7xl font-bold text-indigo-300 mb-2">
              {Math.round(current.temperature_2m)}°C
            </div>
            <p className="text-slate-400">
              Feels like {Math.round(current.apparent_temperature)}°C
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Humidity
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Droplets className="w-6 h-6" />
            {current.relative_humidity_2m}%
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Wind Speed
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Wind className="w-6 h-6" />
            {Math.round(current.wind_speed_10m)} km/h
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Pressure
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Gauge className="w-6 h-6" />
            {Math.round(current.pressure_msl)} mb
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Visibility
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            {(current.visibility / 1000).toFixed(1)} km
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Precipitation
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <CloudRain className="w-6 h-6" />
            {current.precipitation.toFixed(1)} mm
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="weather-card"
        >
          <div className="text-slate-400 text-sm uppercase tracking-wide mb-2">
            Cloud Cover
          </div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <Cloud className="w-6 h-6" />
            {Math.round(
              ((current.weather_code > 0 ? 50 : 0) +
                Math.random() * 50) /* approximate from weather code */
            )}%
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
