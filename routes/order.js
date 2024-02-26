const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const orderController = require('../controllers/orderController');

router.post('/place', authMiddleware, orderController.place);
router.get('/history', authMiddleware, orderController.history);
router.get('/:orderId', authMiddleware, orderController.detail);

module.exports = router;