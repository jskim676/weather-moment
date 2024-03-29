import './App.css';
import MainWeather from './components/mainWeather/main-weather';
import SearchBar from './components/searchBar';

function App() {
  const getWeatherData = (cityData) => {
    const [latitude, longitude] = cityData.value.split(" ");
    console.log(latitude);
    console.log(longitude);
  }

  return (
    <div className="container">
        <MainWeather/>
        <SearchBar onSearchChange={getWeatherData}/>
    </div>
  );
}

export default App;