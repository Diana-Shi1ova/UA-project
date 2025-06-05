import "./FileElement.css";
import CategoryElement from "../CategoryElement/CategoryElement";

function FileElement({fileName, categoryName, fileChecked=false, fileOnCheck=()=>{}}){
    var cont = 0;
    const changeColor = (but) =>{
        if(cont==0){
            cont++;
            but.classList.add('active');
        }
        else{
            cont--;
            but.classList.remove('active');
        }
    }

    return(
        <button className="file-element" onClick={(event) => changeColor(event.target)}><input type="checkbox" name={fileName} checked={fileChecked} onChange={fileOnCheck}/><CategoryElement categoryName={categoryName} iconOnly={true}></CategoryElement>{fileName}</button>
    );
}

export default FileElement;