import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Input from "../components/Input/Input";
import Tag from "../components/Tag/Tag";
import ComentarioForm from "../components/ComentarioForm/ComentarioForm";
import FileElement from "../components/FileElement/FileElement";
import Preview from "../components/Preview/Preview";
import Button from "../components/Button/Button";
import "./Asset.css";
import { FaFile } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import FormattedDate from "../components/FormattedDate/FormattedDate";
import FileSize from "../components/FileSize/FileSize";
import Comment from "../components/Comentario/Comment";
import CategoryElement from "../components/CategoryElement/CategoryElement";
import { useSelector } from "react-redux";

function Asset(){
    const {id} = useParams();
    const userId = useSelector((state) => state.auth.user._id);
    const [asset, setAsset] = useState(null);
    // const [authorId, setAuthorId] = useState('');
    const [user, setUser] = useState('');
    const [comments, setComments] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    /*useEffect(() => {
        async function fetchAsset() {
            try {
                const res = await axios.get(`api/assets/${id}`);
                setAsset(res.data);
                console.log(res.data);
                // console.log(res);
            } catch (err) {
                console.error('Error', err);
            }
        }
        fetchAsset();
    }, [id]);*/

    useEffect(() => {
        axios.get(`/api/assets/${id}`)
            .then(response => {
                console.log('Asset:', response.data);
                setAsset(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);

    useEffect(() => {
        if(asset){
            axios.get(`/api/users/${asset.author}`)
                .then(response => {
                    console.log('User:', response.data);
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [asset]);

    useEffect(() => {
        axios.get(`/api/comments/by-asset/${id}`)
            .then(response => {
                console.log('Comments:', response.data);
                setComments(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        axios.post('/api/histories', 
            {
                user: userId,
                asset: id
            }
        )
            .then(response => {
                console.log('Historial:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // Calcular tamaño total
    let totalBytes=0;
    if(asset) {
        totalBytes=asset.downloadUrls.reduce((accumulator, file) => accumulator + file.size, 0);
        // console.log(totalBytes);
    }

    // Obtener lista de categorías sin repeticiones
    useEffect(() => {
        if (asset) {
            const categories = [...new Set(asset.downloadUrls.map(item => item.category))];
            setCategoryList(categories);
        }
    }, [asset]);

    // Añadir comentario
    const addComment = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    }
    

    return(
        <div className="content">
            <Header></Header>
            <main>
                {asset ? (<h2>{asset.name}</h2>) : null}
                <div className="asset-global">
                    {asset ? (<Preview items={asset.downloadUrls} userId={user._id} assetId={id} likes={asset.likes}></Preview>) : null}
                    <section className="section-asset information">
                        <h3>Información</h3>
                        {/* <p>Autor:</p><p>{user.name}</p>
                        <p>Tamaño:</p>{asset ? (<FileSize bytes={totalBytes}></FileSize>) : null}
                        <p>Fecha de publicación:</p>{asset ? (<FormattedDate dateISO={asset.createdAt}></FormattedDate>) : null}
                        <p>Fecha de modificación:</p>{asset ? (<FormattedDate dateISO={asset.updatedAt}></FormattedDate>) : null} */}
                        <div><p className="title">Autor:</p><p>{user.name}</p></div>
                        <div><p className="title">Tamaño:</p>{asset ? (<FileSize bytes={totalBytes}></FileSize>) : null}</div>
                        <div><p className="title">Fecha de publicación:</p>{asset ? (<FormattedDate dateISO={asset.createdAt}></FormattedDate>) : null}</div>
                        <div><p className="title">Fecha de modificación:</p>{asset ? (<FormattedDate dateISO={asset.updatedAt}></FormattedDate>) : null}</div>
                    </section>
                    <section className="section-asset categorias">
                        <h3>Categorías</h3>
                        <ul>
                            {/* {asset ? (
                                asset.downloadUrls.map((item, index) => (
                                    <li key={index}><Link to={`/buscar?category=${item.category}`}><CategoryElement categoryName={item.category}></CategoryElement></Link></li>
                                ))
                            ) : (
                                null
                            )} */}
                            {categoryList.map((item, index) => (
                                <li key={index}><Link to={`/buscar?category=${item}`}><CategoryElement categoryName={item}></CategoryElement></Link></li>
                            ))}
                            
                        </ul>
                    </section>
                    <section className="section-asset etiquetas">
                        <h3>Etiquetas</h3>  
                        <ul>
                            {asset ? (
                                asset.tags.map((item, index) => (
                                    <li key={index}><Tag tagName={item}></Tag></li>
                                ))
                            ) : (
                                null
                            )}
                        </ul>
                    </section>
                    <section className="section-asset description">
                        <h3>Descripción</h3>
                        {asset ? (<p>{asset.description}</p>) : null}
                        
                    </section>
                    <section className="section-asset comments">
                        <h3>Comentarios</h3>
                        {asset ? (<ComentarioForm returnComment={addComment} asset={asset._id}></ComentarioForm>) : null}
                        <ul>
                            {comments ? (
                                comments.map((item, index) => (
                                    <li key={index}><Comment commentData={item}></Comment></li>
                                ))
                            ) : null}
                        </ul>
                        
                        <Comment></Comment>
                    </section>
                    

                    {/* <Input inputTipo="text" inputName="nombre"></Input>
                    <textarea name="" id=""></textarea> */}
                </div>
                <Footer></Footer>
            </main>
        </div>
    );
}

export default Asset;