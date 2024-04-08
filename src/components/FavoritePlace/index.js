import React, { useEffect, useState } from "react";

import "./index.css";

const FavoritePlace = (props) => {
  const { eachPlace } = props;
  const { place } = eachPlace;

  const [temp, setTemp] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherImg, setWeatherImg] = useState("");

  useEffect(() => {
    getWetherReport();
  }, []);

  const getWetherReport = async () => {
    const apikey = "0af51ad90c53822d9bf1381557e1fb25";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}&units=metric`;
    const options = {
      method: "Get",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const temp = Math.round(data.main.temp);
      const cityName = data.name;

      const weather = data.weather[0].main;
      let weatherImg = "";
      if (weather === "Clouds") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683970963/clouds_m52inv.png";
      } else if (weather === "Clear") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683970736/clear_thujux.png";
      } else if (weather === "Rain") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683971038/rain_wfere4.png";
      } else if (weather === "Snow") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683971050/snow_ncugah.png";
      } else if (weather === "Mist") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683971020/mist_ljptru.png";
      } else if (weather === "Haze") {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683970982/drizzle_ra2d9s.png";
      } else {
        weatherImg =
          "https://res.cloudinary.com/daflxmokq/image/upload/v1684040672/1497075_issr2r.png";
      }

      setTemp(temp);
      setWeatherImg(weatherImg);
      setCityName(cityName);
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      {cityName !== "" && (
        <li className="list-item">
          <img className="weather-img" src={weatherImg} alt="weather-img" />
          <p className="temp-num">{temp}°C</p>
          <h1 className="city-name">{cityName}</h1>
        </li>
      )}
    </>
  );
};

export default FavoritePlace;
