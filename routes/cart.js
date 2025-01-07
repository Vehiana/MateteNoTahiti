const express = require('express');
const cartController = require('../controllers/cart');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/cart', protectRoute, cartController.cartView);

module.exports = router;