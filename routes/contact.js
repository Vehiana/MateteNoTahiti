const express = require('express');
const contactController = require('../controllers/contact');
const { protectRoute } = require('../auth');

const router = express.Router();

router.get('/contact', protectRoute, contactController.contactView);

module.exports = router;