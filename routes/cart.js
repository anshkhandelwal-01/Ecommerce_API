const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authmiddleware');

router.get('/', authMiddleware, cartController.cart);
router.post('/add', authMiddleware, cartController.add);
router.put('/update', authMiddleware, cartController.update);
router.delete('/delete', authMiddleware, cartController.delete);

module.exports = router;