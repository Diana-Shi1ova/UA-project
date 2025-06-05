/*import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";*/
import Header from "../components/Header/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AssetListElement from "../components/AssetCard/AssetListElement/AssetListElement";
import "./Busqueda.css";

function Busqueda(){
    const query = new URLSearchParams(useLocation().search);
    const q = query.get('q') || '';
    /*const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // validaciones aquí
        navigate("/login");
    };*/

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!q) {
            setResult([]);
            return;
        }
        console.log(q);

        axios.get(
            '/api/assets/search/',
            { params: { q: q } }
        )
        .then(response => {
            console.log(response.data);
            setResult(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [q]);

    return(
        <div className="content">
            <Header></Header>
            <main>
                <section className="section-busqueda">
                    <h2>"{q}"</h2>
                    <ul>
                        {result ? (
                            result.results.map((item, index) => (
                                <li key={index}><AssetListElement asset={item}></AssetListElement></li>
                            ))
                        ) : (
                            <p className="no-encontrado">No se ha encontrado nada...</p>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Busqueda;