/*import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";*/
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import AssetListElement from "../components/AssetListElement/AssetListElement";
import AssetCard from "../components/AssetCard/AssetCard";
import Filters from "../components/Filters/Filters";
import "./Busqueda.css";

function Busqueda(){
    const query = new URLSearchParams(useLocation().search);
    const q = query.get('q') || '';
    const { category } = useParams();
    var listStyle = "assets-grid";

    if(category=="Audio" || category=="Código" || category=="Otros"){
        listStyle = "assets-list";
    }

    const [result, setResult] = useState(null);
    const [authors, setAuthors] = useState([]);


    useEffect(() => {
        const params = {};
        if (q?.trim()) params.q = q.trim();
        if (category) params.categories = category; // Para una categoría, y para varios categories[]!

        if (!params.q && !params.categories) {
            setResult([]);
            return;
        }

        console.log(params);

        axios.get('/api/assets/search/', { params })
            .then(response => {
                setResult(response.data);
                console.log(response.data);
                if(category) {
                    const autores = response.data.authors;
                    setAuthors(autores);
                    // console.log(autores);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [q, category]);

    const buscar = (ordenarPor, nameAsset, authors, tags, formats) => {
        const params = {};
        params.sortBy = ordenarPor;
        params.categories = category;
        if(nameAsset) params.name = nameAsset;
        if (authors?.length) params.authors = authors.join(',');
        if (tags?.length) params.tags = tags.join(',');
        if (formats?.length) params.formats = formats.join(',');

        axios.get('/api/assets/search/', {
            params
        })
            .then(response => {
                setResult(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <div className="content">
            <Header></Header>
            <main>
                {!category ? (
                    <section className="section-busqueda">
                        <h2>"{q}"</h2>
                        
                            {result && result.length ? (
                                <ul>
                                    {result.results.map((item, index) => (
                                        <li key={index}><AssetListElement asset={item}></AssetListElement></li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-encontrado">No se ha encontrado nada...</p>
                            )}
                        
                    </section>
                ) : (
                    <section className="section-busqueda busqueda-category">
                        <h2>{category}</h2>
                        <div className="horizontal">
                            <Filters category={category} authorSuggestions={authors} buscar={buscar}></Filters>
                            
                                {result && result.length ? (
                                    <ul className={"results "+listStyle}>
                                        {result.results.map((item, index) => (
                                            <li key={index}><AssetCard asset={item}></AssetCard></li>
                                        
                                        ))}
                                    </ul>
                                    ) : (
                                        <p className="no-encontrado">No se ha encontrado nada...</p>
                                    )
                                }
                        </div>
                    </section>
                )}
            </main>
            <Footer></Footer>
        </div>
    );
    
}

export default Busqueda;