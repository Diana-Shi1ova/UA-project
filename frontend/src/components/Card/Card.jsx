import Tag from "../Tag/Tag";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Img from "../../assets/2d.avif";

function Card(){
    return(
        <div className="card">
            <img src={Img} alt="" />
            <Tag></Tag>
            <button><FaRegPenToSquare /></button>
            <button><FaTrashAlt /></button>  
        </div>
    );
}

export default Card;