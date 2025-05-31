import { Link } from "react-router-dom";
import logo from "../../assets/gamepad-logo.png";
import "./Footer.css"

function Footer(){
    return(
        <footer className="general-footer">
            <Link to="/"><img className="logo-img-footer" src={logo} alt="Molamazogames" /></Link>
            <section className="section-footer">
                <h3>Categorías</h3>
                <ul>
                    <li><Link to="/buscar?category=2D">2D</Link></li>
                    <li><Link to="/buscar?category=3D">3D</Link></li>
                    <li><Link to="/buscar?category=Audio">Audio</Link></li>
                    <li><Link to="/buscar?category=Vídeo">Vídeo</Link></li>
                    <li><Link to="/buscar?category=Código">Código</Link></li>
                    <li><Link to="/buscar?category=Otros">Otros</Link></li>
                </ul>
            </section>
            <section className="section-footer">
                <h3>Usuarios</h3>
                <ul>
                    <li><Link to="/login">Iniciar sesión</Link></li>
                    <li><Link to="/registro">Registrarse</Link></li>
                    <li><Link to="/perfil">Mi perfil</Link></li>
                </ul>
            </section>
        </footer>
    );
}

export default Footer;