import { useState, useEffect } from "react";
import './weather_con.css';

export const Weather_con = (({weather_data})=>{
  const [imageState, setImageState] = useState("/images/sunny.png");
  const [dataInfo,setDataInfo] = useState("-");
  useEffect (()=>{
    if(dataInfo == '-') return;
    console.log(dataInfo.weatherCon);

    switch(dataInfo.weatherCon.toLowerCase()){
          case "sunny":
            setImageState("/images/sunny.png");
            break;
          case "partly cloudy":
            setImageState( "/images/partaly_cloudy.png");
            break;
          case "cloudy":
            setImageState( "/images/cloudy.png");
            break;
          case "heavy rain":
          case "moderate rain":
          case "light rain": 
          case "light drizzle":
            setImageState("/images/rainy.png");
            break;
          default:
            setImageState("/images/sunny.png"); 
            break;
        }
    
  },[dataInfo])
  useEffect(()=>{
    console.log(weather_data);
    setDataInfo(weather_data);
  },[weather_data] )
    return(
        <div className="weather_cond_container">
            <div className="weather_cond_wrapper">
                <div className="weather_location">{dataInfo.location}</div>
                <img className="weather_cond_img" src={imageState} alt="Weather Icon" />
                <div className="weather_condition">{dataInfo.weatherCon}</div>
                <div className="weather_temp">{dataInfo.temp}°C</div>
            </div>
        </div>
    )
})