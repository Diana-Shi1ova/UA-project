const express = require('express');
const {
    getAssets,
    getAssetByID,
    updateAsset,
    createAsset,
    deleteAsset,
    uploadFiles,
    deleteFiles,
    downloadAsset,
    searchAssets,
    getAssetsByIds,
} = require('../controllers/assetController');
const router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

//router.route('/').get(getAssets).post(upload.single('file'), createAsset);
router.route('/').get(getAssets).post(upload.array('files[]'),createAsset);
router.route('/search').get(searchAssets);
router.route('/by-ids').post(getAssetsByIds);
router.route('/:id').get(getAssetByID).delete(deleteAsset).put(upload.array('files[]'), updateAsset);
router.route('/:id/files').post(upload.array('files[]'), uploadFiles).delete(deleteFiles);
router.route('/:id/files-delete').post(deleteFiles);
router.route('/download/:user/:asset/').post(downloadAsset);

module.exports = router;