import "./Checkbox.css";

function Checkbox({chLabel="", chName="", chClass="", chChecked=false, chChange=() => []}){
    return(
        <p className="check">
            <label><input type="checkbox" name={chName} className={chClass} checked={chChecked} onChange={chChange}/>{chLabel}</label>
        </p>
    );
}

export default Checkbox;