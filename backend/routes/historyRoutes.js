const express = require('express');
const {
    getHistories,
    getHistoryByID,
    updateHistory,
    createHistory,
    deleteHistory
} = require('../controllers/historyController');

const router = express.Router();

router.route('/').get(getHistories).post(createHistory);
router.route('/:id').get(getHistoryByID).delete(deleteHistory).put(updateHistory);

module.exports = router;