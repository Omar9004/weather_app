

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownMenu from 'react-bootstrap/esm/DropdownMenu.js';
import './App.css';

import { SearchBar } from '../components/search_bar';
import {useState, useEffect} from "react";






function App() {
  const [sResult, setSResult] = useState([]);
  const [dataApi, setData] = useState();
  const [imageState, setImageState] = useState("/images/sunny.png");
  const fetch_data = (city)=>{
    if(sResult.length!=0){
      fetch(`http://127.0.0.1:8000/weather_data/data/?city=${encodeURIComponent(city)}`)
      .then((response)=> {
        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();})
      .then((json)=> {setData(json); setSResult([])})
      .catch((error)=>{
        console.error("Fetch failed:", error);
          });
    }
    
  }

  useEffect(()=>{
    fetch_data(sResult)
  },[sResult]);

  useEffect (()=>{
    if(!dataApi) return;
    switch(dataApi.weatherCon.toLowerCase()){
          case "sunny":
            setImageState("/images/sunny.png");
            break;
          case "partly cloudy":
            setImageState( "/images/partaly_cloudy.png");
            break;
          case "cloudy":
            setImageState( "/images/cloudy.png");
            break;
          case "Heavy rain":
          case "Moderate rain":
          case "Light rain": 
          case "Light drizzle":
            setImageState("/images/kinshasarainy.png");
            break;
          default:
            setImageState("/images/sunny.png"); 
            break;
        }
    
  },[dataApi])


  return (
    <div className="App">
     <div className='Search_bar_container'>
        <SearchBar sResult={(callBackResult)=>{
          setSResult(callBackResult);
        }}/>
      </div>

      <div> 
        <img className="weather_cond_img" src = {imageState}/>
      </div>
    </div>
  );
}

export default App;