const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/ProductController');
const { protectRoute } = require('../auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Seuls les fichiers images sont autorisés!'), false);
        }
        cb(null, true);
    }
});

router.get('/', protectRoute, productController.index);
router.get('/create', protectRoute, productController.create);
router.post('/create', protectRoute, upload.single('photo'), productController.store);
router.get('/edit/:id', protectRoute, productController.edit);
router.post('/edit', protectRoute, upload.single('photo'), productController.update);
router.post('/delete', protectRoute, productController.destroy);

module.exports = router;