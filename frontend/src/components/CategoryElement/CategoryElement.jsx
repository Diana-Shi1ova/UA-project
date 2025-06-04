import { FaImage } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaItunesNote } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaEllipsisH } from "react-icons/fa";
import "./CategoryElement.css";

function CategoryElement ({categoryName}) {
    switch(categoryName){
        case "2D":
            return (<p className="categoryElement"><FaImage/>{categoryName}</p>);
            break;
        case "3D":
            return (<p className="categoryElement"><FaCube/>{categoryName}</p>);
            break;
        case "Audio":
            return (<p className="categoryElement"><FaItunesNote/>{categoryName}</p>);
            break;
        case "Vídeo":
            return (<p className="categoryElement"><FaVideo/>{categoryName}</p>);
            break;
        case "Vídeo":
            return (<p className="categoryElement"><FaVideo/>{categoryName}</p>);
            break;
        default:
            return (<p className="categoryElement"><FaEllipsisH/>{categoryName}</p>);
            break;
    }
}

export default CategoryElement;