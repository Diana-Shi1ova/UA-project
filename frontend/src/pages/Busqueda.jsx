/*import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";*/
import Header from "../components/Header/Header";

function Busqueda(){
    /*const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones aquí
        navigate("/login");
    };*/

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-busqueda">
                    <h2>Busqueda</h2>
                    
                </section>
            </main>
        </div>
    );
}

export default Busqueda;