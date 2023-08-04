import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });
  useEffect(() => {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=jamshoro&appid=3733a6748b98e8d31d222d31443a6257&&units=metric";
    axios.get(apiUrl).then((res) => {
      setData({
        ...data,
        celcius: res.data.main.temp,
        name: res.data.name,
        humidity: res.data.main.humidity,
        speed: res.data.wind.speed,
      });
    });
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter City Name" />
          <button>
            <img src="images/search.jpg" alt="" />
          </button>
        </div>
        <div className="weather-info">
          <img src="/images/weather1.png" alt="" className="icon" />
          <h1>{data.celcius}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.jpg" alt="" />
              <div>
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.jpg" alt="" />
              <div>
                <p>{data.speed}</p>
                <p>{data.wind}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
