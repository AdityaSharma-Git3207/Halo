import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  const minute = time.getMinutes().toString().padStart(2, "0");
  const displayHour = ((hour + 11) % 12 + 1);

  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`halo-container ${theme}`}>
      <div className="clock-widget">
        <button className="theme-btn" onClick={toggleTheme}>
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
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}