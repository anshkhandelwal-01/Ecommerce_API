const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const productController = require('../controllers/productController');

router.post('/create', productController.create);
router.get('/:categoryId', authMiddleware, productController.products);
router.get('/:productId', authMiddleware, productController.detail);

module.exports = router;