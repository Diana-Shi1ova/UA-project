import "./UploadButton.css";
import { FaUpload } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';

function UploadButton ({uploadFunction}) {
    const fileInputRef = useRef(null);
    // const [files, setFiles] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const activarInput = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    }

    const handleFiles = (fileList) => {
        const files = Array.from(fileList);
        if (files.length === 0) return;
        uploadFunction(files);
    };

    const inputChange = (e) => {
        handleFiles(e.target.files);
        e.target.value = ''; // Limpiar input
        document.querySelector('.upload-button').classList.remove('error');
        document.querySelector('#files-error').classList.add('hidden');
    };

    /*const inputChange = (e) => {
        const fileList = e.target.files;
        const files = Array.from(fileList);
        console.log(files);
        uploadFunction(files);

        e.target.value = ''; // Limpiar input
    }*/

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);

        // Estilo
        document.querySelector('.upload-button').classList.add('upload-button-active');

    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        // Estilo
        document.querySelector('.upload-button').classList.remove('upload-button-active');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer?.files?.length) {
            handleFiles(e.dataTransfer.files);
        }

        // Estilo
        document.querySelector('.upload-button').classList.remove('upload-button-active');
        document.querySelector('.upload-button').classList.remove('error');
        document.querySelector('#files-error').classList.add('hidden');
    };

    return (
        <>
            <label htmlFor="fileInput">Ficheros *</label>
            <input type="file" id='fileInput' className="input-hidden" ref={fileInputRef} onChange={inputChange} multiple/>
            <button
                className="upload-button"
                onClick={activarInput}
                onDragEnter={handleDragOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            ><FaUpload/>Elige o arrastra los ficheros</button>
        </>
    );
}

export default UploadButton;