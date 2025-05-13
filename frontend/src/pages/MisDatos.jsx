import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import { HiOutlinePencilAlt } from "react-icons/hi";
import Input from "../components/Input/Input";
import { useNavigate } from "react-router-dom";

import img from "../assets/image.png";

function MisDatos(){ 
    const navigate = useNavigate();

    const contrasenya = () => {
        navigate("/cambio-contrasenya");
    }

    const volver = () => {
        navigate("/perfil");
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Mis datos</h2>
                    <div className="form-datos">
                        <div className="foto-buttons">
                            <img src={img} alt="" />
                            <Button buttonName={<HiOutlinePencilAlt />} buttonClass="but-change" ariaLabel="Cambiar foto"></Button>
                            <Button buttonName="Cambiar contraseña" buttonFunction={contrasenya}></Button>
                            <Button buttonName="Eliminar cuenta"></Button>
                        </div>
                        <form className="primary-form">
                            <Input labelText="Nombre de usuario" inputId="nombre" inputTipo="text"></Input>
                            <Input labelText="Email" inputId="email" inputTipo="text"></Input>
                            <Input labelText="Teléfono" inputId="telefono" inputTipo="text"></Input>
                            <Button buttonName="Cambiar"></Button>
                        </form>
                    </div>
                    
                    <Button buttonName="Volver" buttonFunction={volver}></Button>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default MisDatos;