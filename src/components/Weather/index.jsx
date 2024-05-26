import axios from "axios";
import React, { useState, useEffect } from "react";

import i01d from "../../assets/icons/01d.png";
import i01n from "../../assets/icons/01n.png";
import i02d from "../../assets/icons/02d.png";
import i02n from "../../assets/icons/02n.png";
import i03d from "../../assets/icons/03d.png";
import i03n from "../../assets/icons/03n.png";
import i04d from "../../assets/icons/04d.png";
import i04n from "../../assets/icons/04n.png";
import i09d from "../../assets/icons/09d.png";
import i09n from "../../assets/icons/09n.png";
import i10d from "../../assets/icons/10d.png";
import i10n from "../../assets/icons/10n.png";
import i11d from "../../assets/icons/11d.png";
import i11n from "../../assets/icons/11n.png";
import i13d from "../../assets/icons/13d.png";
import i13n from "../../assets/icons/13n.png";
import i50d from "../../assets/icons/50d.png";
import i50n from "../../assets/icons/50n.png";
import UnknownIcon from "../../assets/icons/unknown.png";

import "./index.css";

const iconMap = {
  "01d": i01d,
  "01n": i01n,
  "02d": i02d,
  "02n": i02n,
  "03d": i03d,
  "03n": i03n,
  "04d": i04d,
  "04n": i04n,
  "09d": i09d,
  "09n": i09n,
  "10d": i10d,
  "10n": i10n,
  "11d": i11d,
  "11n": i11n,
  "13d": i13d,
  "13n": i13n,
  "50d": i50d,
  "50n": i50n,
};

const Weather = () => {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      getWeather(latitude, longitude);
      setLocation(true);
    };

    const handleError = () => {
      setError("Localização não permitida.");
      setLocation(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const getWeather = async (lat, long) => {
    try {
      const res = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat: lat,
            lon: long,
            appid: "64ed82577ced7f69cb1687f0ce536131",
            lang: "pt",
            units: "metric",
          },
        }
      );
      setWeather(res.data);
    } catch (error) {
      setError("Erro ao obter dados do clima.");
      setWeather(null);
    }
  };

  if (error) {
    return (
      <div className="weather-warning">
        <span>
          <img src={UnknownIcon} alt="Erro" />
          <p>{error}</p>
        </span>
      </div>
    );
  }

  if (location === false) {
    return (
      <div className="weather-warning">
        <span>
          <img src={UnknownIcon} alt="Localização desligada" />
          <p>Obtendo localização...</p>
        </span>
      </div>
    );
  }

  if (weather === null) {
    return (
      <div>
        <span className="loading">Carregando...</span>
      </div>
    );
  }

  const weatherIcon =
    weather.weather && weather.weather[0]
      ? iconMap[weather.weather[0].icon]
      : UnknownIcon;

  const weatherClass =
    weather.weather && weather.weather[0]
      ? `weather-${weather.weather[0].icon}`
      : "weather-unknown";

  return (
    <div className={`weather ${weatherClass}`}>
      <div className="icon-mobile">
        <img src={weatherIcon} alt="Ícone do clima" />
      </div>
      <div className="content">
        <div className="icon-temp">
          <div className="icon-desktop">
            <img src={weatherIcon} alt="Ícone do clima" />
          </div>
          <div className="temp">
            <span>{weather.main.temp.toFixed(0)}°</span>
          </div>
        </div>
        <div className="temp-text">
          <p>{weather.weather[0].description}</p>
        </div>
        <span className="place">
          {weather.name} - {weather.sys.country}
        </span>
      </div>
    </div>
  );
};

export default Weather;
