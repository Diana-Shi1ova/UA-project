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
            
            <ul className="opciones" aria-live="polite">
                <li><Button buttonName="Perfil" icon="FaUser" buttonFunction={() => navigate('/perfil')}></Button></li>
                <li><Button buttonName="Mis datos" icon="FaCog" buttonFunction={() => navigate('/mis-datos')}></Button></li>
                <li><Button buttonName="Historial" icon="FaRegClock" buttonFunction={() => navigate('/historial')}></Button></li>
                <li><Button buttonName="Favoritos" icon="FaHeart" buttonFunction={() => navigate('/favoritos')}></Button></li>
                <li><Button buttonName="Cerrar sesión" icon="FaSignOutAlt" buttonFunction={cerrarSesion}></Button></li>
            </ul>
        </div>
    );
}

export default Avatar;