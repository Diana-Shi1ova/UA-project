const express = require('express');
const {
    getComments,
    getCommentByID,
    updateComment,
    createComment,
    deleteComment
} = require('../controllers/commentController');

const router = express.Router();

router.route('/').get(getComments).post(createComment);
router.route('/:id').get(getCommentByID).delete(deleteComment).put(updateComment);

module.exports = router;