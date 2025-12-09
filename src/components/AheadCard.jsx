import { useEffect, useState } from "react";

export default function AheadCard() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const lat = 25.4683; // example coordinates (Delhi)
        const lon = 81.8546;
        const API_key = "4b43a30b3c401f72af9b02b194211324";

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric
`);
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    }
    fetchWeather();
  }, []);

  if (!weatherData) return <p>Loading...</p>;

  const tempMax = weatherData.main?.temp_max;
  const description = weatherData.weather?.[0]?.description;
  const city = weatherData.name;

  return (
    <section className="card">
      <div className="card-header underline-header">
        <h2>Looking Ahead</h2>
      </div>
      <div>
        <p>
          {city}: High temp of {tempMax}°C, {description}
        </p>
      </div>
    </section>
  );
}
