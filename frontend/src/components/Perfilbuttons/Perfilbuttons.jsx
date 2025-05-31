import Img from "../../assets/2d.avif";
import Button from "../Button/Button";


function Perfilbuttons(){
    return(
        <div className="Perfilbuttons">
            <img src={Img} alt="Foto de perfil" />
            <Button buttonName="Opciones perfil" icon="FaCog"></Button>
            <h2>Jane Doe</h2>
            <Button buttonName="Añadir asset" icon="FaPlus"></Button> 
            <Button buttonName="Historial descargas" icon="FaRegClock"></Button>
            <Button buttonName="Favoritos" icon="FaHeart"></Button>
        </div>
    );
}

export default Perfilbuttons;