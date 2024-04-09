import React, { useState, useEffect } from 'react';
import moment from "moment";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import "./main-weather.css"

const MainWeather = () => {
    const [mainWeather, setMainWeather] = useState(null);
    

    useEffect(() => {
        const mainLocation = localStorage.getItem("mainLocation");
        if (mainLocation) {
            const [latitude, longitude] = mainLocation.split(",");
            fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
                .then(async (response) => {
                    const weatherResponse = await response.json();
                    setMainWeather({ city: localStorage.getItem("mainCity"), ...weatherResponse });
                })
                .catch(console.log);
        }
    }, [localStorage.getItem("mainLocation")]);

    let timezoneInMinutes = 0;
    let currTime = "";

    if (mainWeather) {
        timezoneInMinutes = Number(mainWeather.timezone) / 60;
        currTime = moment().utcOffset(timezoneInMinutes).format("A h:mm");
    }



    return (
        <div className="main-weather">
            {mainWeather && (
                <>
                    <img className="weather-icon" src={`icon/clear-day.svg`} alt="weather icon" />
                    <div className="weather-info">
                        <div className="section">
                            <p className="city-info">{mainWeather.city}</p>
                            <p className="temperature-info">{Math.round(mainWeather.main.temp)}°C</p>
                        </div>
                        <p className="time-info">{currTime}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default MainWeather;
