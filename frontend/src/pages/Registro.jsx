import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";

function Registro(){
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones aquí
        navigate("/login");
    };

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Registro</h2>
                    <p>Los campos marcados con * son obligatorios.</p>
                    <form className="primary-form" onSubmit={handleSubmit}>
                        <Input labelText="Nombre de usuario: " inputId="nombre" inputTipo="text"></Input>
                        <Input labelText="Email: " inputId="email" inputTipo="text"></Input>
                        <Input labelText="Teléfono: " inputId="telefono" inputTipo="text"></Input>
                        <Input labelText="Contraseña: " inputId="contrasenya" inputTipo="password"></Input>
                        <Input labelText="Repetir contraseña: " inputId="contrasenya-r" inputTipo="password"></Input>
                        <Button buttonName="Registrarse"></Button>
                        {/* <input type="submit" value="Registrarse"/> */}
                    </form>
                    <p>¿Ya tienes cuenta?</p>
                    <Link to="/login">Ir al login</Link>
                </section>
            </main>
        </div>
    );
}

export default Registro;