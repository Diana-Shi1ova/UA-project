//import Button from "../Button/Button";
import { FaSearch } from "react-icons/fa";
import "./Search.css";

function Search({form=true, searchChange=()=>{}, searchSubmit=()=>{}, buttonFunction=()=>{}}){
    if(form){
        return(
            <form className="searchbar" onSubmit={searchSubmit}>
                <input type="search" placeholder="Buscar" name="buscar" onChange={searchChange}/>
                {/* <Button buttonClass="search-button" buttonName={<FaSearch />} ariaLabel="Buscar"></Button> */}
                <button className="search-button" aria-label="Buscar"><FaSearch /></button>
            </form>
        );
    }
    else{
        return(
            <div className="searchbar">
                <input type="search" placeholder="Buscar" name="buscar" onChange={searchChange}/>
                {/* <Button buttonClass="search-button" buttonName={<FaSearch />} ariaLabel="Buscar"></Button> */}
                <button className="search-button" aria-label="Buscar"><FaSearch /></button>
            </div>
        );
    }
    
}

export default Search;