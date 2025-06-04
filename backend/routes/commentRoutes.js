const express = require('express');
const {
    getComments,
    getCommentByID,
    updateComment,
    createComment,
    deleteComment,
    getCommentByAsset,
} = require('../controllers/commentController');

const router = express.Router();

router.route('/').get(getComments).post(createComment);
router.route('/:id').get(getCommentByID).delete(deleteComment).put(updateComment);
router.route('/by-asset/:assetId').get(getCommentByAsset);

module.exports = router;