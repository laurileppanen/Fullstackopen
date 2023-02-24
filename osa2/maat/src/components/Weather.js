import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null)
  const apiKey = process.env.REACT_APP_API_KEY

  console.log(weatherData)
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => console.log(error));
  }, [capital, apiKey]);




  if (!weatherData) {
    return null;
  }


  const kuva = weatherData.weather[0].icon
  console.log(kuva)
  const url2 = `http://openweathermap.org/img/wn/${kuva}@2x.png`
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature {weatherData.main.temp} Celcius</p>
      <img src={url2} alt="Missing" height="150" width="150" />
      <p>wind {weatherData.wind.speed} m/s</p>
    </div>
  )
}

export default Weather

