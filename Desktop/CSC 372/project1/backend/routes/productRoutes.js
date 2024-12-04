const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Fetch all products
router.get('/', productController.getAllProducts);

module.exports = router;
