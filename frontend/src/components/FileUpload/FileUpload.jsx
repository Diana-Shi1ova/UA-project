import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState, useEffect, useRef } from 'react';
import "./FileUpload.css"
import Viewer3D from "../Viewer3D/Viewer3D";
import ButtonX from "../ButtonX/ButtonX";
import Ellipsis from "../Ellipsis/Ellipsis";

/*Icons:*/
import { FaImage } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaItunesNote } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";

import * as FaIcons from "react-icons/fa";



function FileUpload ({fileName, fileType, remove=(id) => {}, categories=[]}) {
    // var IconComponent;
    // var cont = 1;
    const opcionesSelect = [
        {value: '2D', label: '2D'},
        {value: '3D', label: '3D'},
        {value: 'Audio', label: 'Audio'},
        {value: 'Vídeo', label: 'Vídeo'},
        {value: 'Código', label: 'Código'},
        {value: 'Otros', label: 'Otros'}
    ];

    // console.log(formats);

    // var tipoFicheros="image/*";
    const [selectedOption, setSelectedOption] = useState('2D');
    const [cont, setCont] = useState('1');
    const [tipoFicheros, setTipoFicheros] = useState('*/*');
    // const [IconComponent, setIconComponent] = useState(FaIcons.FaImage);
    const [IconComponent, setIconComponent] = useState(() => FaImage);

    // Determinar tipo
    useEffect(() => {
        const type=determineOption();

        setSelectedOption(type || '');
        setIcon(type || '');
    }, [fileType]);
    
    // Determinar tipo
    const determineOption = () => {
        const type = fileType.split('/')[0];
        const ext = fileName.split('.').pop().toLowerCase();
        // console.log(type);
        if (type === 'image') return '2D';
        else if (type === 'audio') return 'Audio';
        else if (type === 'video') return 'Vídeo';

        for (const categoryObj of categories) {
            if (categoryObj.formats.includes(ext)) {
                return categoryObj.categoryName;
            }
        }

        return 'Otros';
    }

    // function getFileCategory(file, categories) {
    //     const mime = file.type;
    //     const ext = file.name.split('.').pop().toLowerCase();

    //     if (mime.startsWith("image/")) return "2D";
    //     if (mime.startsWith("audio/")) return "Audio";
    //     if (mime.startsWith("video/")) return "Vídeo";

    //     /*for (const [category, extensions] of Object.entries(typeMap)) {
    //         if (extensions.includes(ext)) return category;
    //     }*/

    //     for (const categoryObj of categories) {
    //         if (categoryObj.formats.includes(ext)) {
    //             return categoryObj.categoryName;
    //         }
    //     }

    //     return "Other";
    // }

    // Poner valor de select
    const onChangeSelect = (e) => {
        const value = e.target.value;
        setSelectedOption(value);
        setIcon(value);
    }

    // Cambiar icono
    const setIcon = (value) => {
        switch(value){
            case "2D":
                // IconComponent = FaIcons['FaImage'];
                setIconComponent(() => FaIcons.FaImage);
                break;
            case "3D":
                // IconComponent = FaIcons['FaCube'];
                setIconComponent(() => FaIcons.FaCube);
                break;
            case "Audio":
                // IconComponent = FaIcons['FaItunesNote'];
                setIconComponent(() => FaIcons.FaItunesNote);
                break;
            case "Vídeo":
                // IconComponent = FaIcons['FaVideo'];
                setIconComponent(() => FaIcons.FaVideo);
                break;
            case "Código":
                // IconComponent = FaIcons['FaCode'];
                setIconComponent(() => FaIcons.FaCode);
                break;
            default:
                // IconComponent = FaIcons['FaEllipsisH'];
                setIconComponent(() => FaIcons.FaEllipsisH);
        }
    }

    return (
        <div className="file-upload">
            <span className="blue-icon"><IconComponent /></span>
            {/* <p className="filename">{fileName}</p> */}
            <Ellipsis text={fileName}></Ellipsis>
            {/* labelText="Categoría *" */}
            <Input inputTipo="select" inputName={fileName} options={opcionesSelect} inputChange={onChangeSelect} inputValue={selectedOption}></Input>
            <ButtonX buttonClass="remove" buttonFunction={remove} ariaLabel={"Eliminar fichero " + fileName} icon="FaRegTimesCircle"></ButtonX>
        </div>
    );
}

export default FileUpload;