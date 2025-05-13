import "./FileElement.css";

function FileElement({fileName}){
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
        <button className="file-element" onClick={(event) => changeColor(event.target)}><input type="checkbox" />{fileName}</button>
    );
}

export default FileElement;