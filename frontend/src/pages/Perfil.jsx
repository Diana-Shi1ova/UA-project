import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
// import AssetCard from "../components/AssetCard/AssetCard";
import AssetListElement from "../components/AssetListElement/AssetListElement";
// import Perfilbuttons from "../components/Perfilbuttons/Perfilbuttons";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import "./Perfil.css";
import { useState, useEffect } from "react";
import axios from 'axios';

function Perfil(){ 
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [assets, setAssets] = useState();
    const [assetsFiltrados, setAssetsFiltrados] = useState()

    //Obteber assets del usuario
     useEffect(() => {
            axios.get(`${import.meta.env.VITE_API_URL}/api/assets/user/${user._id}`)
                .then(response => {
                    console.log('assets:', response.data);
                    setAssets(response.data);
                    setAssetsFiltrados(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    }, []);

    const filtrar = (categs, name, dateFrom, dateTo) => {
        if(assets && assets.length){
            const filtrados = assets.filter(asset => {
                /*const matchesCategory =
                !categs || categs.length === 0 || categs.includes(asset.category);*/

                // Comprobación de categorías
                const matchesCategory = !categs || categs.length === 0 || 
                asset.downloadUrls?.some(url => categs.includes(url.category));

                // Comprobamos nombre
                const matchesName =
                !name || asset.name.toLowerCase().includes(name.toLowerCase());

                // Comprobamos fechas
                const assetDate = new Date(asset.createdAt);
                const fromDate = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
                const toDate = dateTo ? new Date(dateTo + "T23:59:59.999") : null;
                // const groupDate = new Date(grupo._id.year, grupo._id.month - 1, grupo._id.day);

                const matchesDateFrom = !fromDate || assetDate >= fromDate;
                const matchesDateTo = !toDate || assetDate <= toDate;

                if (!matchesDateFrom || !matchesDateTo) return null;

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

            console.log('filtrados', filtrados);
            setAssetsFiltrados(filtrados);
        }
    }

    const deleteAsset = (assetId) => {
        const nuevoArray = assets.filter(item => item._id !== assetId);
        setAssets(nuevoArray);
        setAssetsFiltrados(nuevoArray);
    }

    return( 
        <div className="content">
            <Header></Header>
            <main>
                {/* <h2>Perfil</h2> */}
                {/* <Perfilbuttons></Perfilbuttons> */}
                {/* <Card></Card> */}
                <section className="perfil-header">
                    <h2>{user.name}</h2>

                    <div className="foto-mis-datos">
                        <img src={user.avatar} alt="Foto de perfil" />
                        <Button buttonName="Mis datos" buttonColor="secondary" buttonFunction={() => navigate("/mis-datos")} icon="FaCog"></Button>
                    </div>
                    
                    <div className="botones-perfil">
                        <Button buttonName="Añadir asset" buttonFunction={() => navigate("/subir-asset")} icon="FaPlus"></Button>
                        <div className="botones-perfil-h">
                            <Button buttonName="Historial" buttonColor="secondary" buttonFunction={() => navigate("/historial")} icon="FaRegClock"></Button>
                            <Button buttonName="Favoritos" buttonColor="secondary" buttonFunction={() => navigate("/favoritos")} icon="FaHeart"></Button>
                        </div>
                        
                    </div>

                    <Filtrarassets orientation="form-horizontal" filtrar={filtrar}></Filtrarassets>
                </section>
                
                <section className="section-inicio">
                    <h3>Mis assets</h3>
                    <div className="line">
                        {assetsFiltrados && assetsFiltrados.length ? (
                            assetsFiltrados.map((item, index) => (
                                <AssetListElement key={index} asset={item} modify={true} deleteAsset={deleteAsset}></AssetListElement>
                                // <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>
                    
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Perfil;