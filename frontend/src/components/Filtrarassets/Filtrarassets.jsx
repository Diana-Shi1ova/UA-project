import Search from "../Search/Search";
import Checkbox from "../Checkbox/Checkbox";
import axios from "axios";
import { useEffect, useState } from 'react';
import './Filtrarassets.css';

function Filtrarassets({orientation="form-vertical"}){
    /*const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                console.log('categorias desde backend:', response.data);
                setCategorias(response.data);
            })
            .catch(error => {
                console.error('Error al obtener categorías:', error);
            });
    }, []);*/

    return(
        <form className="filtros-assets">
            <h3>Filtrar assets</h3>   
            <Search form={false}></Search>
            <div className={orientation}>
                <section>
                    <h4>Categoría</h4>
                    {/*{categorias.map((cat) => (
                        <Checkbox key={cat._id} chLabel={cat.name} />
                    ))}*/}
                    <Checkbox chLabel="2D" />
                    <Checkbox chLabel="3D" />
                    <Checkbox chLabel="Audio" />
                    <Checkbox chLabel="Vídeo" />
                    <Checkbox chLabel="Código" />
                    <Checkbox chLabel="Otros" />
                </section>
                <section>
                    <h4>Rango de fechas</h4>
                    <p>
                        <label htmlFor="inicio">Fecha inicio</label>
                        <input type="date" id="inicio"/>
                    </p>
                    <p>
                        <label htmlFor="fin">Fecha fin</label>
                        <input type="date"id="fin" />
                    </p>
                </section>
            </div>
        </form>
    );
}

export default Filtrarassets;