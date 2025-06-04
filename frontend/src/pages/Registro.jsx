import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import InputTel from "../components/InputGeneric/InputTel/InputTel";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";

//////////
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { fetchLikedAssets, resetLikesState } from '../features/likes/likesSlice'
//////////

function Registro(){
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    /*const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones aquí
        navigate("/login");
    };*/

    /*const handleNumberChange = (fullNumber) => {
        console.log(fullNumber);
        setFormData(prevFormData => ({ ...prevFormData, phone: fullNumber }));
    }*/

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
        avatar: '/src/assets/avatar-empty.png',
    });
    
    const { name, email, phone, password, password2, avatar } = formData;
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { likes } = useSelector(
        (state) => state.likes
    )

    useEffect(() => {
        if (isSuccess) {
            dispatch(fetchLikedAssets(user._id));
            navigate("/");
            dispatch(reset());
        }

        if (isError) {
            alert("Error: " + message);
        }

    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones aquí
        if (password !== password2) {
            return; // toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
                phone,
                avatar,
            }
        
            dispatch(register(userData));
            navigate("/login");
        }
        
    };

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>Registro</h2>
                    <p className="hint">Los campos marcados con * son obligatorios.</p>
                    <form className="primary-form" onSubmit={handleSubmit}>
                        <Input labelText="Nombre *" inputName="name" inputTipo="text" inputChange={handleInputChange}></Input>
                        <Input labelText="Email *" inputName="email" inputTipo="text" inputChange={handleInputChange}></Input>
                        <Input labelText="Teléfono " inputName="phone" inputTipo="tel" inputChange={handleInputChange}></Input>
                        {/* <InputTel labelText="Teléfono" inputName="phone" inputChange={handleNumberChange}></InputTel> */}
                        <Input labelText="Contraseña *" inputName="password" inputTipo="password" inputChange={handleInputChange}></Input>
                        <Input labelText="Repetir contraseña *" inputName="password2" inputTipo="password" inputChange={handleInputChange}></Input>
                        <div className="form-botonera"><Button buttonName="Registrarse"></Button></div>
                        
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