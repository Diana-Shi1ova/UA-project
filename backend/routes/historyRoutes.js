const express = require('express');
const {
    getHistories,
    getHistoryByID,
    updateHistory,
    createHistory,
    deleteHistory,
    getUserAssetsGroupedByDay,
} = require('../controllers/historyController');

const router = express.Router();

router.route('/').get(getHistories).post(createHistory);
router.route('/assets').get(getUserAssetsGroupedByDay);
router.route('/:id').get(getHistoryByID).delete(deleteHistory).put(updateHistory);

module.exports = router;