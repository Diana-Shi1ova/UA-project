import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";

//////////
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
//////////
import { FaExclamationCircle } from "react-icons/fa";

function Login(){
    const [formData, setFormData] = useState({
            email: '',
            password: '',
        });
        
    const { email, password } = formData;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            //toast.error(message)
            console.log(message);
        }

        if (isSuccess || user) {
            navigate('/');
            dispatch(reset());
        }
        
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
        
        if(isError){
            dispatch(reset());
            console.log('reset');
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        console.log(userData);

        dispatch(login(userData));
    }

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Login</h2>
                    <p className="hint">Los campos marcados con * son obligatorios.</p>
                    {isError && (
                        <p className="error" role="alert" lang="en">
                            <FaExclamationCircle />{message}
                        </p>
                    )}
                    <form onSubmit={onSubmit} className="primary-form">
                        <Input labelText="Email *" inputName="email" inputTipo="text" inputChange={onChange}></Input>
                        <Input labelText="Contraseña *" inputName="password" inputTipo="password" inputChange={onChange}></Input>
                        <div className="form-botonera"><Button buttonName="Iniciar sesión"></Button></div>
                    </form>
                    <p>¿No tienes cuenta?</p>
                    <Link to="/registro">Ir al registro</Link>
                </section>
            </main>
        </div>
    );
}

export default Login;