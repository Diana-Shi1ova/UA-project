import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { fetchLikedAssets } from '../features/likes/likesSlice';

function Registro() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
    avatar: '/src/assets/avatar-empty.png',
  });
  const [errors, setErrors] = useState({});

  const { name, email, phone, password, password2, avatar } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "El nombre es obligatorio";
    else if (name.length < 2 || name.length > 50) newErrors.name = "El nombre debe tener entre 2 y 50 caracteres";

    if (!email.trim()) newErrors.email = "El email es obligatorio";
    else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = "Email inválido: debe contener '@' y .";
    }

    if (phone && phone.trim()) {
        const phoneRegex = /^[\d\s()+-]{7,20}$/;
        if (!phoneRegex.test(phone)) {
            newErrors.phone = "El teléfono solo puede contener números, espacios y símbolos +()-";
        } else if (phone.replace(/\D/g, '').length < 7) {
            newErrors.phone = "El número de teléfono debe tener al menos 7 dígitos";
        }
    }

    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    if (!password2) newErrors.password2 = "La confirmación de contraseña es obligatoria";
    else if (password !== password2) newErrors.password2 = "Las contraseñas no coinciden";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const userData = { name, email, password, phone, avatar };
    dispatch(register(userData));
    // navigate("/login");
  };

  return (
    <div className="content">
      <Header />
      <main>
        <section className="section-form">
          <h2>Registro</h2>
          <p className="hint">Los campos marcados con * son obligatorios.</p>
          <form className="primary-form" onSubmit={handleSubmit}>
            <Input labelText="Nombre *" inputName="name" inputTipo="text" inputChange={handleInputChange} value={name} />
            {errors.name && <p className="error-message">{errors.name}</p>}

            <Input labelText="Email *" inputName="email" inputTipo="text" inputChange={handleInputChange} value={email} />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <Input labelText="Teléfono " inputName="phone" inputTipo="tel" inputChange={handleInputChange} value={phone} />
            {errors.phone && <p className="error-message">{errors.phone}</p>}

            <Input labelText="Contraseña *" inputName="password" inputTipo="password" inputChange={handleInputChange} value={password} />
            {errors.password && <p className="error-message">{errors.password}</p>}

            <Input labelText="Repetir contraseña *" inputName="password2" inputTipo="password" inputChange={handleInputChange} value={password2} />
            {errors.password2 && <p className="error-message">{errors.password2}</p>}

            <div className="form-botonera">
              <Button buttonName="Registrarse" />
            </div>
          </form>
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login">Ir al login</Link>
        </section>
      </main>
    </div>
  );
}

export default Registro;
