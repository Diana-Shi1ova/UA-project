import Search from "../Search/Search";
import Checkbox from "../Checkbox/Checkbox";
import axios from "axios";
import { useEffect, useState } from 'react';
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup";
import './Filtrarassets.css';

function Filtrarassets({orientation="form-vertical", filtrar=()=>{}, dates=true}){
    const categorias = ["2D", "3D", "Audio", "Vídeo", "Código", "Otros"];
    const [categoriasFitrar, setCategoriasFitrar] = useState([]);
    const [checkboxList, setCheckboxList] = useState( // Lista de checkboxes (nombre: marcado)
        Object.fromEntries(categorias.map((item) => [item, false]))
    );
    const [name, setName] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // const [result, setResult] = useState([]);

    /*useEffect(() => {
        const params = {};
        if(name) params.name = name;
        if (categoriasFitrar?.length) params.categories = categoriasFitrar.join(',');
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;

        axios.get('/api/assets/search/', {
            params
        })
            .then(response => {
                setResult(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [categoriasFitrar, name, dateFrom, dateTo]);*/

    useEffect(() => {
        filtrar(categoriasFitrar, name, dateFrom, dateTo);
    }, [categoriasFitrar, name, dateFrom, dateTo]);

    const setCategorias = (e) => {
        const { name, checked } = e.target;

        // Modificar estado de checkboxes
        setCheckboxList(prev => ({
            ...prev,
            [name]: checked
        }));

        if(checked){
            // Añadir nombre a la lista
            const newArray = [...categoriasFitrar, name];
            setCategoriasFitrar(newArray);
        }
        else{
            // Eliminar nombre de la lista
            const newArray = categoriasFitrar.filter(item => item !== name);
            setCategoriasFitrar(newArray);
        }
    }

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const dateFromChange = (e) => {
        console.log(e.target.value);
        setDateFrom(e.target.value);
    }

    const dateToChange = (e) => {
        console.log(e.target.value);
        setDateTo(e.target.value);
    }

    return(
        <form className="filtros-assets">
            <h3>Filtrar assets</h3>   
            <Search form={false} searchChange={nameChange}></Search>
            <div className={orientation}>
                <section>
                    <h4>Categoría</h4>
                    {/*{categorias.map((cat) => (
                        <Checkbox key={cat._id} chLabel={cat.name} />
                    ))}*/}
                    {/* <CheckboxGroup itemsList={categoriasFitrar} cambiarLista={setCategorias} todo={false} reverse={true}></CheckboxGroup> */}

                    <Checkbox chLabel="2D" chName="2D" chChecked={checkboxList["2D"]} chChange={setCategorias}/>
                    <Checkbox chLabel="3D" chName="3D" chChecked={checkboxList["3D"]} chChange={setCategorias}/>
                    <Checkbox chLabel="Audio" chName="Audio" chChecked={checkboxList["Audio"]} chChange={setCategorias}/>
                    <Checkbox chLabel="Vídeo" chName="Vídeo" chChecked={checkboxList["Vídeo"]} chChange={setCategorias}/>
                    <Checkbox chLabel="Código" chName="Código" chChecked={checkboxList["Código"]} chChange={setCategorias}/>
                    <Checkbox chLabel="Otros" chName="Otros" chChecked={checkboxList["Otros"]} chChange={setCategorias}/> 
                </section>
                {dates ? (
                <section>
                    <h4>Rango de fechas</h4>
                    <p>
                        <label htmlFor="inicio">Fecha inicio</label>
                        <input type="date" id="inicio" onChange={dateFromChange}/>
                    </p>
                    <p>
                        <label htmlFor="fin">Fecha fin</label>
                        <input type="date"id="fin" onChange={dateToChange}/>
                    </p>
                </section>) : null}
            </div>
        </form>
    );
}

export default Filtrarassets;