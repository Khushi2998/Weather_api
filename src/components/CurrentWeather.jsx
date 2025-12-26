import { useEffect, useState } from "react";
import DateTime from "./DateTime";

export default function CurrentWeather({ apiKey }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeather() {
      try {
      
        const lat = 28.6139;
        const lon = 77.2090;

        const API_key = "4b43a30b3c401f72af9b02b194211324"; 

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        
        setWeather({
          temp: Math.round(data.main.temp),
          realFeel: Math.round(data.main.feels_like),
          condition: data.weather[0].description,
          icon: data.weather[0].icon, 
          wind: `${data.wind.speed} m/s`,
          
          humidity: `${data.main.humidity} %`, 
          
          airQuality: "Unhealthy", 
        });
        
        
      } catch (err) {
        console.error("Weather error:", err);
      }
    }

    getWeather();
  }, [apiKey]);

  if (!weather)
    return (
      <section className="weather-card loading-card">
        <p className="loading">Loading current weather...</p>
      </section>
    );

  return (
    <section className="card">
      {/* Header */}
      <div className="card-header underline-header">
        <h2 className="text-xl font-semibold">Current Weather</h2>
        <span className="text-sm text-gray-500"><DateTime /></span>
      </div>

      {/* Main weather */}
      <div className="flex gap-8">
        {/* Left: Icon + Temp */}
        <div className="flex flex-col items-center justify-center gap-2 w-1/2">
         
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            className="w-16 h-16"
            
            onError={(e) => {
              e.target.style.display = 'none'; 
            }}
          />

          <div className="text-4xl font-bold">{weather.temp}°C</div>
          <p className="capitalize text-gray-700">{weather.condition}</p>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center w-1/2 gap-2">
          <div className="text-gray-600">RealFeel® {weather.realFeel}°C</div>

          <div className="flex flex-col gap-1 text-gray-800">
            <p><strong>Wind:</strong> {weather.wind}</p>
            <p><strong>Humidity:</strong> {weather.humidity}</p>
            <p><strong>Air Quality:</strong> {weather.airQuality}</p>
          </div>
        </div>
      </div>
    </section>
  );
}