import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import './components/Card/Card'
import Card from "./components/Card/Card";
import Wind from "./components/Card/img/wind.png";
import obs from "./components/Card/img/observation.png";
import humidity from "./components/Card/img/hum.png";
import clear from "./components/Card/img/clear.png";
import cloud from "./components/Card/img/clouds.png";
import drizzle from "./components/Card/img/drizzle.png";
import humidity1 from "./components/Card/img/humidity.png";
import mist from "./components/Card/img/mist.png";
import rain from "./components/Card/img/rain.png";
import search from "./components/Card/img/search.png";
import snow from "./components/Card/img/snow.png";
import wind from "./components/Card/img/wind.png";



export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [weatherDescription, setWeatherDescription] = useState("");
  const [wicon, setWicon] = useState(cloud);


  async function loadWeatherData() {

    let data = ""

    try {
      data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)

    }
    catch (error) {
      console.log(error);
    }


    setWeatherData(data.data);
  }



  useEffect(() => {
    loadWeatherData();
  }, [])

  useEffect(() => {
    loadWeatherData();
  }, [city]);

  useEffect(() => {
    setWeatherDescription(`${weatherData?.weather?.[0]?.main} 
  (${weatherData?.weather?.[0]?.description}) `);
  }, [weatherData]);

  useEffect(() => {
    if (weatherDescription === "Clouds") {
      setWicon(cloud);
    } else if (weatherData?.weather?.[0]?.main === "Clear") {
      setWicon(clear);
    } else if (weatherData?.weather?.[0]?.main === "Rain") {
      setWicon(rain);
    } else if (weatherData?.weather?.[0]?.main === "Drizzle") {
      setWicon(drizzle);
    } else if (weatherData?.weather?.[0]?.main === "Mist") {
      setWicon(mist);
    } else if (weatherData?.weather?.[0]?.main === "Humidity") {
      setWicon(humidity1);
    } else if (weatherData?.weather?.[0]?.main === "Snow") {
      setWicon(snow);
    } else if (weatherData?.weather?.[0]?.main === "Mist") {
      setWicon(mist);
    } else if (weatherData?.weather?.[0]?.main === "Search") {
      setWicon(search);
    } else if (weatherData?.weather?.[0]?.main === "Wind") {
      setWicon(wind);
    }
  }, [weatherDescription, weatherData]);

  return (
    <div>
      <div className="top-container">
       <h1>GET CHECK WEATHER</h1>
       <div className="inputContainer">
       
        <input className="input-search" type="text" placeholder="Enter city " value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        </div>
      </div>



      <div className="card-container">

     
      <div className="d-flex">
      <div className="conainer-flex">
         <img src={wicon} alt="asd" />
         </div>
          <div className="conainer-flex">
          
          <p className="city-name"> {weatherData?.name}</p>
          <p className="temp">
            {" "}
            {(weatherData?.main?.temp - 273).toFixed(2)} °C
          </p>
           
          </div>
        </div>
<div className="app-card-container">
        <Card head={'Wind'} Img={Wind} report={(weatherData?.wind?.speed)} unit=" km/h" />

        <Card head={'Visibility'} Img={obs} report={(weatherData?.visibility)} unit=" Mtr" />

        <Card head={'Humidity'} Img={humidity} report={(weatherData?.main?.humidity)} unit="° F" />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  
  )
}
