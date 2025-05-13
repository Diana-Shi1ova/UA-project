import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(){
    return(
        <nav className="nav-header">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/buscar?category=2D">2D</Link></li>
                <li><Link to="/buscar?category=3D">3D</Link></li>
                <li><Link to="/buscar?category=Audio">Audio</Link></li>
                <li><Link to="/buscar?category=Video">Vídeo</Link></li>
                <li><Link to="/buscar?category=Codigo">Código</Link></li>
                <li><Link to="/buscar?category=Otros">Otros</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;