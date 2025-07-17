import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using OpenWeatherMap API 
        const API_KEY = "c72bffcc60f61e7f4c7e10658430ae8e";
        const city = "Barrie"; 
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
          throw new Error("Weather data not available");
        }
        
        const data = await response.json();
        setWeather(data);
        setError(null);
      } catch (err) {
        setError("Unable to fetch weather data");
        console.error("Weather API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="widget-header">
          <h3>Weather</h3>
        </div>
        <div className="loading-state">Loading weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="widget-header">
          <h3>Weather</h3>
        </div>
        <div className="error-state">{error}</div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="widget-header">
        <h3>Weather</h3>
        <span className="location">{weather?.name}</span>
      </div>
      
      {weather && (
        <div className="weather-content">
          <div className="weather-main">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <span className="label">Humidity:</span>
              <span className="value">{weather.main.humidity}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget; 