"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, MapPin, Loader2 } from "lucide-react";
import CurrentWeather from "./CurrentWeather";
import ForecastGrid from "./ForecastGrid";
import Header from "./Header";

interface WeatherData {
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
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
  };
  timezone: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
          setError("Geolocation is not supported by your browser");
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });

              const response = await fetch(
                `/api/weather?lat=${latitude}&lon=${longitude}`
              );

              if (!response.ok) throw new Error("Failed to fetch weather");

              const data = await response.json();
              setWeatherData(data);
            } catch (err) {
              const message =
                err instanceof Error ? err.message : "Failed to load weather data";
              setError(message);
            } finally {
              setLoading(false);
            }
          },
          (err) => {
            console.error("Geolocation error:", err);
            setError("Unable to access your location. Please enable location services.");
            setLoading(false);
          }
        );
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load weather data";
        setError(message);
        setLoading(false);
      }
    };

    getWeather();
  }, []);

  const getBackgroundClass = () => {
    if (!weatherData) return "";

    const code = weatherData.current.weather_code;
    if ([0, 1, 2].includes(code)) return "animated-bg-sunny";
    if ([45, 48].includes(code)) return "animated-bg-cloudy";
    if ([51, 53, 55, 61, 63, 65, 71, 73, 75, 80, 81, 82].includes(code))
      return "animated-bg-rainy";
    if ([95, 96, 99].includes(code)) return "animated-bg-stormy";
    return "animated-bg-cloudy";
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 relative overflow-hidden ${getBackgroundClass()}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50 pointer-events-none" />

      <div className="relative z-10">
        <Header session={session} onSignOut={signOut} />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
              <p className="text-slate-300">Loading weather data...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 text-center"
            >
              <p className="text-red-200">{error}</p>
            </motion.div>
          ) : weatherData ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 text-slate-300 mb-4">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>
                    {location?.latitude.toFixed(2)}, {location?.longitude.toFixed(2)}
                  </span>
                </div>
              </motion.div>

              <CurrentWeather data={weatherData} />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-12"
              >
                <h2 className="text-3xl font-bold mb-6 text-white">
                  5-Day Forecast
                </h2>
                <ForecastGrid data={weatherData} />
              </motion.div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
