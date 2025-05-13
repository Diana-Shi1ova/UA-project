import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import Header from "../components/Header/Header";

import { useState } from "react";


function Login(){
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones aquí
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
      
        const data = await res.json();
        console.log(data); // например: { token: "..." }
        localStorage.setItem("token", data.token);

        navigate("/");
    };

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Login</h2>
                    <p>Los campos marcados con * son obligatorios.</p>
                    <form onSubmit={handleSubmit} className="primary-form">
                        <Input labelText="Email*" inputId="email" inputTipo="text"></Input>
                        <Input labelText="Contraseña*" inputId="contrasenya" inputTipo="password"></Input>
                        <input type="submit" value="Iniciar sesión"/>
                    </form>
                    <p>¿No tienes cuenta?</p>
                    <Link to="/registro">Ir al registro</Link>
                </section>
            </main>
        </div>
    );
}

export default Login;