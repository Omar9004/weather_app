
import {useState, useEffect, act} from "react";
import {FaSearch} from "react-icons/fa";
import { SearchBar_result } from "./searchBar_result";
import './search_bar.css';


// import './serach_bar_list.css';



export const SearchBar = ({sResult})=> {
  const[lines, setLines] = useState([]);
  const[filterCity, setFilterCity] = useState([]);
  const[searchItem, setSearchItem] = useState('');
  const[activeIndex, setActiveIndex] = useState(-1);

  useEffect(()=>{
      fetch("cities.json")
      .then((res)=> res.json())
      .then(data=>{
      setLines(data);
      })
      .catch((err) => console.error("Error loading file:", err))
  }, []);

  useEffect(()=>{
    if (!searchItem){
      setFilterCity([]);
    }
  },[searchItem]);

  
  const handleInputChange = (e) => {
  const searchTerm = e.target.value;
  setSearchItem(searchTerm);

  const filtered = lines.filter(item =>
    (item.city || "").toLowerCase().includes(searchTerm.toLowerCase())||
    (item.region || "").toLowerCase().includes(searchTerm.toLowerCase())||
    (item.country || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  setFilterCity(filtered);
};


  const handleKeyDown = (e)=>{
        if (e.key === "ArrowDown"){
          e.preventDefault();
          setActiveIndex((prev) => prev < 50 ? prev +1 : 0);
        }else if (e.key === "ArrowUp"){
          e.preventDefault();
          setActiveIndex((prev) => prev > 0 ? prev -1 : 49);
        }
        else if(e.key == "Enter"){
          if (activeIndex >= 0 && activeIndex < filterCity.length) {
            const selected = filterCity[activeIndex];
            setSearchItem(selected.city);
            sResult(selected.city);
            setFilterCity([]);
            setActiveIndex(-1);
          }        
        }
    }

    return( 
      <div className="search_bar_container">
        <div className="searchbar-wrapper">
          <FaSearch id="search-icon" />
          <input
            className="searchbar"
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type the name of the city"
          />
        </div>
      

        <ul className="search_bar_list">
          {filterCity.slice(0, 50).map((items, id) => (
            <SearchBar_result 
              key={id}
              result={items}
              isActive={id === activeIndex}
              onSelect={(selectedCity) => {
                setSearchItem(selectedCity.city);
                sResult(selectedCity.city);
                setFilterCity([]);
                setActiveIndex(-1);
              }}
            />
          ))}
        </ul>
    </div>


       
       
    );
};