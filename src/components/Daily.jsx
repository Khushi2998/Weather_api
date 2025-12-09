// DailyForecast.jsx
import React, { useEffect, useState } from "react";
import Header from "./header";
import Tabs from "./Tabs";
import News from "./News";

const DailyForecast = () => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        // Coordinates for New Delhi (28.6139, 77.209)
        const lat = 28.6139;
        const lon = 77.209;
        const API_key = "4b43a30b3c401f72af9b02b194211324"; 
        
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
        );
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        
        if (!data.list) throw new Error("Forecast data list is missing.");
        
        const processedDailyData = processForecastToDaily(data.list);
        setDailyData(processedDailyData);
        
      } catch (err) {
        console.error("Error fetching forecast data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  
  const processForecastToDaily = (list) => {
    if (!list) return [];
    
   
    const dailyMap = {};

    list.forEach(item => {
      const dateObj = new Date(item.dt * 1000);
      const dateKey = dateObj.toISOString().split('T')[0];
      const hour = dateObj.getUTCHours(); // Use UTC hours for consistency with the API's 3-hour blocks

      if (!dailyMap[dateKey]) {
        // Initialize the day with the first data point
        dailyMap[dateKey] = {
          date: item.dt * 1000,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          // Store the weather object and the time for later comparison
          weather: item.weather[0],
          timeDiffToNoon: Math.abs(hour - 12), // Initial difference
        };
      } else {
        // Update min and max temps
        dailyMap[dateKey].minTemp = Math.min(dailyMap[dateKey].minTemp, item.main.temp_min);
        dailyMap[dateKey].maxTemp = Math.max(dailyMap[dateKey].maxTemp, item.main.temp_max);
        
        // Find the forecast entry closest to 12 PM (noon) for a representative icon/description
        const currentDiff = Math.abs(hour - 12);
        if (currentDiff < dailyMap[dateKey].timeDiffToNoon) {
            dailyMap[dateKey].weather = item.weather[0];
            dailyMap[dateKey].timeDiffToNoon = currentDiff;
        }
      }
    });

    // Convert the map back to an array, sort by date, and return the next 5 days
    // Sorting by date is good practice since Object.values() order is not guaranteed
    return Object.values(dailyMap)
        .sort((a, b) => a.date - b.date)
        .slice(0, 5); 
  };

  if (loading) return <p>Loading daily forecast...</p>;

  return (
    <>
      <Header />
      <Tabs/>
      <div className="flex gap-10">
      
        
        
        <section className="card">
          <div className="card-header underline-header">
            <h2>5-Day Forecast</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", padding: "10px" }}>
            {dailyData.length > 0 ? (
              dailyData.map((day) => (
                <div key={day.date} style={{ textAlign: 'center', padding: '10px', minWidth: '100px' }}>
                  <p style={{ fontWeight: 'bold' }}>
                    {/* Format date to Day, Month Date */}
                    {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <img
                    // Note: day.weather is the single object {id, main, description, icon}
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    alt={day.weather.description}
                    style={{ width: '50px', height: '50px' }}
                  />
                  {/* Display Max and Min Temperature */}
                  <p>H: {Math.round(day.maxTemp)}°C</p>
                  <p>L: {Math.round(day.minTemp)}°C</p>
                  <p style={{ fontSize: '0.7em', textTransform: 'capitalize' }}>{day.weather.description}</p>
                </div>
              ))
            ) : (
              <p>No daily forecast data available.</p>
            )}
          </div>
        </section>

        {/* News section */}
        <section style={{ flex: 1 }}>
          <News />
        </section>
      </div>
    </>
  );
};

export default DailyForecast;
