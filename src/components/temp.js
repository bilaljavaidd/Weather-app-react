import React, { useEffect, useState } from "react";
import "./style.css"
import humidity from "../images/humidity-dark.png"
import wind from "../images/wind-dark.png"
import visibility from "../images/visibility-dark.png"
import pressure from "../images/pressure-dark.png"
import doodle from "../images/doodle.png"



const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('');
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=52008e0807c7194ee1f1d0750bf3f0d0&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('City not found'); // Handle invalid city
        }

        const resJson = await response.json();
        console.log(resJson);
        setCity(resJson);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.log(error.message);
        const meraError = <div className="notFoundDiv">  <h3 className="opps" > Oopss!</h3>  <p className="NotFoundError"> city not found  ): </p> </div>
        setCity(null);
          setError(meraError); 
       
        
      }
    };

    if (search.trim() !== '') {
      setShowPrompt(false); // Hide the prompt when the user starts searching
      fetchApi();
    }
  }, [search]);

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const roundTemperature = (temperature) => {
    return Math.round(temperature);
  };

  return (
    <>
      <div className="mainDiv">

       <div className="title" >

        <h1 className="weatherApp" >Weather App</h1>
       </div>

        <div className="box">
          <div className="inputData">
            <input
              placeholder="Search city..."
              type="search"
              className="inputFields"
              onChange={(event) => setSearch(event.target.value)}
            ></input>
            {showPrompt && <div className="prompt"> <img className="doodle" src={doodle} /> <p className="searchingPara" >Enter a city name to get the weather forecast...</p> </div>}
            {error && <p className="error">{error}</p>}
            {city && !error && (
              <>
                <div className="temp-section">
                  <h1 className="temp">
                    {roundTemperature(city.main && city.main.temp)}°C
                  </h1>
                  <div className="min-max">
                    <p>Max {city?.main?.temp_max} °C</p>
                    <p>Min {city?.main?.temp_min} °C</p>
                  </div>
                  <img
                    className="image"
                    src={`https://openweathermap.org/img/wn/${
                      city.weather && city.weather[0]?.icon
                    }.png`}
                  />
                </div>
                <h2 className="feelslike">
                  {city.weather && city.weather[0].main} | Feels like{' '}
                  {roundTemperature(city?.main?.feels_like)}°C
                </h2>
                <h1 className="city">
                  {city.name},<span className="country">{city?.sys?.country}</span>
                </h1>
                <div className="bottomdata">
                  <h4>{time.toLocaleTimeString()}</h4>
                  <div className="details_section">
                    <div className="details">
                      <div className="col">
                        <img id="humidity" alt="" src={humidity} />
                        <div className="info_text">
                          <p className="humidity">{city?.main?.humidity}%</p>
                          <p>Humidity</p>
                        </div>
                      </div>
                      <div className="col">
                        <img id="wind" alt="" src={wind} />
                        <div className="info_text">
                          <p className="wind">{city?.wind?.speed} km/hr</p>
                          <p>Wind Speed</p>
                        </div>
                      </div>
                      <div className="col">
                        <img id="visibility" alt="" src={visibility} />
                        <div className="info_text">
                          <p className="visibility">10 KM</p>
                          <p>Visibility</p>
                        </div>
                      </div>
                      <div className="col">
                        <img id="pressure" alt="" src={pressure} />
                        <div className="info_text">
                          <p className="pressure">{city?.main?.pressure} hPA</p>
                          <p>Pressure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tempapp;

