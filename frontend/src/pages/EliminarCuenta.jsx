import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import "./EliminarCuenta.css";

import axios from "axios";

function EliminarCuenta(){
    const navigate = useNavigate();

    const volver = (e) => {
        e.preventDefault();

        navigate('/mis-datos');
    }

    const eliminarCuenta = (e) => {
        e.preventDefault();

        
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form elimiar-cuenta-form">
                    <h2>Eliminar cuenta</h2>
                    <p className="p-warning">Va a eliminar la cuenta. Los comentarios, assets y likes permanecerán, pero toda la información personal incluyendo la foto de perfil estará eliminada.</p>
                    <p>Esta acción es irreversible. Por favor, confirme con la constraseña.</p>
                    <form className="primary-form" onSubmit={eliminarCuenta}>
                        <Input labelText="Contraseña *" inputName="password" inputTipo="password"></Input>
                        <div className="form-botonera">
                            <Button buttonName="Cancelar" buttonFunction={volver} icon="FaTimes" buttonColor="secondary"></Button>
                            <Button buttonName="Eliminar" icon="FaCheck"></Button>
                        </div>
                    </form>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}
    
export default EliminarCuenta;