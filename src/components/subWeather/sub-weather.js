import React, { useState, useEffect } from 'react';
import moment from "moment";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import "./sub-weather.css"

const SubWeather = () => {
    const [subWeather, setSubWeather] = useState(null);

    useEffect(() => {
        const subLocation = localStorage.getItem("subLocation");
        if (subLocation) {
            const [latitude, longitude] = subLocation.split(",");
            fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)
                .then(async (response) => {
                    const weatherResponse = await response.json();
                    setSubWeather({ city: localStorage.getItem("mainCity"), ...weatherResponse });
                })
                .catch(console.log);
        }
    }, [localStorage.getItem("subLocation")]);

    let timezoneInMinutes = 0;
    let currTime = "";

    if (subWeather) {
        timezoneInMinutes = Number(subWeather.timezone) / 60;
        currTime = moment().utcOffset(timezoneInMinutes).format("A h:mm");
    }


    return (
        <div className="sub-weather">
            {subWeather && (
                <>
                    <img className="weather-icon" src={`icon/clear-day.svg`} alt="weather icon" />
                    <div className="weather-info">
                        <div className="section">
                            <p className="city-info">{subWeather.city}</p>
                            <p className="temperature-info">{Math.round(subWeather.main.temp)}°C</p>
                        </div>
                        <p className="time-info">{currTime}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default SubWeather;
