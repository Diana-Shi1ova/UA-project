import { FaRegTimesCircle } from "react-icons/fa";
import "./Parameter.css";

function Parameter ({text, remove}) {
    return (
        <span className="parameter">
            {text}
            <button className="parameter-button" type="button" onClick={remove} aria-label={"Eliminar opción " + text}><FaRegTimesCircle /></button>
        </span>
    );
}

export default Parameter;