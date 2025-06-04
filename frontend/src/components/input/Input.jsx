import "./Input.css";

function Input({ labelText, inputName = "", inputTipo, inputChange=()=>{}, inputValue, options = []}){
    return(
        inputTipo==="textarea" ? (
            <p className="input-form">
                <label htmlFor={inputName}>{labelText}</label>
                {/* <input type={inputTipo} name={inputName} id={inputName} autoComplete="on" onChange={inputChange} value={inputValue}/> */}
                <textarea name={inputName} id={inputName} onChange={inputChange} value={inputValue}></textarea>
            </p>
        ) : inputTipo==="select" ? (
            <p className="input-form">
                <label htmlFor={inputName}>{labelText}</label>
                {/* <input type={inputTipo} name={inputName} id={inputName} autoComplete="on" onChange={inputChange} value={inputValue}/> */}
                <select name={inputName} id={inputName} onChange={inputChange} value={inputValue}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </p>
        ) : (
            <p className="input-form">
                <label htmlFor={inputName}>{labelText}</label>
                <input type={inputTipo} name={inputName} id={inputName} autoComplete="on" onChange={inputChange} value={inputValue}/>
            </p>
        )
    );
}

export default Input;