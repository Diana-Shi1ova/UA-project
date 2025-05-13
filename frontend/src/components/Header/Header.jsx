import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import "./Header.css";


function Header({ login=false}){
    const navigate = useNavigate();

    return(
        <header className="web-header">
            <div className="header-row">
                <Link to="/"><h1>MOLAMAZOGAMES</h1></Link>
                <Search></Search>
                <div className="botonera">
                    <Button buttonName="Iniciar sesión" buttonFunction={() => navigate('/login')}></Button>
                    <Button buttonName="Registrarse" buttonFunction={() => navigate("/registro")}></Button>
                </div>
                {/* <Avatar></Avatar> */}
            </div>
            <Navbar></Navbar>
        </header>
    );
}

export default Header;