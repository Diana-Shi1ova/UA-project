import { Link } from "react-router-dom";
import "./CategoryCard.css";

function CategoryCard({cardLink, cardImage, cardAlt="", cardLabel=""}){
    return(
        <article className="category-card">
            <Link to={cardLink}>
                <img src={cardImage} alt="" className="category-img"/>
                <p>{cardLabel}</p>
            </Link>
        </article>
    );
}

export default CategoryCard;