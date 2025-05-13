const express = require('express');
const {
    getCategories,
    getCategoryByID,
    updateCategory,
    createCategory,
    deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategoryByID).delete(deleteCategory).put(updateCategory);

module.exports = router;