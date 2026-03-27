export async function fetchWeatherData(lat: number, lon: number) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,pressure_msl,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) throw new Error("Weather API error");
    const data = await response.json();

    return {
      current: data.current,
      daily: data.daily,
      timezone: data.timezone,
      location: {
        latitude: lat,
        longitude: lon,
      },
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export function getWeatherIcon(weatherCode: number): string {
  if ([0].includes(weatherCode)) return "☀️";
  if ([1, 2].includes(weatherCode)) return "🌤️";
  if ([3].includes(weatherCode)) return "☁️";
  if ([45, 48].includes(weatherCode)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "❄️";
  if ([80, 81, 82].includes(weatherCode)) return "⛈️";
  if ([95, 96, 99].includes(weatherCode)) return "⛈️";
  return "🌍";
}

export function getWeatherDescription(weatherCode: number): string {
  const descriptions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };
  return descriptions[weatherCode] || "Unknown";
}
