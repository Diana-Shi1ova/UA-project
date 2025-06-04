import "./Preview.css";
import Like from "../Like/Like";
import Button from "../Button/Button";
import FileElement from "../FileElement/FileElement";
import Download from "../Download/Download";
import Checkbox from "../Checkbox/Checkbox";
import { useEffect, useState } from "react";
import Ellipsis from "../Ellipsis/Ellipsis";

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
    // const [checked, setChecked] = useState([items]);

    // Todos checkboxes true al principio
    const [checkedItems, setCheckedItems] = useState(
        Object.fromEntries(items.map((item) => [item.filename, true]))
    );

    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean);

    // Checkbox principal (marcar/desmarcar todo)
    const onMasterChange = (e) => {
        const newChecked = e.target.checked;
        const newState = Object.fromEntries(
            items.map((item) => [item.filename, newChecked])
        );
        setCheckedItems(newState);
    };

    // Checkbox hijo
    const onItemChange = (e) => {
        const { name, checked } = e.target;
        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    return (
        <div className="section-asset section-preview">
            <div className="preview">
                <Ellipsis text={items[0].filename} numChar={50}></Ellipsis>
                <div className="carousel">
                    <Button buttonClass="but-carousel but-c-1" icon="FaCaretLeft" ariaLabel="Mostrar anterior" buttonColor="secondary"></Button>
                    <img src={items[0].url} alt={"Previsualización " + items[0].filename} />
                    <Button buttonClass="but-carousel but-c-2" icon="FaCaretRight" ariaLabel="Mostrar siguiente" buttonColor="secondary"></Button>
                </div>
                <Like likesNum={likes} asset={assetId}></Like>
            </div>
            <section className="files">
                <h3>Ficheros</h3>
                <Checkbox chLabel="Todo" chName="all" chChecked={true} chChange={onMasterChange}></Checkbox>
                <ul>
                    {/* <li><FileElement fileName="character.3ds" fileOnCheck={onItemChange}></FileElement></li>
                    <li><FileElement fileName="script.cpp" fileOnCheck={onItemChange}></FileElement></li>
                    <li><FileElement fileName="sounds.mp3" fileOnCheck={onItemChange}></FileElement></li> */}
                    {items ? (
                        items.map((item, index) => (
                            <li key={index}><FileElement fileName={item.filename} fileOnCheck={onItemChange} fileChecked={true}></FileElement></li>
                        ))
                    ) : null}
                </ul>
                <Download downloadButton={true} userId={userId} assetId={assetId} downloadList={checkedItems}></Download>
            </section>
        </div>
    );
}

export default Preview;