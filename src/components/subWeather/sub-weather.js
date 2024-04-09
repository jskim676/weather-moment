import React, { useState, useEffect } from 'react';
import moment from "moment";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import "./sub-weather.css"

const SubWeather = () => {
    const [subWeatherList, setSubWeatherList] = useState([]);
    const localStorageKeys = Array.from({ length: 6 }, (_, i) => `sub${i + 1}Location`);

    useEffect(() => {
        const fetchDataForLocation = async (location, city) => {
            const [latitude, longitude] = location.split(",");
            try {
                const response = await fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
                const weatherResponse = await response.json();
                return { city, ...weatherResponse };
            } catch (error) {
                console.error("Error fetching weather data:", error);
                return null;
            }
        };

        const fetchSubWeatherData = async () => {
            const subWeatherData = [];
            for (let i = 1; i <= 6; i++) {
                const location = localStorage.getItem(`sub${i}Location`);
                const city = localStorage.getItem(`sub${i}City`);
                if (location && city) {
                    const weatherData = await fetchDataForLocation(location, city);
                    subWeatherData.push(weatherData);
                }
            }
            setSubWeatherList(subWeatherData);
        };

        fetchSubWeatherData();
    }, [localStorageKeys]); 

    const formatTimeForLocation = (timezone) => {
        const timezoneInMinutes = Number(timezone) / 60;
        return moment().utcOffset(timezoneInMinutes).format("A h:mm");
    };

    return (
        <div className="sub-weather">
            <div className="sub-weather-list">
                {subWeatherList.map((subWeather, index) => (
                    subWeather && (
                        <div key={index} className="sub-weather-item">
                            <img className="weather-icon" src={`icon/clear-day.svg`} alt="weather icon" />
                            <div className="weather-info">
                                <div className="section">
                                    <p className="city-info">{subWeather.city}</p>
                                    <p className="temperature-info">{Math.round(subWeather.main.temp)}°C</p>
                                </div>
                                <p className="time-info">{formatTimeForLocation(subWeather.timezone)}</p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    )
}

export default SubWeather;
