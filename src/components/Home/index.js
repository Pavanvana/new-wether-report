import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";
import FavoritePlace from "../FavoritePlace";

import "./index.css";

const favoriteCitiesList = [
  {
    id: 1,
    place: "Hyderabad",
  },
  {
    id: 2,
    place: "London",
  },
  {
    id: 3,
    place: "kolkata",
  },
  {
    id: 4,
    place: "Srikakulam",
  },
  {
    id: 5,
    place: "Mumbai",
  },
];

const Home = () => {
  const [location, setLocation] = useState("Srikakulam");
  const [searchInput, setSearchInput] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [weatherImg, setWeatherImg] = useState("");
  const [temp, setTemp] = useState("");
  const [cityName, setCityName] = useState("");
  const [newCityInput, setNewCityInput] = useState("");
  const [favoriteCities, setFavoriteCities] = useState(favoriteCitiesList);
  const [myLocation, setMyLocation] = useState("");

  useEffect(() => {
    getWetherReport();
  }, []);

  const getWetherReport = async () => {
    const apikey = "0af51ad90c53822d9bf1381557e1fb25";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}&units=metric`;
    const options = {
      method: "Get",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      const temp = Math.round(data.main.temp);
      const windSpeed = data.wind.speed;
      const humidity = data.main.humidity;
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
          "https://res.cloudinary.com/daflxmokq/image/upload/v1683970736/clear_thujux.png";
      }

      setCityName(cityName);
      setWeatherImg(weatherImg);
      setTemp(temp);
      setHumidity(humidity);
      setWindSpeed(windSpeed);
    } else {
      alert(data.message);
    }
  };

  const onChangeCity = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearchButton = () => {
    setLocation(searchInput);
    setSearchInput("");
    getWetherReport();
  };

  const addNewCityInput = (event) => {
    setNewCityInput(event.target.value);
  };

  const onClickButton = () => {
    const newCity = {
      id: uuidV4(),
      place: newCityInput,
    };
    setFavoriteCities([...favoriteCities, newCity]);
    setNewCityInput("");
  };

  const onClickLocationButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setMyLocation(
          position.coords.latitude + "," + position.coords.longitude
        );
        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=&{position.coords.longitude}&localityLanguage=eng`;
        const options = {
          method: "GET",
        };
        const response = await fetch(geoApiUrl, options);
        const data = await response.json();
        setLocation(data.city);
        getWetherReport();
      });
    }
  };

  return (
    <div className="app-container">
      <div className="wether-report-container">
        <h1 className="heading">Wether Report</h1>
        <div className="search-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search..."
            onChange={onChangeCity}
            value={searchInput}
          />
          <button className="icon-button" onClick={onClickSearchButton}>
            <HiOutlineSearch />
          </button>
          <button className="icon-button" onClick={onClickLocationButton}>
            <HiOutlineLocationMarker />
          </button>
          <p className="degrees">°C | °F</p>
        </div>
        <div className="wether">
          <img src={weatherImg} className="wether-icon" alt="wether icon" />
          <h1 className="temp">{temp}°C</h1>
          <h2 className="city">{cityName}</h2>
          <div className="details">
            <div className="each-details">
              <img
                className="humidity-img"
                src="https://res.cloudinary.com/daflxmokq/image/upload/v1683970998/humidity_tgjwbf.png"
                alt="humidity"
              />
              <p className="humidity-num">{humidity}%</p>
              <p className="humidity-num">Humidity</p>
            </div>
            <div className="each-details">
              <img
                className="wind-speed-img"
                src="https://res.cloudinary.com/daflxmokq/image/upload/v1683971067/wind_zvfown.png"
                alt="wind speed"
              />
              <p className="humidity-num">{windSpeed} km/h</p>
              <p className="humidity-num">Wind Speed</p>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="favorite-place-heading-container">
            <h1 className="favorite-place-heading">Favorite Citys</h1>
            <div className="new-city-input-container">
              <input
                onChange={addNewCityInput}
                className="type-newcity-input"
                placeholder="Type new city..."
                type="text"
                value={newCityInput}
              />
              <button
                onClick={onClickButton}
                type="button"
                className="add-city-button"
              >
                Add
              </button>
            </div>
          </div>
          <ul className="list-container">
            {favoriteCities.map((each) => (
              <FavoritePlace key={each.id} eachPlace={each} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
