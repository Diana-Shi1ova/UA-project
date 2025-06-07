import { Link } from "react-router-dom";
import img_2d from "../../assets/2d-1.jpg";
import Tag from "../Tag/Tag"
import { useSelector } from "react-redux";
import Video from "../Video/Video";
import Audio from "../Audio/Audio";
import Like from "../Like/Like";
import CategoryElement from "../CategoryElement/CategoryElement";
import preview from "../../assets/preview.webp";

import "./AssetCard.css";

function AssetCard({asset, categoria}){
    const {user} = useSelector((state) => state.auth);

    if(asset && categoria) {
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

    if(categoria==="2D"){
        const first = asset.downloadUrls.find(file => file.category === '2D');
        if(first){
            return(
                <article className="asset-card">
                    <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}>
                        <img src={first.url} alt={"Vista previa "+ asset.name} className="asset-image"/>
                        <p>{asset.name}</p>
                    </Link>
                    {categories.map((item, index) => (
                        <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                    ))}
                    {user && user._id ? (<Like likesNum={asset.likes} asset></Like>) : (null)}
                </article>
            );
        }
    }
    if(categoria==="3D"){
        return(
            <article className="asset-card">
                <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}>
                    <img src={asset.preview ? (asset.preview) : (preview)} alt={"Vista previa "+ asset.name} className="asset-image"/>
                    <p>{asset.name}</p>
                </Link>
                    {categories.map((item, index) => (
                        <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                    ))}
                    {user && user._id ? (<Like likesNum={asset.likes} asset></Like>) : (null)}
            </article>
        ); 
    }
    else if(categoria === "Vídeo"){
        const first = asset.downloadUrls.find(file => file.category === 'Vídeo');
        if(first){
            return(
                <article className="asset-card">
                        <Video videoSrc={first.url}></Video>
                        <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}><p>{asset.name}</p></Link>
                        {categories.map((item, index) => (
                            <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                        ))}
                        {user && user._id ? (<Like likesNum={asset.likes} asset></Like>) : (null)}
                </article>
            );
        }
    }
    else if(categoria==="Audio"){
        const first = asset.downloadUrls.find(file => file.category === 'Audio');
        console.log(first);
        if(first){
            return(
                <article className="asset-card-list">
                        <Audio audioSrc={first.url}></Audio>
                        <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}><p>{asset.name}</p></Link>
                        {categories.map((item, index) => (
                            <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                        ))}
                        {user && user._id ? (<Like likesNum={asset.likes} asset></Like>) : (null)}
                </article>
            );
        }
    }
    else if(categoria==="Código"){
        return(
            <article className="asset-card-list">
                <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}>
                    <p className="title">{asset.name}</p>
                    {/* <p>{asset.description}</p> */}
                </Link>
                    {categories.map((item, index) => (
                        <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                    ))}
                    <p className="description">{asset.description}</p>
                    {user && user._id ? (<Like likesNum={asset.likes} asset></Like>) : (null)}
                
            </article>
        );
    }
    else if(categoria==="Otros"){
        return(
            <article className="asset-card-list">
                <Link to={user && user._id ? ("/asset/"+asset._id) : ("/login")}>
                    <p className="title">{asset.name}</p>
                    {/* <p>{asset.description}</p> */}
                </Link>
                    {categories.map((item, index) => (
                        <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                    ))}
                    <p className="description">{asset.description}</p>
                    {user && user._id? (<Like likesNum={asset.likes} asset></Like>) : (null)}
            </article>
        );
    }
    }
}

export default AssetCard;