import "./Comment.css";
import { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate/FormattedDate";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import axios from "axios";

function Comment ({commentData, deleteCom=()=>{}}) {
    const [user, setUser] = useState('');
    const userId = useSelector((state) => state.auth.user._id);

    if(commentData){
        useEffect(() => {
            axios.get(`/api/users/${commentData.author}`)
                .then(response => {
                    console.log('User:', response.data);
                    setUser(response.data.name);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, [commentData]);

        const deleteComment = (e) => {
            e.preventDefault();

            axios.delete(`/api/comments/${commentData._id}`)
                .then(response => {
                    console.log('Deleted:', response.data);
                    deleteCom(commentData._id);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        return (
            <div className="comment">
                {/* <p>Diana Shilova</p>
                <p>12/09/2024 12:34</p>
                <p>Me ha gustado mucho el estilo!</p> */}
                <p className="user">{user}</p>
                <FormattedDate dateISO={commentData.createdAt}></FormattedDate>
                <p className="content">{commentData.content}</p>
                {userId ? (
                    <Button ariaLabel="Eliminar comentario" icon="FaRegTrashAlt" buttonColor="danger" buttonFunction={deleteComment}></Button>
                ) : null}
            </div>
        );
    }
    
}

export default Comment;