import React, { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Search from "./components/Search";
import Forecast from "./components/Forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.val.split(","); // Update the split format
    const city = searchData.value; // Update the split format

    const fetchWeatherData = fetch(
      `https://weather-data-5j7q.onrender.com/api/weather/details?city=${city}&unit=metric`,
      {
        headers: {
          "proxy-connection": "keep-alive",
          "proxy-host": "https://weather-data-5j7q.onrender.com",
        },
        Origin: "https://react-weather-three-ecru.vercel.app",
      }
    );

    const fetchForecast = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchWeatherData,
        fetchForecast,
      ]);

      if (weatherResponse.status === 200 && forecastResponse.status === 200) {
        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        setWeatherData({ city: searchData.label, ...weatherData });
        setForecast({ city: searchData.label, ...forecastData });
      } else {
        console.log("No corresponding weather or forecast data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Forecast Data:", forecast);
  }, [forecast]); // Log forecast whenever it changes

  return (
    <div className="container">
      <h1>Weather App</h1>
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather weatherData={weatherData} />
      {forecast && forecast.list ? <Forecast forecast={forecast} /> : <p></p>}
    </div>
  );
}

export default App;
