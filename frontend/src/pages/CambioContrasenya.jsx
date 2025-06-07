import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { useSelector } from "react-redux";
import { useState } from "react";

function CambioContrasenya(){ 
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const volver = (e) => {
        e.preventDefault();
        navigate("/mis-datos");
    }

    const cambiarContrasenya = async (e) => {
        e.preventDefault();

        const vieja = e.target.vieja.value;
        const nueva = e.target.nueva.value;
        const repetir = e.target.repetir.value;

        if(nueva !== repetir){
            // error
            return;
        }
console.log(user._id)
        try {
            const response = await axios.put(`/api/users/${user._id}/password`, {
                oldPassword: vieja,
                newPassword: nueva
            },
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            console.log('Пароль успешно изменён:', response.data);
            alert('Пароль изменён!');
            navigate('/mis-datos');
        } catch (error) {
            console.error('Ошибка при смене пароля:', error.response?.data || error.message);
            alert('Ошибка при смене пароля.');
        }
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Cambiar contrasenya</h2>
                    <p>Los campos marcados con * son obligatorios.</p>
                    <form className="primary-form" onSubmit={cambiarContrasenya}>
                        <Input labelText="Contraseña actual*" inputName="vieja" inputTipo="password"></Input>
                        <Input labelText="Contraseña nueva*" inputName="nueva" inputTipo="password"></Input>
                        <Input labelText="Repetir contraseña actual*" inputName="repetir" inputTipo="password"></Input>
                        <div className="form-botonera">
                            <Button buttonName="Cancelar" buttonFunction={volver} icon="FaTimes" buttonColor="secondary"></Button>
                            <Button buttonName="Cambiar" icon="FaCheck"></Button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default CambioContrasenya;