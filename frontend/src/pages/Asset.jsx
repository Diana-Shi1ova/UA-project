import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import Tag from "../components/Tag/Tag";
import ComentarioForm from "../components/ComentarioForm/ComentarioForm";
import FileElement from "../components/FileElement/FileElement";

function Asset(){
    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-asset">
                    <h2>Asset</h2>
                    <h3>Información</h3>
                        <p>Autor: Jane Doe</p>
                        <p>Categoría: Paquete</p>
                        <p>Tamaño: 450 MB</p>
                        <p>Fecha de publicación: 12/04/2024</p>
                        <p>Fecha de modificación: 12/04/2024</p>
                    <h3>Subcategorías</h3>
                    <ul>
                        <li><Link to="/buscar?subcategory=Sub1">Sub1</Link></li>
                        <li><Link to="/buscar?subcategory=Sub2">Sub2</Link></li>
                        <li><Link to="/buscar?subcategory=Sub3">Sub3</Link></li>
                    </ul>
                    <h3>Etiquetas</h3>    
                    <ul>
                        <li><Tag></Tag></li>
                        <li><Tag></Tag></li>
                        <li><Tag></Tag></li>
                        <li><Tag></Tag></li>
                        <li><Tag></Tag></li>
                    </ul>
                    <h3>Descripción</h3>
                        <p>Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. Esta es la descripción. </p>
                    <h3>Ficheros</h3>
                    <ul>
                        <li><FileElement fileName="character.3ds"></FileElement></li>
                        <li><FileElement fileName="script.cpps"></FileElement></li>
                        <li><FileElement fileName="sounds.mp3"></FileElement></li>
                    </ul>
                    <section className="comentarios">
                        <h3>Comentarios</h3>
                        <ComentarioForm></ComentarioForm>
                    </section>
                    

                    {/* <Input inputTipo="text" inputId="nombre"></Input>
                    <textarea name="" id=""></textarea> */}
                </section>
            </main>
        </div>
    );
}

export default Asset;