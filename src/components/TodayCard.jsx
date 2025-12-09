import { useState, useEffect } from "react";
import DateTime from "./DateTime";

export default function TodayCard({ apiKey }) {
  const [todayData, setTodayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        const lat = 28.6139; // example coordinates (Delhi)
        const lon = 77.2090;
        const API_key = "4b43a30b3c401f72af9b02b194211324";

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric
`
        );
        if (!res.ok) throw new Error("Failed to fetch today's weather");

        const data = await res.json();
        setTodayData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToday();
  }, [apiKey]);

  if (loading) return <p>Loading today's weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="card">
      <div className="card-header underline-header">
        <h2>TODAY’S WEATHER</h2>
        <DateTime />
      </div>
      <div>
        <p style={{textTransform: "capitalize"}}>{todayData.weather[0].description}</p>
        <p>
          <strong>Low Temp: {todayData.main.temp_min ?? todayData.main.temp}°C</strong>
        </p>
        <p>
          <strong>High Temp: {todayData.main.temp_max ?? todayData.main.temp}°C</strong>
        </p>
      </div>
    </section>
  );
}

