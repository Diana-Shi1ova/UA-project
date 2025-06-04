const express = require('express');
const {
    getFavorites,
    getFavoriteByID,
    getFavoriteByUserID,
    deleteFavoriteByID,
    updateFavorite,
    createFavorite,
    deleteFavorite
} = require('../controllers/favoriteController');

const router = express.Router();

router.route('/').get(getFavorites).post(createFavorite).delete(deleteFavorite);
router.route('/user/:id').get(getFavoriteByUserID);
router.route('/:id').get(getFavoriteByID).delete(deleteFavoriteByID).put(updateFavorite);

module.exports = router;