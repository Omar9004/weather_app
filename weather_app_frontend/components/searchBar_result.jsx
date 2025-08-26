import './searchBar_result.css'
export const SearchBar_result = ({result, onSelect, isActive})=> {
    return(
        <li className={`search_bar_result ${isActive ? "active" : ""}`} onClick={(e)=> onSelect(result)}>
         <strong>{result.city}</strong>, {result.region}, {result.country}
        </li>
    );
};