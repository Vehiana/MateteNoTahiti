const express = require('express');
const productsController = require('./controllers/products');
const { protectRoute } = require('./auth');

const router = express.Router();

router.get('/products', protectRoute, productsController.productsView);

module.exports = router;