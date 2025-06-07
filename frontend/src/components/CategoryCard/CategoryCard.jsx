import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({cardLink, cardImage, cardAlt="", cardLabel=""}){
    return(
        <div className="category-card">
            <Link to={cardLink}>
                <img src={cardImage} alt={cardAlt} className="category-img"/>
                <p>{cardLabel}</p>
            </Link>
        </div>
    );
}

export default CategoryCard;