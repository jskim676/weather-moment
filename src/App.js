import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainWeather from './components/mainWeather/main-weather';
import SearchBar from './components/searchBar';
import { WEATHER_API_URL, WEATHER_API_KEY } from './components/api';
import MyModal from './components/modal/modal';
import SubWeather from './components/subWeather/sub-weather';

Modal.setAppElement('#root');

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const getWeatherData = (cityData) => {
    const [latitude, longitude] = cityData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();

      setCurrentWeather({ city: cityData.label, ...weatherResponse });
    })
    .catch(console.log);
  }

  
  const handleModalCancel = () => setModalIsOpen(false);

  return (
    <div className="container">
        <MainWeather/>
        <SearchBar 
          getCityName={getWeatherData} 
          modalSwitch={setModalIsOpen}
        />
        <MyModal 
          isOpen={modalIsOpen} 
          onCancel={handleModalCancel} 
          data={currentWeather}
        />
        <SubWeather/>
    </div>
  );
}

export default App;