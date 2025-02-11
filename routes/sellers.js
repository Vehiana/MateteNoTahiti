const express = require('express');
const router = express.Router();
const sellersController = require('../controllers/sellers');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Routes publiques
router.get('/', sellersController.getAllSellers);
router.get('/:id', sellersController.getSellerById);

// Routes protégées (admin uniquement)
router.get('/manage', isAdmin, sellersController.manageSellers);
router.post('/approve/:id', isAdmin, sellersController.approveSeller);
router.post('/reject/:id', isAdmin, sellersController.rejectSeller);
router.delete('/:id', isAdmin, sellersController.deleteSeller);

module.exports = router;