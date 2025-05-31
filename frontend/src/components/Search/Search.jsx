//import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search({form=true}){
    if(form){
        return(
            <form className="searchbar">
                <input type="search" placeholder="Buscar" name="buscar" />
                {/* <Button buttonClass="search-button" buttonName={<FaSearch />} ariaLabel="Buscar"></Button> */}
                <button className="search-button" aria-label="Buscar"><FaSearch /></button>
            </form>
        );
    }
    else{
        return(
            <div className="searchbar">
                <input type="search" placeholder="Buscar" name="buscar" />
                {/* <Button buttonClass="search-button" buttonName={<FaSearch />} ariaLabel="Buscar"></Button> */}
                <button className="search-button" aria-label="Buscar"><FaSearch /></button>
            </div>
        );
    }
    
}

export default Search;