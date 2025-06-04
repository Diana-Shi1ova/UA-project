const Favorite = require('../models/favoriteModel');
const Asset = require('../models/assetModel');

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

// Obtener un favorites por ID de usuario
const getFavoriteByUserID = async (req, res) => {
    try{
        const favorites = await Favorite.find({user: req.params.id});

        /*if(!favorite){
            return res.status(404).json({ message: 'Favorite not found' });
        }*/

        res.status(200).json(favorites);
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Crear un favorite
const createFavorite = async (req, res) => {
    try{
        const asset = await Asset.findById(req.body.asset);

        if(!asset){
            return res.status(404).json({ message: 'Asset not found' });
        }

        // Comprobación de duplicados
        const existing = await Favorite.findOne({ user: req.body.user, asset: req.body.asset });
        if (existing) {
            return res.status(409).json({ message: 'Already liked' });
        }

        // Creación de like
        const favorite = await Favorite.create({
            user: req.body.user,
            asset: req.body.asset
        });

        // Modificamos asset
        asset.likes += 1;
        await asset.save({ timestamps: false });
    
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

// Borrar un favorite por id
const deleteFavoriteByID = async (req, res) => {
    try{
        const favorite = await Favorite.findById(req.params.id);

        if(!favorite){
            return res.status(404).json({ message: 'Like not found' });
        }

        // Modificamos asset
        const asset = await Asset.findById(favorite.asset);
        if (asset) {
            asset.likes = Math.max(asset.likes - 1, 0); // para no obtener valores negativos
            await asset.save({ timestamps: false });
        }
        
        await favorite.deleteOne();
        res.status(200).json({message: req.params.id});
    } catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Borrar un favorite por id de asset
const deleteFavorite = async (req, res) => {
    try {
        const { user, asset } = req.body;

        const favorite = await Favorite.findOne({ user, asset });
        if (!favorite) {
            return res.status(404).json({ message: 'Like not found' });
        }

        // Modificamos asset
        const assetDoc = await Asset.findById(asset);
        if (assetDoc) {
            assetDoc.likes = Math.max(assetDoc.likes - 1, 0); // para no obtener valores negativos
            await assetDoc.save();
            await assetDoc.save({ timestamps: false });
        }

        await favorite.deleteOne();
        res.status(200).json({ message: 'Like removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getFavorites,
    getFavoriteByID,
    updateFavorite,
    createFavorite,
    deleteFavorite,
    deleteFavoriteByID,
    getFavoriteByUserID,
}