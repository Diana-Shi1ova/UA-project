import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";
import AssetListElement from "../components/AssetListElement/AssetListElement";
import "./Historial.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';

function Historial(){
    const { user } = useSelector((state) => state.auth);
    const [result, setResult] = useState({});
    const [filteredResult, setFilteredResult] = useState({});
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    useEffect(() => {
        axios.get(
            '/api/histories/assets',
            { params: { user: user._id } }
        )
        .then(response => {
            console.log(response.data);
            setResult(response.data);
            setFilteredResult(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const filtrar = (categs, name, dateFrom, dateTo) => {
        if(result?.groupedByDay?.length){
            const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
            const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;

            const filtrados = result.groupedByDay
                .map(grupo => {
                    // Obtenemos fecha
                    const groupDate = new Date(grupo._id.year, grupo._id.month - 1, grupo._id.day);

                    const matchesDateFrom = !fromDate || groupDate >= fromDate;
                    const matchesDateTo = !toDate || groupDate <= toDate;

                    if (!matchesDateFrom || !matchesDateTo) return null;

                    const assetsFiltrados = grupo.assets.filter(asset => {
                        // Comprobacón del nombre
                        const matchesName = !name || asset.name.toLowerCase().includes(name.toLowerCase());

                        // Comprobación de categorías
                        const matchesCategory = !categs || categs.length === 0 || 
                            asset.downloadUrls?.some(url => categs.includes(url.category));

                        return matchesName && matchesCategory;
                    });

                    // Devolvemos solo si hay assets
                    if (assetsFiltrados.length > 0) {
                        return {
                            _id: grupo._id,
                            assets: assetsFiltrados,
                            count: assetsFiltrados.length
                        };
                    }

                    return null;
                })
                .filter(Boolean); // Eliminar null

            setFilteredResult({ groupedByDay: filtrados });
        }
    };




    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="historial">
                    <h2>Historial</h2>
                    <div className="horizontal">
                        <Filtrarassets filtrar={filtrar}></Filtrarassets>
                            <div className="history-elements">
                            {filteredResult.groupedByDay && filteredResult.groupedByDay.length ? (
                                filteredResult.groupedByDay.map((item, index) => (
                                    <section key={index}>
                                        <h3>{item._id.day} de {monthNames[item._id.month-1]} de {item._id.year}</h3>
                                        <ul className="history-list">
                                            {item.assets.map((asset, idx) => (
                                                <li key={idx}><AssetListElement asset={asset}></AssetListElement></li>
                                            ))}
                                        </ul>
                                    </section>
                                ))
                                
                            ) : (
                                <p className="no-encontrado">No se ha encontrado nada...</p>
                            )}
                            </div>
                    </div>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Historial;