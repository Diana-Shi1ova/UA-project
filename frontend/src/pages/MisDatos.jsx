import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from "../features/auth/authSlice";
import img from "../assets/avatar-empty.png";
import { useRef } from 'react';

import "./MisDatos.css";
import EliminarCuenta from "./EliminarCuenta";

function MisDatos(){ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //const [user, setUser] = useState([]);
    const user = useSelector((state) => state.auth.user);
    //const id = JSON.parse(localStorage.getItem('user'))._id;
    const id = user?._id;
    const token = user?.token;
    // console.log(token);
    const avatar = user?.avatar;
    

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone || '');

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'nombre') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'phone') setPhone(value);
    };

    const cambiarDatos = (e) => {
        e.preventDefault();

        const updatedUser = {
            name: name,
            email: email,
            phone: phone,
        };

        dispatch(updateUser(updatedUser));
    }

    const eliminarFoto = async (e) => {
        e.preventDefault();

        /*const sinFoto = {
            avatar: '/src/assets/avatar-empty.png'
        };

        dispatch(updateUser(sinFoto));*/

        const avatarActual = user.avatar;
        console.log(token);

        try {
            /*const response = await axios.delete(`/api/users/${user._id}/avatar`, avatarActual, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });*/

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/avatar`, {
                // data: avatarActual,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });

            console.log(response);

            // Actualizar el estado del usuario
            dispatch(updateUser(response.data));
        } catch (error) {
            console.error(error);
            alert('Se ha producido un error');
        }
    }

    const fileInputRef = useRef(null);
    const activarInput = () => {
        fileInputRef.current.click();
    }

    const cambiarFoto = async (e) => {
        const file = e.target.files[0];
        console.log('Fichero:', file);
        if (!file) return;

        // Creación de formdata
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${user._id}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);

            // Actualizar el estado del usuario
            dispatch(updateUser(response.data));
        } catch (error) {
            console.error(error);
            alert('Se ha producido un error');
        }
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Mis datos</h2>
                    <div className="mis-datos">
                        {/* <div className="mis-datos-left"> */}
                            <div className="foto-con-botones">
                                <img src={avatar} alt="" />
                                <input type="file" name="avatar" className="input-hidden" onChange={cambiarFoto} ref={fileInputRef} accept="image/*"/>
                                <div className="botones">
                                    {/* <Button icon="HiOutlinePencilAlt" buttonClass="but-change" ariaLabel="Cambiar foto"></Button> */} 
                                    <Button icon="FaPencilAlt" buttonClass="but-change" ariaLabel="Cambiar foto" buttonColor="warning" buttonFunction={activarInput}></Button>
                                    <Button icon="FaTrashAlt" buttonClass="but-change" ariaLabel="Eliminar foto" buttonColor="danger" buttonFunction={eliminarFoto}></Button>
                                </div>
                            </div>
                        {/* </div> */}
                        <form className="primary-form primary-form-datos" onSubmit={cambiarDatos}>
                            <Input labelText="Nombre de usuario" inputName="nombre" inputTipo="text" inputValue={name} inputChange={(e) => onChange(e)}></Input>
                            <Input labelText="Email" inputName="email" inputTipo="text" inputValue={email} inputChange={(e) => onChange(e)}></Input>
                            <Input labelText="Teléfono" inputName="phone" inputTipo="tel" inputValue={phone} inputChange={(e) => onChange(e)}></Input>
                            <div className="form-botonera">
                                <Button buttonName="Guardar cambios" icon="FaCheck"></Button>
                            </div>
                        </form>
                        <div className="botones-opciones">
                            <Button buttonName="Cambiar contraseña" icon="FaPencilAlt" buttonColor="warning" buttonFunction={() => {navigate("/mis-datos/cambio-contrasenya")}}></Button>
                            <Button buttonName="Eliminar cuenta" buttonFunction={() => {navigate("/mis-datos/eliminar-cuenta")}} icon="FaTrashAlt" buttonColor="danger"></Button>
                        </div>
                        {/* <div className="buttons-opciones">
                            <Button buttonName="Cambiar contraseña" icon="FaPencilAlt" buttonColor="warning" buttonFunction={() => {navigate("/cambio-contrasenya")}}></Button>
                            <Button buttonName="Eliminar cuenta" icon="FaTrashAlt" buttonColor="danger"></Button>
                        </div> */}
                    </div>
                    <Button buttonName="Volver a mi perfil" icon="FaLongArrowAltLeft" buttonColor="secondary" buttonFunction={() => {navigate("/perfil")}}></Button>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default MisDatos;