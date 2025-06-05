import "./AssetListElement.css";
import { Link } from "react-router-dom";

function AssetListElement ({asset}) {
    return (
        <>
            <Link to={"asset/"+asset._id}>
                <img src={""} alt={"Vista previa"} />
                <p>{asset.name}</p>
                <p>Categorias</p>
                <p>Ficheros</p>
                <p>Likes</p>
            </Link>
        </>
    );
}

export default AssetListElement;