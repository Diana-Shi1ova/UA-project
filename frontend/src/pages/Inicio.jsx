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

function Inicio(){
    return(
        <div className="content">
            <Header></Header>
            <main>
                <h2>Inicio</h2>
                <h3>Categorías</h3>
                <div className="cuadricula">
                    <CategoryCard cardLink="/2d" cardImage={img_2d} cardAlt="2D" cardLabel="2D"></CategoryCard>
                    <CategoryCard cardLink="/3d" cardImage={img_3d} cardAlt="3D" cardLabel="3D"></CategoryCard>
                    <CategoryCard cardLink="/audio" cardImage={img_audio} cardAlt="Audio" cardLabel="Audio"></CategoryCard>
                    <CategoryCard cardLink="/video" cardImage={img_video} cardAlt="Vídeo" cardLabel="Vídeo"></CategoryCard>
                    <CategoryCard cardLink="/codigo" cardImage={img_codigo} cardAlt="Código" cardLabel="Código"></CategoryCard>
                    <CategoryCard cardLink="/otros" cardImage={img_otros} cardAlt="Otros" cardLabel="Otros"></CategoryCard>
                </div>
                
                <section className="section-inicio">
                    <h3>Novedades</h3>
                    <h4 className="list">2D</h4>
                    <div className="line">
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                    </div>

                    <h4 className="list">3D</h4>
                    <div className="line">
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                        <AssetCard></AssetCard>
                    </div>

                    <h4 className="list">Audio</h4>
                    <div className="line">
                        <AudioListed></AudioListed>
                    </div>

                    <h4 className="list">Vídeo</h4>
                    <div className="line">
                        <Video></Video>
                    </div>

                    <h4 className="list">Código</h4>
                    <div className="line"></div>

                    <h4 className="list">Otros</h4>
                    <div className="line"></div>
                </section>

                <Footer></Footer>
            </main>
        </div>
    );
}

export default Inicio;