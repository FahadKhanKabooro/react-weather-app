import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
export default function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    image: "/images/clouds.png",
  });
  const [name, setName] = useState("");
  //   useEffect(() => {}, []);    Now i dont Need USeEffect Hook
  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3733a6748b98e8d31d222d31443a6257&&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          if (res.data.weather[0].main == "Clouds") {
            imagePath = "/images/clouds.png";
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = "/images/clear.png";
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = "/images/rain.png";
          } else if (res.data.weather[0].main == "Drizzle") {
            imagePath = "/images/drizzle.jpg";
          } else if (res.data.weather[0].main == "Mist") {
            imagePath = "/images/Mist.png";
          } else {
            imagePath = "/images/clouds.png";
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <img src="images/search.jpg" alt="" onClick={handleClick} />
          </button>
        </div>
        <div className="weather-info">
          <img src={data.image} alt="" className="icon" />
          <h1>{Math.round(data.celcius)}°c</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/images/humidity.jpg" alt="" />
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/images/wind.jpg" alt="" />
              <div>
                <p>{Math.round(data.speed)}</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
