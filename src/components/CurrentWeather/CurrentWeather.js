import React from "react";
import "./currentWeather.css";

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) {
    return <div></div>;
  }

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{weatherData.city}</p>
          <p className="weather-description">
            {weatherData.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${weatherData.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <div className="tempContainer">
          <p className="temperature">{Math.round(weatherData.main.temp)}&deg;C</p>
          <div className="hl">
            <p>H:{weatherData.main.temp_max}&deg;C</p>
            <p>L:{weatherData.main.temp_min}&deg;C</p>
          </div>
        </div>

        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">
              {Math.round(weatherData.main.feels_like)}&deg;C
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">
              {weatherData.wind.speed} m/s
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">
              {weatherData.main.humidity}%
            </span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">
              {weatherData.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
