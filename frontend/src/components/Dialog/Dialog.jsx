import Button from "../Button/Button";
import "./Dialog.css";
import axios from 'axios';



function Dialog(assetId, assetName){
    const handleDialogConfirm = (confirmed) => {
    const dialog = document.getElementById("confirmDialog");
    dialog.close();

    if (confirmed) {
        // Eliminar
        
        document.querySelector('confirmDialog').classList.add('dialog-hidden');
    } else {
        // Cancelar
        document.querySelector('confirmDialog').classList.add('dialog-hidden');
    }
    };

    return(
        <div id="confirmDialog" role="alert">
            <p>¿Está seguro que quiere eliminar {assetName}?</p>
            <Button icon="" buttonName="Cancelar" buttonColor="primary" buttonFunction={() => handleDialogConfirm(false)}></Button>
            <Button icon="" buttonName="Aceptar" buttonColor="danger" buttonFunction={() => handleDialogConfirm(true)}></Button>
        </div>
    );
}

export default Dialog;
