import Input from "../Input/Input";
import Button from "../Button/Button";
import { useSelector} from 'react-redux';
import { useState } from "react";
import axios from 'axios';
import "./ComentarioForm.css";

function ComentarioForm({returnComment=()=>{}, asset}){
    const user = useSelector((state) => state.auth.user);
    const [comment, setComment] = useState('');

    // Enviar comentario
    const createComment = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/api/comments/`, {content: comment, asset: asset, author: user._id})
            .then(response => {
                console.log('Comment:', response.data);
                returnComment(response.data);
                setComment('');
            })
            .catch(error => {
                console.error('Error:', error);
        });
    }

    const onChange = (e) => {
        setComment(e.target.value);
    }

    return(
        <form className="comentario-form" onSubmit={createComment}>
            <Input inputTipo="textarea" inputName="comentario" labelText="Comparte tu opinión:" inputChange={onChange} inputValue={comment}></Input>
            <Button buttonName="Enviar"></Button>
        </form>
    );
}

export default ComentarioForm;