import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL}/api/favorites/`

// Obtener favoritos
const getLikedAssets = async (userId) => {
    const response = await axios.get(`${API_URL}user/${userId}`)
    if (response.data) {
        // const assetIds = response.data.map((like) => like.asset)
        localStorage.setItem('likes', JSON.stringify(response.data))
        return response.data
    }
    return []
}

// Darle like al asset
const likeAsset = async (userId, assetId) => {
    const response = await axios.post(API_URL, {user: userId, asset: assetId})
    const currentLikes = JSON.parse(localStorage.getItem('likes')) || [];
    localStorage.setItem('likes', JSON.stringify([...currentLikes, response.data]));
    return response.data
}

// Eliminar like
const unlikeAsset = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`)
    const currentLikes = JSON.parse(localStorage.getItem('likes')) || [];
    const updatedLikes = currentLikes.filter((like) => like._id !== id);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));
    return response.data
}

const likesService = {
    getLikedAssets,
    likeAsset,
    unlikeAsset,
}

export default likesService
