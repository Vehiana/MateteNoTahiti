const express = require('express');
const homeController = require('../controllers/home');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/home', protectRoute, homeController.homeView);

module.exports = router;