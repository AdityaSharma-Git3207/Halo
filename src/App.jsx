import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState("light");
  const [weather, setWeather] = useState({
    temp: "--",
    city: "Bengaluru",
    icon: "⛅"
  });

  /* CLOCK */
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* WEATHER */
  useEffect(() => {
    async function fetchWeather(lat, lon, cityLabel) {
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
          city: cityLabel,
          icon
        });
      } catch {
        setWeather({
          temp: "--",
          city: "Bengaluru",
          icon: "⚪"
        });
      }
    }

    function loadWeather() {
      if (!navigator.geolocation) {
        fetchWeather(12.97, 77.59, "Bengaluru");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(
            pos.coords.latitude,
            pos.coords.longitude,
            "Bengaluru"
          );
        },
        () => {
          fetchWeather(12.97, 77.59, "Bengaluru");
        }
      );
    }

    loadWeather();

    const interval = setInterval(loadWeather, 1800000);

    return () => clearInterval(interval);
  }, []);

  /* ELECTRON WINDOW THEME SYNC */
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.setTheme(theme);
    }
  }, [theme]);

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

          {/* key forces smooth re-mount animation every minute */}
          <div
            className="time-row"
            key={`${displayHour}-${minute}`}
          >
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