import * as FaIcons from "react-icons/fa";
import "./ButtonX.css";

function ButtonX ({buttonClass="", icon, buttonFunction = () => {}, ariaLabel}) {
    const IconComponent = FaIcons[icon];
    
    return (
        <button
            className={"button-x "+buttonClass} 
            onClick={buttonFunction} 
            aria-label={ariaLabel} 
            type="button"
        >{IconComponent && <IconComponent/>}</button>
    );
}

export default ButtonX;