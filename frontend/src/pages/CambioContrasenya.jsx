import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

function CambioContrasenya(){ 
    const navigate = useNavigate();

    const volver = () => {
        navigate("/mis-datos");
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>CambioContrasenya</h2>
                    <p>Los campos marcados con * son obligatorios.</p>
                    <form className="primary-form">
                        <Input labelText="Contraseña actual*" inputId="vieja" inputTipo="password"></Input>
                        <Input labelText="Contraseña nueva*" inputId="nueva" inputTipo="password"></Input>
                        <Input labelText="Repetir contraseña actual*" inputId="repetir" inputTipo="password"></Input>
                        <Button buttonName="Cancelar" buttonFunction={volver}></Button>
                        <Button buttonName="Cambiar"></Button>
                    </form>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default CambioContrasenya;