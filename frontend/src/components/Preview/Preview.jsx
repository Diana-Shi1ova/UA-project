import "./Preview.css";
import Like from "../Like/Like";
import Button from "../Button/Button";
import FileElement from "../FileElement/FileElement";
import Download from "../Download/Download";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useState } from "react";
import Ellipsis from "../Ellipsis/Ellipsis";
import CategoryElement from "../CategoryElement/CategoryElement";
// import CodeViewer from "../CodeViewer/CodeViewer";
// import Viewer3D from "../Viewer3D/Viewer3D";
// import Video from "../Video/Video";
// import Audio from "../Audio/Audio";
import PreviewAdaptative from "../PreviewAdaptative/PreviewAdaptative";

function Preview ({items=[], userId, assetId, likes}) {
    console.log(items);
    /*
    Items debe tener esta estructura:
    const items = [
        { file: 'file1.cpp', categ: 'categ 1' },
        { file: 'file2.cpp', categ: 'categ 2' },
        { file: 'file3.cpp', categ: 'categ 3' },
    ];
    */
    const [masterChecked, setMasterChecked] = useState(true); // true/false si Todos está marcado o no
    const [disabled, setDisabled] = useState(false); // Para desabilitar el botón de descarga
    const files = items.map(obj => obj.filename); // Todos los nombres de ficheros
    const [fichero, setFichero] = useState(0); // Fichero a mostrar
    const [checkedList, setCheckedList] = useState(files); // Lista de nombres de ficheros (array de strings) a descargar
    const [checkboxList, setCheckboxList] = useState( // Lista de checkboxes (nombre: marcado)
        Object.fromEntries(items.map((item) => [item.filename, true]))
    );

    const onMasterChange = (e) => {
        const value = e.target.checked;
        console.log(e.target.name);
        setMasterChecked(value);

        if(value){
            setCheckedList(files);
            setDisabled(false);
        }
        else{
            setCheckedList([]);
            setDisabled(true);
        }

        const newState = Object.fromEntries(
            items.map((item) => [item.filename, value])
        );
        setCheckboxList(newState);
    };
    
    const onItemChange = (e) => {
        const { name, checked } = e.target;

        // Modificar estado de checkboxes
        setCheckboxList(prev => ({
            ...prev,
            [name]: checked
        }));

        
        if(checked){
            setDisabled(false); // Habilitar el botón

            // Añadir nombre a la lista a descargar
            const newArray = [...checkedList, name];
            setCheckedList(newArray);

            // Comprobar si la lista es completa
            if(newArray.length==files.length){
                //Marcar todo
                setMasterChecked(true);
            }
        }

        else{
            // Eliminar nombre de la lista a descargar
            const newArray = checkedList.filter(item => item !== name);
            setCheckedList(newArray);

            // Si no hay nada a descargar
            if(newArray.length==0){
                setDisabled(true); // Deshabilitar el botón
            }

            //Desmarcar Todo
            setMasterChecked(false);
        }
    }

    const atras = () => {
        const newIndex = fichero-1;
        if(newIndex < 0)
            setFichero(0);
        else
            setFichero(newIndex);
    }

    const adelante = () => {
        const newIndex = fichero+1;
        if(newIndex >= items.length)
            setFichero(items.length-1);
        else
            setFichero(newIndex);
    }


    return (
        <div className="section-asset section-preview">
            <div className="preview">
                <div className="file-and-icon">
                    <CategoryElement categoryName={items[fichero].category} iconOnly={true}></CategoryElement>
                    <Ellipsis text={items[fichero].filename} numChar={50}></Ellipsis>
                </div>
                
                <div className="carousel">
                    {/* <img src={items[0].url} alt={"Previsualización " + items[0].filename} /> */}
                    {/* <CodeViewer fileUrl={'https://ovlqvvbzyqzscmsrxcsj.supabase.co/storage/v1/object/public/molamazogames/assets/683719947504b0a4973288d4/683d0f5db0dcee937a1dd54e/ejemplo.html'}></CodeViewer> */}
                    {/* <Viewer3D modelUrl={'https://modelviewer.dev/shared-assets/models/Astronaut.glb'}></Viewer3D> */}
                    {/* <Video></Video> */}
                    {/* <Audio></Audio> */}
                    <PreviewAdaptative url={items[fichero].url} category={items[fichero].category} name={"Previsualización " + items[fichero].filename}></PreviewAdaptative>
                </div>
                
                    {items.length>1 ? (
                        <div className="carousel-buttons">
                            <Button buttonClass="but-carousel but-c-1" icon="FaCaretLeft" ariaLabel="Mostrar anterior" buttonColor="primary" buttonFunction={atras}></Button>
                            <Like likesNum={likes} asset={assetId}></Like>
                            <Button buttonClass="but-carousel but-c-2" icon="FaCaretRight" ariaLabel="Mostrar siguiente" buttonColor="primary"  buttonFunction={adelante}></Button>
                        </div>
                    ) : (
                        <Like likesNum={likes} asset={assetId}></Like>
                    )}
            </div>
            <section className="files">
                <h3>Ficheros</h3>
                <Checkbox chLabel="Todo" chName="all" chChecked={masterChecked} chChange={onMasterChange}></Checkbox>
                <ul>
                    {/* <li><FileElement fileName="character.3ds" fileOnCheck={onItemChange}></FileElement></li>
                    <li><FileElement fileName="script.cpp" fileOnCheck={onItemChange}></FileElement></li>
                    <li><FileElement fileName="sounds.mp3" fileOnCheck={onItemChange}></FileElement></li> */}
                    {items ? (
                        items.map((item, index) => (
                            <li key={index}><FileElement fileName={item.filename} categoryName={item.category} fileOnCheck={onItemChange} fileChecked={checkboxList[item.filename]}></FileElement></li>
                        ))
                    ) : null}
                </ul>
                <Download downloadButton={true} userId={userId} assetId={assetId} downloadList={checkedList} downloadDisabled={disabled}></Download>
                {/* <Download downloadButton={true} userId={userId} assetId={assetId} downloadList={checkedItems}></Download> */}
            </section>
        </div>
    );
}

export default Preview;