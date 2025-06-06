const express = require('express');
const {
    getTags,
    getTagByID,
    updateTag,
    createTag,
    deleteTag,
    createTags,
} = require('../controllers/tagController');

const router = express.Router();

router.route('/').get(getTags).post(createTags);
// router.route('/array').post(createTags);
router.route('/:id').get(getTagByID).delete(deleteTag).put(updateTag);

module.exports = router;