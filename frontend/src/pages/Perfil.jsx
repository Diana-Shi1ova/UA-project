import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import AssetCard from "../components/AssetCard/AssetCard";
// import Perfilbuttons from "../components/Perfilbuttons/Perfilbuttons";
import Filtrarassets from "../components/Filtrarassets/Filtrarassets";

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import "./Perfil.css";

function Perfil(){ 
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

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

                    <Filtrarassets orientation="form-horizontal"></Filtrarassets>
                </section>
                
                <section className="section-inicio">
                    <h3>Mis assets</h3>
                    <div className="line">
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                    </div>
                    
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Perfil;