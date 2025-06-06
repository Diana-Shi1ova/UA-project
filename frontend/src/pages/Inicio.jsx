import Header from "../components/Header/Header";

import CategoryCard from "../components/CategoryCard/CategoryCard";
import AssetCard from "../components/AssetCard/AssetCard";
import Footer from "../components/Footer/Footer"
import AudioListed from "../components/AudioListed/AudioListed";
import Video from "../components/Video/Video";

import reactLogo from '../assets/image.png';

import img_2d from '../assets/2d.avif';
import img_3d from '../assets/3d-1.jpg';
import img_audio from '../assets/audio.jpg';
import img_video from '../assets/video.png';
import img_codigo from '../assets/codigo.webp';
import img_otros from '../assets/other.jpg';

import axios from "axios";
import { useEffect, useState } from "react";

function Inicio(){
    const [assets_2d, setAssets_2d] = useState();
    const [assets_3d, setAssets_3d] = useState();
    const [assets_audio, setAssets_audio] = useState();
    const [assets_video, setAssets_video] = useState();
    const [assets_codigo, setAssets_codigo] = useState();
    const [assets_otros, setAssets_otros] = useState();

    useEffect(() => {
        axios.get('/api/assets/search/', {
            params: {
                categories: '2D',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('2D:', response.data);
                setAssets_2d(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        axios.get('/api/assets/search/', {
            params: {
                categories: '3D',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('3D:', response.data);
                setAssets_3d(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        axios.get('/api/assets/search/', {
            params: {
                categories: 'Audio',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('Audio:', response.data);
                setAssets_audio(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        axios.get('/api/assets/search/', {
            params: {
                categories: 'Vídeo',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('Video:', response.data);
                setAssets_video(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        axios.get('/api/assets/search/', {
            params: {
                categories: 'Código',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('Codigo:', response.data);
                setAssets_codigo(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        axios.get('/api/assets/search/', {
            params: {
                categories: 'Otros',
                page: 1,
                limit: 5
            }
        })
            .then(response => {
                console.log('Otros:', response.data);
                setAssets_otros(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return(
        <div className="content">
            <Header></Header>
            <main>
                <h2>Inicio</h2>
                <h3>Categorías</h3>
                <div className="cuadricula">
                    <CategoryCard cardLink="/2D" cardImage={img_2d} cardAlt="2D" cardLabel="2D"></CategoryCard>
                    <CategoryCard cardLink="/3D" cardImage={img_3d} cardAlt="3D" cardLabel="3D"></CategoryCard>
                    <CategoryCard cardLink="/Audio" cardImage={img_audio} cardAlt="Audio" cardLabel="Audio"></CategoryCard>
                    <CategoryCard cardLink="/Vídeo" cardImage={img_video} cardAlt="Vídeo" cardLabel="Vídeo"></CategoryCard>
                    <CategoryCard cardLink="/Código" cardImage={img_codigo} cardAlt="Código" cardLabel="Código"></CategoryCard>
                    <CategoryCard cardLink="/Otros" cardImage={img_otros} cardAlt="Otros" cardLabel="Otros"></CategoryCard>
                </div>
                
                <section className="section-inicio">
                    <h3>Novedades</h3>
                    <h4 className="list">2D</h4>
                    <div className="line">
                        {/* <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard> */}
                        {assets_2d && assets_2d.length ? (
                            assets_2d.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>

                    <h4 className="list">3D</h4>
                    <div className="line">
                        {assets_3d && assets_3d.length ? (
                            assets_3d.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>

                    <h4 className="list">Audio</h4>
                    <div className="line">
                        {assets_audio && assets_audio.length ? (
                            assets_audio.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>

                    <h4 className="list">Vídeo</h4>
                    <div className="line">
                        {assets_video && assets_video.length ? (
                            assets_video.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>

                    <h4 className="list">Código</h4>
                    <div className="line">
                        {assets_codigo && assets_codigo.length ? (
                            assets_codigo.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>

                    <h4 className="list">Otros</h4>
                    <div className="line">
                        {assets_otros && assets_otros.length ? (
                            assets_otros.map((item, index) => (
                                <AssetCard key={index}></AssetCard>
                        ))) : null}
                    </div>
                </section>

                <Footer></Footer>
            </main>
        </div>
    );
}

export default Inicio;