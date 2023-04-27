import './App.css';
import React, {useEffect, useState} from 'react';
import Weather from './components/Weather'

function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  const REACT_APP_API_URL = 'https://api.openweathermap.org/data/2.5'
  const REACT_APP_API_KEY = 'be6fa5cfc9fc6ac6ceee621967176289'
  const REACT_APP_ICON_URL = 'https://openweathermap.org/img/w'

  useEffect(() => {
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)

    await fetch(`${REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
  }
    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData = {data} />
      ):(
        <div></div>
      )}
    </div>
  );
}

export default App;
