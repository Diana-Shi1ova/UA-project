import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import Button from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import "./Header.css";
import logo from "../../assets/gamepad-logo.png";

import { FaUserPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { useSelector } from 'react-redux';



function Header(){
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    return(
        <header className="web-header">
            <div className="header-row">
                <Link to="/" className="logo"><h1>MOLAMAZOGAMES</h1><img className="logo-img" src={logo} alt="Molamazogames" /></Link>
                <Search></Search>
                
                    {user ? (
                        <div className="botonera">
                            <Button buttonName="Añadir asset" buttonFunction={() => navigate('/subir-asset')} icon="FaPlus"></Button>
                            <Avatar></Avatar>
                        </div>
                    ) : (
                        <div className="botonera">
                            <Button buttonName="Iniciar sesión" buttonFunction={() => navigate('/login')} icon="FaUser"></Button>
                            <Button buttonName="Registrarse" buttonFunction={() => navigate("/registro")} icon="FaUserPlus"></Button>
                        </div>
                    )}
                {/* <Avatar></Avatar> */}
            </div>
            <Navbar></Navbar>
        </header>
    );
}

export default Header;