import './searchBar_result.css'
export const SearchBar_result = ({result, onSelect})=> {
   
    return(
        <li className="search_bar_result" onClick={(e)=> onSelect(result)}>
         <strong>{result.city}</strong>, {result.region}, {result.country}
        </li>
    );
};