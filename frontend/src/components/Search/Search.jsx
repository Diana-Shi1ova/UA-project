import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search(){
    return(
        <form className="searchbar">
            <input type="search" placeholder="Buscar" />
            <Button buttonClass="search-button" buttonName={<FaSearch />} ariaLabel="Buscar"></Button>
        </form>
        


        // <div class="search-container">
        //     <input type="search" class="search-input" placeholder="Поиск..." />
        //     <button class="search-button">🔍</button>
        // </div>
    );
}

export default Search;