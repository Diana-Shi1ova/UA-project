import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState, useRef } from 'react';
import "./FileUpload.css"
import Viewer3D from "../Viewer3D/Viewer3D";

function FileUpload () {
    // var cont = 1;
    const opcionesSelect = [
        {value: '2D', label: '2D'},
        {value: '3D', label: '3D'},
        {value: 'Audio', label: 'Audio'},
        {value: 'Vídeo', label: 'Vídeo'},
        {value: 'Código', label: 'Código'},
        {value: 'Otros', label: 'Otros'}
    ];

    const fileInputRef = useRef(null);
    const activarInput = (e) => {
        e.preventDefault();

        fileInputRef.current.click();
    }

    // var tipoFicheros="image/*";
    const [selectedOption, setSelectedOption] = useState('2D');
    const [cont, setCont] = useState('1');
    const [tipoFicheros, setTipoFicheros] = useState('*/*');

    const onChangeSelect = (e) => {
        setSelectedOption(e.target.value);
        console.log('Selected:', selectedOption);
        // switch(selectedOption){
        //     case "2D":
        //         setTipoFicheros("image/*");
        //         break;
        //     case "3D":
        //         setTipoFicheros("model/*,.obj,.fbx,.gltf,.glb,.3ds");
        //         break;
        //     case "Audio":
        //         setTipoFicheros("audio/*");
        //         break;
        //     case "Vídeo":
        //         setTipoFicheros("video/*");
        //         break;
        //     case "Código":
        //         setTipoFicheros("text/*,.js,.ts,.py,.html,.css,.json,.c,.cpp,.java");
        //         break;
        //     default:
        //         setTipoFicheros("*/*");
        // }
    }

    return (
        <div className="file-upload">
            <input type="file" id={'fileInput'+cont} className="input-hidden" ref={fileInputRef} accept={tipoFicheros} multiple/>
            <Button buttonName="Elegir fichero" icon="FaUpload" buttonFunction={activarInput}></Button>
            <p>{}</p>
            <Input inputTipo="select" labelText="Categoría *" inputName={"file"+cont} options={opcionesSelect} inputChange={onChangeSelect}></Input>
        </div>
    );
}

export default FileUpload;