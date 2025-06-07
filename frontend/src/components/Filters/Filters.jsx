import "./Filters.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SuggestionsInput from "../SuggestionsInput/SuggestionsInput";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useState } from "react";
import axios from 'axios';
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";

function Filters ({category, authorSuggestions=[], buscar=()=>{}}) {
    const [ordenarPor, setOrdenarPor] = useState('newest');
    const [nameAsset, setNameAsset] = useState('');
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [formats, setFormats] = useState([]);
    const [formatsList, setFormatsList] = useState([]);
    const [tagSuggestions, setTagSuggestions] = useState([]);
    const [reset, setReset] = useState(false);

    const options = [
        {value: 'newest', label: 'Novedad'},
        {value: 'likes', label: 'Popularidad'},
    ]

    // Obtener etiquetas
    useEffect(() => {
        console.log('useEffect')
        axios.get(
            `${import.meta.env.VITE_API_URL}/api/tags/`
        )
        .then(response => {
            console.log(response.data);
            const strings = response.data.map(obj => obj.name);
            setTagSuggestions(strings);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    // Obtener formatos
    useEffect(() => {
        console.log('Formatos por: ',category);
        if(!category) return;

        axios.get(`${import.meta.env.VITE_API_URL}/api/formats/by-category?category=${category}`)
            .then(response => {
                const f = response.data[0].formats;
                f.push("Otro");
                setFormats(f);
                setFormatsList(f);
                console.log(f);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [category]);

    // Realizar filtrado
    useEffect(() => {
        setReset(false);
        if (ordenarPor || nameAsset || (authors?.length > 0) || (tags?.length > 0)) {
            buscar(ordenarPor, nameAsset, authors, tags, formats);
        }
    }, [ordenarPor, nameAsset, authors, tags, formats]);

    const setTagsValues = (ts) => {
        setTags(ts);
    }

    const setAuthorsValues = (autrs) => {
        setAuthors(autrs);
    }

    const setNameValue = (e) => {
        setNameAsset(e.target.value);
    }

    const setOrdenar = (e) => {
        setOrdenarPor(e.target.value);
    }

    const limpiar = (e) => {
        e.preventDefault();

        setOrdenarPor('newest');
        setNameAsset('');
        setAuthors([]);
        setTags([]);
        setFormats([formatsList]);
        setReset(true);
    }

    const setFormatsValues = (f) => {
        console.log('Formatos a buscar', f)
        setFormats(f);
    }

    return (
        <form className="filters">
            <Button buttonName="Resetear filtros" icon="FaBackspace" buttonFunction={limpiar}></Button>
            <Input inputTipo={"select"} labelText="Ordenar por" inputName="order" options={options} inputValue={ordenarPor} inputChange={setOrdenar}></Input>
            <Input inputTipo={"text"} labelText="Búsqueda textual" inputName="name" inputChange={setNameValue} inputValue={nameAsset}></Input>
            <SuggestionsInput suggestions={tagSuggestions} labelText="Etiquetas" inputName="tags" ariaLabel='Añadir etiqueta' returnValues={setTagsValues} reset={reset}></SuggestionsInput>
            <SuggestionsInput suggestions={authorSuggestions} labelText="Autores" inputName="authors" ariaLabel='Añadir autor' returnValues={setAuthorsValues} reset={reset}></SuggestionsInput>
            {/* <SuggestionInput></SuggestionInput>
            <SuggestionInput></SuggestionInput> */}
            <p>Formatos</p>
            <CheckboxGroup itemsList={formatsList} cambiarLista={setFormatsValues} reset={reset}></CheckboxGroup>
        </form>
    );
}

export default Filters;