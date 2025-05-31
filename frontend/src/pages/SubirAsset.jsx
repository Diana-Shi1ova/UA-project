import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/Input/Input";
import Checkbox from "../components/Checkbox/Checkbox";
import Button from "../components/Button/Button";
import FileUpload from "../components/FileUpload/FileUpload";
import SuggestionsInput from "../components/SuggestionsInput/SuggestionsInput";

function SubirAsset () {
    return(
        <div className="content">
            <Header></Header>
            <main>
                <h2>Subir asset</h2>
                <p>Los campos marcados con * son obligatorios.</p>
                <form action="">
                    <Input inputName="name" labelText="Nombre *" inputTipo="text"></Input>
                    <Input inputName="description" labelText="Descripción *" inputTipo="textarea"></Input>
                    {/* <Input inputName="tags" labelText="Etiquetas" inputTipo="text"></Input> */}
                    <SuggestionsInput></SuggestionsInput>
                    <FileUpload></FileUpload>
                    <Button buttonName="Subir asset"></Button>
                </form>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default SubirAsset;