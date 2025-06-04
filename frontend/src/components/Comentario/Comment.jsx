import "./Comment.css";
import { useEffect, useState } from "react";
import FormattedDate from "../FormattedDate/FormattedDate";
import axios from "axios";

function Comment ({commentData}) {
    const [user, setUser] = useState('');

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

        return (
            <div className="comment">
                {/* <p>Diana Shilova</p>
                <p>12/09/2024 12:34</p>
                <p>Me ha gustado mucho el estilo!</p> */}
                <p className="user">{user}</p>
                <FormattedDate dateISO={commentData.createdAt}></FormattedDate>
                <p className="content">{commentData.content}</p>
            </div>
        );
    }
    
}

export default Comment;