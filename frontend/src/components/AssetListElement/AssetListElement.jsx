import "./AssetListElement.css";
import { Link } from "react-router-dom";
import CategoryElement from "../CategoryElement/CategoryElement";
import Like from "../Like/Like";

function AssetListElement ({asset}) {
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

    return (
        <article className="asset-list-element">
            <Link to={"/asset/"+asset._id}>
                <img src={asset?.downloadUrls?.[0]?.url || ''} alt={"Vista previa "+asset.name} />
            </Link>
            <div className="nom-categ">
                <Link to={"/asset/"+asset._id}>
                    <p className="asset-name">{asset.name}</p>
                </Link>
                {categories.map((item, index) => (
                    <Link key={index} to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category} iconOnly={true}></CategoryElement> {item.count}</Link>
                ))}
            </div>
                <Like likesNum={asset.likes} asset={asset._id}></Like>
        </article>
    );
}

export default AssetListElement;