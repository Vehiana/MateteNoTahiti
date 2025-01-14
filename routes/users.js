const express = require('express');
const UserController = require('../controllers/UserController');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/', protectRoute, UserController.index);
router.get('/create', protectRoute, UserController.create);
router.post('/create', protectRoute, UserController.store);
router.get('/edit/:id', protectRoute, UserController.edit);
router.post('/edit', protectRoute, UserController.update);
router.post('/delete', protectRoute, UserController.destroy);

module.exports = router;