import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect } from "react";
import "./CheckboxGroup.css";

function CheckboxGroup ({itemsList = [], cambiarLista=()=>{}, reset=false, todo=true, reverse=false}) {
    const [masterChecked, setMasterChecked] = useState(true);
    const [checkedList, setCheckedList] = useState(itemsList); // Lista de nombres de items (array de strings) elegidos
    const [checkboxList, setCheckboxList] = useState( // Lista de checkboxes (nombre: marcado)
        Object.fromEntries(itemsList.map((item) => [item, true]))
    );

    /*useEffect(() => {
        
        if(reverse){
            console.log('comprobar reverse', checkboxList)
        }
    }, [reverse]);*/
    

    useEffect(() => {
        cambiarLista(checkedList);
    }, [checkedList]);

    useEffect(() => {
        if(reset){
            setCheckboxList(Object.fromEntries(itemsList.map(item => [item, true])));
            setMasterChecked(true);
        }
    }, [reset]);

    useEffect(() => {
        setCheckboxList(Object.fromEntries(itemsList.map(item => [item, true])));
        setCheckedList(itemsList);
        setMasterChecked(true);
    }, [itemsList]);

    /*useEffect(() => {
        const newCheckboxList = Object.fromEntries(
            itemsList.map(item => [item, reverse ? false : true])
        );
        setCheckboxList(newCheckboxList);
        setCheckedList(reverse ? [] : itemsList);
        setMasterChecked(!reverse);
    }, [itemsList, reverse]);*/

    const onMasterChange = (e) => {
        const value = e.target.checked;
        setMasterChecked(value);

        if(value){
            setCheckedList(itemsList);
        }
        else{
            setCheckedList([]);
        }

        const newState = Object.fromEntries(
            itemsList.map((item) => [item, value])
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
            // Añadir nombre a la lista
            const newArray = [...checkedList, name];
            setCheckedList(newArray);

            // Comprobar si la lista es completa
            if(newArray.length==itemsList.length){
                //Marcar todo
                setMasterChecked(true);
            }
        }

        else{
            // Eliminar nombre de la lista
            const newArray = checkedList.filter(item => item !== name);
            setCheckedList(newArray);

            //Desmarcar Todo
            setMasterChecked(false);
        }
    }

    return(
        <div>
            {todo ? (
                <Checkbox chLabel="Todo" chName="all" chChecked={masterChecked} chChange={onMasterChange}></Checkbox>
            ) : (
                null
            )}
            <div className="checkbox-list">
                {itemsList.map((item, index) => (
                    <Checkbox key={index} chLabel={item} chName={item} chChecked={checkboxList[item]} chChange={onItemChange}></Checkbox>
                ))}
            </div>
            
        </div>
    );
    
}

export default CheckboxGroup;