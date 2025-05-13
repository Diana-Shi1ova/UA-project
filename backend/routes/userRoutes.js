const express = require('express');
const {
    getUsers,
    getUserByID,
    updateUser,
    createUser,
    deleteUser,
    loginUser,
    getMe
} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserByID).delete(deleteUser).put(updateUser);

module.exports = router;