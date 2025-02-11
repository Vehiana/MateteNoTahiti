const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

// Page d'accueil accessible à tous
router.get('/', homeController.getHomePage);

module.exports = router;