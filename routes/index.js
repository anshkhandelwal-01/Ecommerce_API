const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/cart', require('./cart'));
router.use('/product', require('./product'));
router.use('/category', require('./category'));
router.use('/order', require('./order'));

module.exports = router;