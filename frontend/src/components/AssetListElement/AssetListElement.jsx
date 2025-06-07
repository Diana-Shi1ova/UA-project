import "./AssetListElement.css";
import { Link } from "react-router-dom";
import CategoryElement from "../CategoryElement/CategoryElement";
import Like from "../Like/Like";
import { div } from "three/src/nodes/TSL.js";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Dialog from "../Dialog/Dialog";
import axios from 'axios';
import img3D from '../../assets/cube-preview.avif';
import imgA from '../../assets/note-preview.jpg';
import imgV from '../../assets/video-preview.jpg';
import imgC from '../../assets/code-preview.jpg';
import imgO from '../../assets/ellipsis-preview.jpg';

function AssetListElement ({asset, modify=false, deleteAsset=()=>{}}) {
    const navigate = useNavigate();

    // Eliminar asset
    const eliminar = () => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este recurso?");
        if (confirmed) {
            // deleteAsset(asset._id);
            // Ficheros
            axios.delete(`/api/assets/${asset._id}/files-delete`, {files: []})
                .then(response => {
                    console.log('Deleted:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
            //Asset
            axios.delete(`/api/assets/${asset._id}`)
                .then(response => {
                    console.log('Deleted:', response.data);
                    deleteAsset(asset._id);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            
        }
    };
    //const categories = [...new Set(asset.downloadUrls.map(item => item.category))];

    // Calcular cantidad de ficheros de cada categoría
    const counts = asset.downloadUrls.reduce((acc, item) => {
        const category = item.category;
        if (category) {
            acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
    }, {});

    // Crear array tipo [ { category: 'music', count: 3 }, { category: 'ambient', count: 2 }, ... ]
    const categories = Object.entries(counts).map(([category, count]) => ({
        category,
        count,
    }));

    //const categories = [ { category: 'Audio', count: 3 }, { category: '2D', count: 2 }];

    // Ir a página de modificar


    // Elegir preview
    /*const src = '';

    const download2D = asset.downloadUrls.find(d => d.category === '2D');
    if (download2D) {
        src = download2D.url;
    } else {

    }*/
    const modificar = () => {
        navigate('/modificar-asset/'+asset._id);
    }

    // Elegir preview
    var src = '';
    
    if(asset && asset.downloadUrls.length){
        switch(asset.downloadUrls[0].category){
            case '2D': 
                src=asset.downloadUrls[0].url;
                break;
            case '3D':
                src=img3D;
                break;
            case 'Audio':
                src=imgA;
                break;
            case 'Vídeo':
                src=imgV;
                break;
            case 'Código':
                src=imgC;
                break;
            case 'Otros': src=imgO;
        }
    }


    


    return (
        <article className="asset-list-element">
            <Link to={"/asset/"+asset._id}>
                <img src={src} alt={"Vista previa "+asset.name} />
            </Link>
            <div className="nom-categ">
                <Link to={"/asset/"+asset._id}>
                    <p className="asset-name">{asset.name}</p>
                </Link>
                {categories.map((item, index) => (
                    <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                ))}
            </div>
            {modify ? (
                <div className="eliminar-modificar">
                    <Button ariaLabel="Modificar" icon="FaPencilAlt" buttonColor="warning" buttonFunction={modificar}></Button>
                    <Button ariaLabel="Eliminar" icon="FaTrashAlt" buttonColor="danger" buttonFunction={eliminar}></Button>
                </div>
            ) : (
                <Like likesNum={asset.likes} asset={asset._id}></Like>
            )}
        </article>
    );
}

export default AssetListElement;