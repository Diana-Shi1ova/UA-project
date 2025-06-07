import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import "./Tag.css";

function Tag({tagName}){
    return(
        <div className="tag">
            <Link to={"/buscar?q="+tagName}><FaTag /> {tagName}</Link>
        </div>
    );
}

export default Tag;