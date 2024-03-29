import React from "react"
import "./main-weather.css"

const mainWeather = (data) => {
    return (
        <div className="main-weather">
            <img className="weather-icon" src={`icon/clear-day.svg`}/>
            <div className="weather-info">
                <div className="section">
                    <p className="city-info">Seoul</p>
                    <p className="temperature-info">16°C</p>
                </div>
                <p className="country-info">south korea</p>
                <p className="time-info">12:00</p>
            </div>
        </div>
    )
}

export default mainWeather