// import { FaRegTimesCircle } from "react-icons/fa";
import ButtonX from "../ButtonX/ButtonX";
import "./Parameter.css";

function Parameter ({text, remove}) {
    return (
        <span className="parameter">
            {text}
            <ButtonX buttonClass="parameter-button" buttonFunction={remove} ariaLabel={"Eliminar opción " + text} icon="FaRegTimesCircle"></ButtonX>
            {/* <button className="parameter-button" type="button" onClick={remove} aria-label={"Eliminar opción " + text}><FaRegTimesCircle /></button> */}
        </span>
    );
}

export default Parameter;