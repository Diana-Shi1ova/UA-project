import { Link } from "react-router-dom";
import "./Navbar.css";
import Button from "../Button/Button";

/*Icons:*/
import { FaHome } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaItunesNote } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

function Navbar(){
    const mostrarMenu = () => {
        const checkbox = document.getElementById('chk-nav');
        checkbox.checked = !checkbox.checked;
    }

    return(
        <nav className="nav-header">
            {/* <p className="chk-nav-p">
                <input type="checkbox" id="chk-nav"/>
                <label htmlFor="chk-nav"><IoMenu /></label>
            </p> */}
            <div aria-live="polite">
                <Button icon="FaBars" buttonClass="show-nav" ariaLabel="Mostrar menú" buttonFunction={mostrarMenu}></Button>
            </div>
            
            <input type="checkbox" id="chk-nav"/>
            <ul className="menu">
                <li><Link to="/"><FaHome />Inicio</Link></li>
                <li><Link to="/buscar?category=2D"><FaImage />2D</Link></li>
                <li><Link to="/buscar?category=3D"><FaCube />3D</Link></li>
                <li><Link to="/buscar?category=Audio"><FaItunesNote />Audio</Link></li>
                <li><Link to="/buscar?category=Video"><FaVideo />Vídeo</Link></li>
                <li><Link to="/buscar?category=Codigo"><FaCode />Código</Link></li>
                <li><Link to="/buscar?category=Otros"><FaEllipsisH />Otros</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;