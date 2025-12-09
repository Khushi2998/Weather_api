// HourlyForecast.jsx
import React, { useEffect, useState } from "react";
import Header from "./header";
import Tabs from "./Tabs";
import News from "./News";

const HourlyForecast = () => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const lat = 28.6139;
        const lon = 77.209;
        const API_key = "4b43a30b3c401f72af9b02b194211324"; 
        

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        
        
        setHourlyData(data.list ? data.list.slice(0, 8) : []); 
      } catch (err) {
        console.error("Error fetching forecast data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  if (loading) return <p>Loading 3-hour forecast...</p>;

return (
  <>
    <Header />
    <Tabs />

    <div className="flex gap-10">
      {/* Hourly Forecast */}
      <section className="card" style={{ flex: '0 0 auto' }}>
        <div className="card-header underline-header">
          <h2>Hourly (3-Hour) Forecast</h2>
        </div>
        {/* Scrollable inner div */}
        <div style={{ display: "flex", overflowX: "auto", padding: "10px" }}>
          {hourlyData.length > 0 ? (
            hourlyData.map((hour) => (
              <div
                key={hour.dt}
                style={{
                  padding: "10px",
                  minWidth: "100px",
                  textAlign: "center",
                  borderRight: "1px solid #eee",
                  flexShrink: 0, // important so items don't shrink
                }}
              >
                <p style={{ fontWeight: "bold" }}>
                  {new Date(hour.dt * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather?.[0]?.icon}@2x.png`}
                  alt={hour.weather?.[0]?.description}
                  style={{ width: "50px", height: "50px" }}
                />
                <p>{Math.round(hour.main.temp)}°C</p>
                <p style={{ fontSize: "0.7em", textTransform: "capitalize" }}>
                  {hour.weather?.[0]?.description || "N/A"}
                </p>
              </div>
            ))
          ) : (
            <p>No 3-hour forecast data available.</p>
          )}
        </div>
      </section>

      {/* News Section */}
      <section style={{ flex: 1 }}>
        <News />
      </section>
    </div>
  </>
);


};
export default HourlyForecast;

