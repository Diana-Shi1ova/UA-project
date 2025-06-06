import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import "./Like.css";
import { like, unlike, resetLikesState } from '../../features/likes/likesSlice'

function Like({likesNum=0, asset}){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { likedAssetIds} = useSelector((state) => state.likes);

    const liked = likedAssetIds.some(obj => obj.asset === asset);
    const [num, setNum] = useState(likesNum);
    //var num = likesNum;

    const toggleLike = () => {
        console.log('entro')
        if(likedAssetIds.some(obj => obj.asset === asset)){
            // Unlike
            const likeObj = likedAssetIds.find(
                (obj) => obj.user === user._id && obj.asset === asset
            );

            if (likeObj) {
                dispatch(unlike(likeObj._id));
                setNum(prev => Math.max(prev - 1, 0));
            }
            console.log('unlike');
        }
        else{
            // Like
            dispatch(like({userId: user._id, assetId: asset}));
            setNum(prev => prev + 1);
            console.log('like');
        }
    }

    return(
        <div className='like-div'>
            <button 
                className={liked ? 'like liked' : 'like'}
                onClick={toggleLike}
                aria-label={liked ? 'Unlike'+likesNum : 'Like'+likesNum}
            >
                {liked ? <FaHeart /> : <FaRegHeart />}
            </button>
            <p>{num}</p>
        </div>
        
    );
}

export default Like;