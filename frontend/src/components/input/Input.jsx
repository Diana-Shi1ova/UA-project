import "./Input.css"

function Input({ labelText, inputId = "input", inputTipo}){
    return(
        <p className="input-form">
            <label htmlFor={inputId}>{labelText}</label>
            <input type={inputTipo} id={inputId} autoComplete="true"/>
        </p>
    );
}

export default Input;