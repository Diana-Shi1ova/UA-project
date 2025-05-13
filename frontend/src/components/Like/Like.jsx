import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import "./Like.css";

function Like(){
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
    };

    return(
        <div className='like-div'>
            <button 
                className={liked ? 'like liked' : 'like'}
                onClick={toggleLike}
                /*style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '2rem',
                    color: liked ? 'red' : 'gray',
                    transition: 'color 0.3s ease',
                }}*/
                aria-label={liked ? 'Unlike' : 'Like'}
                >
                {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <p>123</p>
        </div>
        
    );
}

export default Like;