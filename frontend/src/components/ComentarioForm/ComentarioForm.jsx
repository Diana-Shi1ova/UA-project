import Input from "../Input/Input";
import Button from "../Button/Button";

function ComentarioForm(){
    return(
        <form className="comentario-form" action="">
            <p>Comparte tu opinión</p>
            <Input inputTipo="textarea" inputName="comentario"></Input>
            <Button buttonName="Limpiar"></Button>
            <Button buttonName="Enviar"></Button>
        </form>
    );
}

export default ComentarioForm;