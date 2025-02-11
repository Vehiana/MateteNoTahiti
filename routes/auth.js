const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Routes de connexion
router.get('/', (req, res) => res.redirect('/auth/login'));
router.get('/login', authController.loginView);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

// Routes d'inscription
router.get('/register', authController.registerView);
router.post('/register', authController.registerUser);

module.exports = router;