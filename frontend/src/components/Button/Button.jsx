import "./Button.css";
import * as FaIcons from "react-icons/fa";

function Button({buttonClass="", buttonName="", buttonFunction=() => {}, buttonType="button", ariaLabel = "", icon = "", buttonColor="primary", buttonDisabled=false}){
    const IconComponent = FaIcons[icon];
    if(buttonType=="button"){
        return(
            <button 
                onClick={buttonFunction} 
                className={"but-svg "+buttonClass+" "+buttonColor} 
                aria-label={ariaLabel || (typeof buttonName === "string" ? buttonName : "")}
                disabled={buttonDisabled}
                // id={buttonId}
            >
                {IconComponent && <IconComponent />}
                {buttonName}
            </button>
        );
    }
    else if(buttonType=="submit"){
        return(
            <input type="submit" id={buttonId} className={buttonClass}/>
        );
    }
        
}

export default Button;