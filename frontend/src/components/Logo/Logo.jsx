import { Link } from "react-router-dom";
import logo from "../../assets/gamepad-logo.png";

function Logo(){
    return(
        <Link to="/" className="logo"><h2>MOLAMAZOGAMES</h2><img className="logo-img" src={logo} alt="Molamazogames" /></Link>
    );
}

export default Logo;