const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');

router.get('/', authMiddleware, require('../controllers/categoryController').categories);

module.exports = router;