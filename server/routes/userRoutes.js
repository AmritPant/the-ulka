const express = require('express');
const userController = require('../controllers/userController');
const authControllers = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);

router.route('/').get(userController.getAllUsers);

module.exports = router;
