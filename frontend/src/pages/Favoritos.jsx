import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";
import AssetListElement from "../components/AssetListElement/AssetListElement";
import "./Favoritos.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from 'axios';
// import Card from "../components/Card/Card";
// import Perfilbuttons from "../components/Perfilbuttons/Perfilbuttons";
// import Filtrarassets from "../components/Filtrarassets/Filtrarassets";

function Favoritos(){ 
    const { user } = useSelector((state) => state.auth);
    const { likedAssetIds } = useSelector((state) => state.likes);
    const [favoritos, setFavoritos] = useState([]);
    const [favoritosFiltrados, setFavoritosFiltrados] = useState([]);

    useEffect(() => {
        console.log(likedAssetIds);
        const idsArray = likedAssetIds.map(obj => obj.asset);;

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/assets/by-ids`,
            { ids: idsArray }
        )
        .then(response => {
            console.log(response.data);
            setFavoritos(response.data);
            setFavoritosFiltrados(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [likedAssetIds]);

    /*const filtrar = (categs, name, dateFrom, dateTo) => {
        const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
        const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;*/
    const filtrar = (categs, name, dateFrom, dateTo) => {
        const filtrados = favoritos.filter(asset => {
            /*const matchesCategory =
            !categs || categs.length === 0 || categs.includes(asset.category);*/
            // Comprobación de categorías
            const matchesCategory = !categs || categs.length === 0 || 
            asset.downloadUrls?.some(url => categs.includes(url.category));

            const matchesName =
            !name || asset.name.toLowerCase().includes(name.toLowerCase());

            /*const assetDate = new Date(asset.createdAt);
            const matchesDateFrom =
            !dateFrom || assetDate >= new Date(dateFrom);

            const matchesDateTo =
            !dateTo || assetDate <= new Date(dateTo);*/

            /*const assetDate = new Date(asset.createdAt);

            const matchesDateFrom = !fromDate || assetDate >= fromDate;
            const matchesDateTo = !toDate || assetDate <= toDate;*/

            return matchesCategory && matchesName;
        });

        setFavoritosFiltrados(filtrados);
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                <section className="favoritos">
                    <h2>Favoritos</h2>
                    <div className="horizontal">
                        <Filtrarassets filtrar={filtrar} dates={false}></Filtrarassets>
                        
                            {favoritos.length ? (
                                <ul className="favoritos-list">
                                    {favoritosFiltrados.map((item, index) => (
                                        <li key={index}><AssetListElement asset={item}></AssetListElement></li>
                                    ))}
                                </ul>
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

export default Favoritos;