const express = require('express');
const {
    getAssets,
    getAssetByID,
    updateAsset,
    createAsset,
    deleteAsset
} = require('../controllers/assetController');
const upload = require('../middleware/upload');
const router = express.Router();

//router.route('/').get(getAssets).post(upload.single('file'), createAsset);
router.route('/').get(getAssets).post(createAsset);
router.route('/:id').get(getAssetByID).delete(deleteAsset).put(updateAsset);

module.exports = router;