import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import FileUpload from "../components/FileUpload/FileUpload";
import SuggestionsInput from "../components/SuggestionsInput/SuggestionsInput";
import { useEffect, useState } from 'react';
import axios from 'axios';
import UploadButton from "../components/UploadButton/UploadButton";
import "./SubirAsset.css";
import Download from "../components/Download/Download";
import { useSelector } from "react-redux";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { useParams } from 'react-router-dom';


function SubirAsset () {
    const { id } = useParams();

    // Cargar etiquetas para sugerencias
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState([]);
    const [formatsList, setFormatsList] = useState([]);
    const [files, setFiles] = useState([]);
    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
    });
    const [tags, setTags] = useState([]);
    const [categs, setCategs] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [asset, setAsset] = useState({});
    const [filesFicticios, setFilesFicticios] = useState([]);
    const [filesDelete, setFilesDelete] = useState([]);
    
    // Si hay id, obtener asset
    useEffect(() => {
        if(id){
            axios.get(`/api/assets/${id}`)
                .then((response) => {
                    setAsset(response.data);
                    setFormValues({
                        name: response.data.name || '',
                        description: response.data.description || ''
                    });
                    setTags(response.data.tags);
                    setFilesFicticios(response.data.downloadUrls);
                    console.log('ficticios obtenidos ', response.data.downloadUrls)
                    /*const fs = response.data.downloadUrls.map(obj => obj.filename);
                    setFiles(fs);*/
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [id]);
    
    // Obtener extensiones por categorías
    useEffect(() => {
        axios.get('/api/formats/by-category')
            .then((response) => {
                setFormatsList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    // Obtener etiquetas
    useEffect(() => {
        axios.get('/api/tags')
        .then(response => {
			const namesOnly = response.data.map(tag => tag.name);
            setSuggestions(namesOnly);
			console.log('Suggestions:', namesOnly);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    // Gestionar ficheros cargados
    /*const handleFilesSelected = (newFiles) => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };*/
    const handleFilesSelected = (newFiles) => {
        setFiles(prevFiles => {
            // Map para búsqueda rápida
            const existingFilesMap = new Map(
                prevFiles.map(f => [f.name, f])
            );

            // Filtrado para evitar duplicados
            const uniqueNewFiles = newFiles.filter(
                f => !existingFilesMap.has(f.name)
            );

            return [...prevFiles, ...uniqueNewFiles];
        });

        //const catgs = document.querySelectorAll('select');

    };
    const remove = (id) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== id));
    }

    const removeFicticio = (url) => {
        /*const arr = filesDelete.push(url);
        setFilesDelete(arr);
        setFilesFicticios(prevFiles => prevFiles.filter((_, url) => url !== url));
        console.log('Fiticios',arr);*/
        const newFiles = [...filesDelete, url];
        setFilesDelete(newFiles);
        setFilesFicticios(prevFiles => prevFiles.filter(file => file.url !== url));
        console.log('Ficticios:', newFiles);
        
    }

    const handleChange = (e, id, idError) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        document.querySelector(id).classList.remove('error');
        document.querySelector(idError).classList.add('hidden');
    };

    const setTagsValues = (etiquetas) => {
        setTags(etiquetas);
    }

    /*const setCategsValues = (categorias) => {
        setCategs(categorias);
    }*/

    const subirAsset = async (e) => {
        e.preventDefault();

        // Validaciones
        var error = false;
        if(formValues.name.trim()===""){
            error = true;
            // Mostrar error
            document.querySelector('#name').classList.add('error');
            document.querySelector('#name-error').classList.remove('hidden');
        }
        if (formValues.description.trim()===""){
            error = true;
            // Mostrar error
            document.querySelector('#description').classList.add('error');
            document.querySelector('#description-error').classList.remove('hidden');
        }
        if (files.length===0 && !id){
            error = true;
            // Mostrar error
            document.querySelector('.upload-button').classList.add('error');
            document.querySelector('#files-error').classList.remove('hidden');
        }

        // Si fue detectado algún error
        if(error) return;

        // Activar loading
        setLoading(true);

        // Crear FormData
        const formData = new FormData();

        //Guardar datos en FormData:
        // autor
        formData.append('author', user._id);

        // nombre y descripción
        for (const key in formValues) {
            formData.append(key, formValues[key].trim());
        }
        
        // Etiquetas
        tags.forEach((tag, index) => {
            formData.append('tags[]', tag);
        });

        // Ficheros
        files.forEach((file, index) => {
            formData.append('files[]', file);
        });

        // Categorías de los ficheros
        const catgs = document.querySelectorAll('select');
        catgs.forEach(select => {
            const file = select.name || select.id;
            const category = select.value;

            if (file) {
                // formData.append(name, value);
                formData.append('categories[]', JSON.stringify({ file, category }));
            }
        });

        // Mostrar formData en consola
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        // Es hora de subirlo!
        if(id){
            try {
                const response1 = await axios.put(`/api/assets/${id}`, formData, {
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
                });
                
                console.log('Respusta 1:', response1.data);
                if(filesDelete.length>0){
                    const response2 = await axios.post(`/api/assets/${id}/files-delete`, {files: filesDelete});
                    console.log('Respusta 2:', response2.data);
                }

                // Subir etiquetas
                if(tags.length>0){
                    const response3 = await axios.post(`/api/tags/`, {tags: tags});
                }
                

                navigate('/perfil');
            } catch (error) {
                console.error('Error:', error);
            }
            finally{
                // Desactivar loading
                setLoading(false);
            }
        }
        else{
            try {
                const response = await axios.post('api/assets/', formData, {
                    // headers: {
                    //     'Content-Type': 'multipart/form-data',
                    // },
                });

                // Subir etiquetas
                if(tags.length>0){
                    const response3 = await axios.post(`/api/tags/`, {tags: tags});
                }

                console.log('Respusta:', response.data);
                navigate('/perfil');
            } catch (error) {
                console.error('Error:', error);
            }
            finally{
                // Desactivar loading
                setLoading(false);
            }
        }
        
    }

    return(
        <div className="content">
            {loading ? (<Spinner></Spinner>) : null}
            <Header></Header>
            <main>
                <section className="section-form">
                    <h2>{id ? "Modificar asset" : "Subir asset"}</h2>
                    <p>Los campos marcados con * son obligatorios.</p>
                    <form action="" onSubmit={subirAsset}>
                        <Input inputName="name" labelText="Nombre *" inputTipo="text" inputChange={(e) => handleChange(e, "#name", "#name-error")} inputValue={formValues.name}></Input>
                        <ErrorMessage message='Campo "Nombre" es obligatorio' messageId='name-error'></ErrorMessage>
                        <Input inputName="description" labelText="Descripción *" inputTipo="textarea" inputChange={(e) => handleChange(e, "#description", "#description-error")} inputValue={formValues.description}></Input>
                        <ErrorMessage message='Campo "Descripción" es obligatorio' messageId='description-error'></ErrorMessage>
                        {/* <Input inputName="tags" labelText="Etiquetas" inputTipo="text"></Input> */}
                        <SuggestionsInput suggestions={suggestions} existingValues={tags} labelText="Etiquetas" inputName="tags" ariaLabel='Añadir etiqueta' returnValues={setTagsValues}></SuggestionsInput>
                        <UploadButton uploadFunction={handleFilesSelected}></UploadButton>
                        <ErrorMessage message='Campo "Ficheros" es obligatorio' messageId='files-error'></ErrorMessage>
                        {/* <section>
                            <h3>Ficheros cargados</h3> */}
                            {filesFicticios && filesFicticios.length ? (
                                <ul className="files">
                                    {filesFicticios.map((file, idx) => (
                                        <li key={file.filename + idx}><FileUpload fileName={file.filename} fileType={file.format} remove={() => removeFicticio(file.url)} categories={formatsList}></FileUpload></li>
                                    ))}
                                </ul>
                            ) : (null)}
                            <ul className="files">
                                {files.map((file, idx) => (
                                    <li key={file.name + idx}><FileUpload fileName={file.name} fileType={file.type} remove={() => remove(idx)} categories={formatsList}></FileUpload></li>
                                ))}
                                {/* <li><FileUpload fileName="script muy grande para probar ellipsis.m"></FileUpload></li>
                                <li><FileUpload fileName="script.cpp"></FileUpload></li>
                                <li><FileUpload fileName="script.cpp"></FileUpload></li> */}
                            </ul>
                        {/* </section> */}
                        <div className="form-botonera"><Button buttonName={id ? "Modificar asset" : "Subir asset"}></Button></div>
                    </form>
                </section>
                {/* <Download></Download> */}
            </main>
            <Footer></Footer>
        </div>
    );
}

export default SubirAsset;