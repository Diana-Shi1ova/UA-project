const express = require('express');
const {
    getFormats,
    getFormatsByCategory,
    getFormatByID,
    updateFormat,
    createFormat,
    deleteFormat
} = require('../controllers/formatController');

const router = express.Router();

router.route('/').get(getFormats).post(createFormat);
router.route('/by-category').get(getFormatsByCategory);
router.route('/:id').get(getFormatByID).delete(deleteFormat).put(updateFormat);

module.exports = router;