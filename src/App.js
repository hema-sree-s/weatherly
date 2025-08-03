import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '17ff3f63dba24ae8a4412748250308'; // Replace with your WeatherAPI key

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      const data = await res.json();

      if (data.error) {
        setError(data.error.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  const getWeatherEmoji = (conditionText) => {
    const lower = conditionText.toLowerCase();
    if (lower.includes('sun') || lower.includes('clear')) return '☀️';
    if (lower.includes('cloud')) return '☁️';
    if (lower.includes('rain')) return '🌧️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('thunder')) return '⛈️';
    if (lower.includes('fog') || lower.includes('mist') || lower.includes('haze')) return '🌫️';
    return '🌤️';
  };

  const formatDate = () => {
    return new Date().toLocaleString();
  };

  return (
    <div className="weather-container" style={{ padding: '20px', minHeight: '100vh' }}>
      <div className="weather-box">
        <h2>Weatherly 🌤</h2>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="result">
            <h3>{weather.location.name}, {weather.location.country}</h3>
            <img src={weather.current.condition.icon} alt="icon" />
            <p><strong>{weather.current.condition.text} {getWeatherEmoji(weather.current.condition.text)}</strong></p>
            <p>Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {weather.current.wind_kph} kph</p>
            <p>{formatDate()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
