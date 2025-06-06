import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout, reset} from '../features/auth/authSlice';
import "./EliminarCuenta.css";

import axios from "axios";

function EliminarCuenta(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const volver = (e) => {
        e.preventDefault();

        navigate('/mis-datos');
    }

    const eliminarCuenta = async (e) => {
        e.preventDefault();

         try {
            // Borrar foto
            const avatarDelete = axios.delete(`/api/users/${user._id}/avatar`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });

            // Borrar historial
            const historyDelete = axios.delete(`/api/histories/delete-by-user/${user._id}`);

            // Modificar datos a anónimos
            const anonymizeUser = axios.put(`/api/users/${user._id}`, {
                name: 'Anónimo',
                email: `deleted_${new Date().toISOString()}@example.com`,
                phone: null,
                password: new Date().toISOString()
            });

            const [resAvatar, resHistorial, resAnon] = await Promise.all([
                avatarDelete,
                historyDelete,
                anonymizeUser
            ]);

            console.log('Avatar eliminado:', resAvatar.data);
            console.log('Historial eliminado:', resHistorial.data);
            console.log('Usuario anonimizadо:', resAnon.data);

            // Logout
            dispatch(logout());
            dispatch(reset());
            navigate('/');
            alert('Eliminado con éxito');
        } catch (error) {
            console.error('Error en eliminación de cuenta:', error);
            alert('Se ha producido un error al eliminar la cuenta');
        }

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