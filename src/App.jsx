import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState({
    temp: "--",
    city: "Loading...",
    icon: "⛅"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchWeather(lat, lon, label) {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );

        const data = await res.json();

        const temp = Math.round(data.current.temperature_2m);
        const code = data.current.weather_code;

        let icon = "☀️";

        if (code >= 1 && code <= 3) icon = "⛅";
        if (code >= 45) icon = "🌫️";
        if (code >= 51) icon = "🌧️";
        if (code >= 71) icon = "❄️";
        if (code >= 95) icon = "⛈️";

        setWeather({
          temp,
          city: label,
          icon
        });
      } catch {
        setWeather({
          temp: "--",
          city: "Offline",
          icon: "⚪"
        });
      }
    }

    async function detectCity(lat, lon) {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=en`
        );

        const geoData = await geoRes.json();

        if (geoData.results && geoData.results.length > 0) {
          const place = geoData.results[0];

          return (
            place.city ||
            place.town ||
            place.village ||
            place.suburb ||
            place.locality ||
            place.name ||
            null
          );
        }

        return null;
      } catch {
        return null;
      }
    }

    function loadLocationWeather() {
      if (!navigator.geolocation) {
        fetchWeather(12.97, 77.59, "Bengaluru");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const city = await detectCity(lat, lon);

          fetchWeather(
            lat,
            lon,
            city || "Bengaluru"
          );
        },
        () => {
          fetchWeather(12.97, 77.59, "Bengaluru");
        }
      );
    }

    loadLocationWeather();

    const interval = setInterval(loadLocationWeather, 1800000);

    return () => clearInterval(interval);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, "0");
  const displayHour = ((hour + 11) % 12 + 1);

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  return (
    <div className={`halo-container ${theme}`}>
      <div className="clock-widget">
        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌑" : "☀️"}
        </button>

        <div className="ticks"></div>

        <div className="clock-center">
          <p className="greeting">{greeting}</p>

          <div className="time-row">
            <span className="hour">{displayHour}</span>
            <span className="colon">:</span>
            <span className="minute">{minute}</span>
          </div>

          <p className="date">
            {time.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric"
            })}
          </p>

          <p className="weather-line">
            {weather.temp}° • {weather.city} {weather.icon}
          </p>
        </div>
      </div>
    </div>
  );
}