import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Avatar(){
    return(
        <div>
            <Link to="/login"><FaUserCircle /></Link>
        </div>
    );
}

export default Avatar;