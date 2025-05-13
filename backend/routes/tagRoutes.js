const express = require('express');
const {
    getTags,
    getTagByID,
    updateTag,
    createTag,
    deleteTag
} = require('../controllers/tagController');

const router = express.Router();

router.route('/').get(getTags).post(createTag);
router.route('/:id').get(getTagByID).delete(deleteTag).put(updateTag);

module.exports = router;