const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.loginView);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

module.exports = router;