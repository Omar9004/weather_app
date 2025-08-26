

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownMenu from 'react-bootstrap/esm/DropdownMenu.js';
import './App.css';

import { SearchBar } from '../components/search_bar';
import { Weather_con } from '../components/weather_con';
import {useState, useEffect} from "react";






function App() {
  const [sResult, setSResult] = useState([]);
  let emptyJson = {
    "temp": 0,
    "weatherCon": "",
    "location": "",
    "lastUpdate": ""
}
  const [dataApi, setData] = useState(emptyJson);
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

  


  return (
    <div className="App">
      <h1 className='header'>
        Weather App
      </h1>
     <div>
        <SearchBar sResult={(callBackResult)=>{
          setSResult(callBackResult);
        }}/>
      </div>
      <div> 
        <Weather_con weather_data={dataApi}/>
      </div>
      <footer className='weather_footer'>
      Last updated: {dataApi.lastUpdate}
      </footer>
    </div>
    
  );
}

export default App;