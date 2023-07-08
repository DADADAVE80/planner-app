import React, { useEffect, useState } from "react";
import axios from "axios";

//This is the main function of the component.
export default function WeatherWidget() {
  //These are the state variables that will be used to store the current weather data.
  const [weather, setWeather] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //This function is called when the component mounts. It gets the current weather data from the OpenWeatherMap API.
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

    //If the browser supports geolocation, get the current latitude and longitude.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getWeather();
      });
    } else {
      //If the browser doesn't support geolocation, set the weather data to an unknown value.
      setWeather({
        name: "Unknown",
        temp: 0,
        weather: [{ description: "Unknown" }],
      });
    }
  }, []);

  //This condition checks if the weather data has been loaded. If it hasn't, it returns a loading message.
  if (!weather) {
    return <div>Loading...</div>;
  }

  //This returns the rendered HTML for the component.
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
}
