const express = require('express');
const sellersController = require('../controllers/sellers');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/sellers', protectRoute, sellersController.sellersView);

module.exports = router;