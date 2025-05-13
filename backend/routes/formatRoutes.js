const express = require('express');
const {
    getFormats,
    getFormatByID,
    updateFormat,
    createFormat,
    deleteFormat
} = require('../controllers/formatController');

const router = express.Router();

router.route('/').get(getFormats).post(createFormat);
router.route('/:id').get(getFormatByID).delete(deleteFormat).put(updateFormat);

module.exports = router;