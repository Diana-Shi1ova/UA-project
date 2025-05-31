import "./Checkbox.css";

function Checkbox({chLabel="", chId="", chClass=""}){
    return(
        <p className="check">
            <label><input type="checkbox" id={chId} className={chClass}/>{chLabel}</label>
        </p>
    );
}

export default Checkbox;