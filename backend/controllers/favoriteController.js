const Favorite = require('../models/favoriteModel');

// Obtener todos los favorites
const getFavorites = async (req, res) => {
    try{
        const favorites = await Favorite.find();
        res.status(200).json(favorites);
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Obtener un favorite por ID
const getFavoriteByID = async (req, res) => {
    try{
        const favorite = await Favorite.findById(req.params.id);

        /*if(!favorite){
            return res.status(404).json({ message: 'Favorite not found' });
        }*/

        res.status(200).json(favorite);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un favorite
const createFavorite = async (req, res) => {
    try{   
        /*if(!req.body){
            return res.status(400).json({ message: 'Missing body' });
        }*/

        const favorite = await Favorite.create({
            author: req.body.author,
            asset: req.body.asset
        });
    
        res.status(200).json(favorite);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Modificar un favorite
const updateFavorite = async (req, res) => {
    try{
        const favorite = await Favorite.findById(req.params.id);

        /*if(!favorite){
            return res.status(404).json({ message: 'Favorite not found' });
        }*/

        const update = await Favorite.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(update);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un favorite
const deleteFavorite = async (req, res) => {
    try{
        const favorite = await Favorite.findById(req.params.id);

        /*if(!favorite){
            return res.status(404).json({ message: 'Favorite not found' });
        }*/
        
        await favorite.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = {
    getFavorites,
    getFavoriteByID,
    updateFavorite,
    createFavorite,
    deleteFavorite,
}