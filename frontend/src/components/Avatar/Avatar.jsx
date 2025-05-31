import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Button from "../Button/Button";
import "./Avatar.css";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'


function Avatar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [mostrar, setMostrar] = useState(true);

    const cerrarSesion = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    const mostrarOpciones = () => {
        let element = document.querySelector('.opciones');
        if(mostrar){
            element.classList.add('opciones-show');
        }
        else{
            element.classList.remove('opciones-show');
        }
        setMostrar(!mostrar);
    }

    return(
        <div aria-live="polite">
            <button className="avatar" aria-label="Mostrar opciones de perfil" onClick={mostrarOpciones}>
                <img src={user.avatar} alt="Mostrar opciones de perfil"/>
            </button>
            
            <div className="opciones" aria-live="polite">
                <Button buttonName="Perfil" icon="FaUser" buttonFunction={() => navigate('/perfil')}></Button>
                <Button buttonName="Mis datos" icon="FaCog" buttonFunction={() => navigate('/mis-datos')}></Button>
                <Button buttonName="Historial" icon="FaRegClock" buttonFunction={() => navigate('/historial')}></Button>
                <Button buttonName="Favoritos" icon="FaHeart" buttonFunction={() => navigate('/favoritos')}></Button>
                <Button buttonName="Cerrar sesión" icon="FaSignOutAlt" buttonFunction={cerrarSesion}></Button>
            </div>
        </div>
    );
}

export default Avatar;