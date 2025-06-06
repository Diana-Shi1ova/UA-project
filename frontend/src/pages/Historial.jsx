import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";
import AssetListElement from "../components/AssetListElement/AssetListElement";
import "./Historial.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

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

    /*const filtrar = (categoriasFitrar, name, dateFrom, dateTo) => {
        const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
        const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;
        console.log(fromDate);
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
    }*/

    /*const filtrar = (categs, name, dateFrom, dateTo) => {
        const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
        const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;

        const filtrados = favoritos.filter(asset => {
            const matchesCategory =
            !categs || categs.length === 0 || categs.includes(asset.category);

            const matchesName =
            !name || asset.name.toLowerCase().includes(name.toLowerCase());

            const assetDate = new Date(asset.createdAt);

            const matchesDateFrom = !fromDate || assetDate >= fromDate;
            const matchesDateTo = !toDate || assetDate <= toDate;

            return matchesCategory && matchesName && matchesDateFrom && matchesDateTo;
        });

        setFilteredResult(filtrados);
    }*/

    /*const filtrar = (categs, name, dateFrom, dateTo) => {
        if(result?.groupedByDay?.length){
            const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
            const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;

            const filtrados = result.groupedByDay.map(grupo => {
                const assetsFiltrados = grupo.assets.filter(asset => {
                    const matchesCategory =
                        !categs || categs.length === 0 || categs.includes(asset.category);

                    const matchesName =
                        !name || asset.name.toLowerCase().includes(name.toLowerCase());

                    const assetDate = new Date(asset.createdAt);

                    const matchesDateFrom = !fromDate || assetDate >= fromDate;
                    const matchesDateTo = !toDate || assetDate <= toDate;

                    return matchesCategory && matchesName && matchesDateFrom && matchesDateTo;
                });

                return {
                    _id: grupo._id,
                    assets: assetsFiltrados,
                    count: assetsFiltrados.length
                };
            }).filter(grupo => grupo.assets.length > 0); // Borrar grupos vacíos

            console.log(filtrados);
            setFilteredResult({ groupedByDay: filtrados });
        }
        
    };*/

    const filtrar = (categs, name, dateFrom, dateTo) => {
        if(result?.groupedByDay?.length){
            const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
            const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;

            const filtrados = result.groupedByDay
                .map(grupo => {
                    // Собираем дату из _id
                    const groupDate = new Date(grupo._id.year, grupo._id.month - 1, grupo._id.day);

                    const matchesDateFrom = !fromDate || groupDate >= fromDate;
                    const matchesDateTo = !toDate || groupDate <= toDate;

                    if (!matchesDateFrom || !matchesDateTo) return null;

                    const assetsFiltrados = grupo.assets.filter(asset => {
                        // Проверка имени
                        const matchesName = !name || asset.name.toLowerCase().includes(name.toLowerCase());

                        // Проверка категорий: ищем хотя бы одно совпадение в downloadUrls
                        const matchesCategory = !categs || categs.length === 0 || 
                            asset.downloadUrls?.some(url => categs.includes(url.category));

                        return matchesName && matchesCategory;
                    });

                    // Возвращаем новый объект только если остались ассеты
                    if (assetsFiltrados.length > 0) {
                        return {
                            _id: grupo._id,
                            assets: assetsFiltrados,
                            count: assetsFiltrados.length
                        };
                    }

                    return null;
                })
                .filter(Boolean); // Убираем null

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
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Historial;