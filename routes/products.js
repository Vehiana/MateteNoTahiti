const express = require('express');
const ProductController = require('../controllers/ProductController');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/', protectRoute, ProductController.index);
router.get('/create', protectRoute, ProductController.create);
router.post('/create', protectRoute, ProductController.store);
router.get('/edit/:id', protectRoute, ProductController.edit);
router.post('/edit', protectRoute, ProductController.update);
router.post('/delete', protectRoute, ProductController.destroy);

module.exports = router;