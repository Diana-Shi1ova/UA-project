const express = require('express');
const {
    getFavorites,
    getFavoriteByID,
    updateFavorite,
    createFavorite,
    deleteFavorite
} = require('../controllers/favoriteController');

const router = express.Router();

router.route('/').get(getFavorites).post(createFavorite);
router.route('/:id').get(getFavoriteByID).delete(deleteFavorite).put(updateFavorite);

module.exports = router;