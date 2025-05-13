import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import "./Tag.css";

function Tag(){
    return(
        <div className="tag">
            <Link to="/buscar?tag=Tag1"><FaTag /> Tag 1</Link>
        </div>
    );
}

export default Tag;