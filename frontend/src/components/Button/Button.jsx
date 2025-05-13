import "./Button.css";

function Button({buttonClass="", buttonName="", buttonFunction=() => {}, buttonType="button", buttonId="enviar", ariaLabel = ""}){
    if(buttonType=="button"){
        return(
            <button onClick={buttonFunction} className={buttonClass} aria-label={ariaLabel || (typeof buttonName === "string" ? buttonName : "")}>{buttonName}</button>
        );
    }
    else if(buttonType=="submit"){
        return(
            <input type="submit" id={buttonId} className={buttonClass}/>
        );
    }
        
}

export default Button;