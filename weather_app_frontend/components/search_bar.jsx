
import {useState, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import { SearchBar_result } from "./searchBar_result";
import './search_bar.css';


// import './serach_bar_list.css';



export const SearchBar = ({sResult})=> {
  const[lines, setLines] = useState([]);
  const[filterCity, setFilterCity] = useState([])
  const[searchItem, setSearchItem] = useState('');

  useEffect(()=>{
      fetch("cities.json")
      .then((res)=> res.json())
      .then(data=>{
      setLines(data);
      })
      .catch((err) => console.error("Error loading file:", err))
  }, []);
  
  const handleInputChange = (e) => {
  const searchTerm = e.target.value;
  setSearchItem(searchTerm);

  const filtered = lines.filter(item =>
    (item.city || "").toLowerCase().includes(searchTerm.toLowerCase())||
    (item.region || "").toLowerCase().includes(searchTerm.toLowerCase())||
    (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilterCity(filtered);
  console.log(searchTerm)
};


  const EnterPressed = (e)=>{
        if(e.key == "Enter" && searchItem){
        sResult(searchItem);
        setFilterCity([]);
        // fetch_data(searchItem)          
      } 
    }

    return( 
       <div>
        <FaSearch id= "search-icon"/>
        <input
            className='searchbar'
            type= "text"
            value = {searchItem}
            onChange = {handleInputChange}
            onKeyDown={EnterPressed}
            placeholder = 'Type the name of the city'/>
        <ul className="search_bar_list">
          {filterCity.slice(0,50).map((items, id) => {
                return <SearchBar_result 
                key={id}
                result={items}
                onSelect={(selectedCity)=>{
                  setSearchItem(selectedCity.city);
                  sResult(selectedCity.city);
                  setFilterCity([]);
                }}/>; 
              })}
        </ul>
        
       </div>

       
       
    );
};