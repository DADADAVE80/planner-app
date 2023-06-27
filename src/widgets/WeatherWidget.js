import React, { useEffect, useState } from "react";
import axios from "axios";
// import geolocation from "geolocation";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=9e67cedb533b5c3cadb57f0c74983825"
      );
      setWeather(response.data);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getWeather();
      });
    } else {
      setWeather({
        name: "Unknown",
        temp: 0,
        weather: [{ description: "Unknown" }],
      });
    }
  }, []);

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ fontWeight: "bold" }}>Current Weather</h1>
      <p>City: {weather.name}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Temperature: {weather.main.temp}°F</p>
      <p>Conditions: {weather.weather[0].description}</p>
    </div>
  );

  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   const getWeather = async () => {
  //     const response = await axios.get(
  //       "https://api.openweathermap.org/data/2.5/weather?q=san+francisco&appid=9e67cedb533b5c3cadb57f0c74983825"
  //     );
  //     setWeather(response.data);
  //   };

  //   getWeather();
  // }, []);

  // if (!weather) {
  //   return <div>Loading...</div>;
  // }

  // return (
  //   <div>
  //     <h1>Current Weather</h1>
  //     <p>City: {weather.name}</p>
  //     <p>Temperature: {weather.main.temp}°F</p>
  //     <p>Conditions: {weather.weather[0].description}</p>
  //   </div>
  // );
}
