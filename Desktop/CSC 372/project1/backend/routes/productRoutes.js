const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Fetch all products
router.get('/', productController.getAllProducts);

// Existing routes...
router.get('/category/:categoryId', productController.getProductsByCategory);

// Fetch a single product by ID
router.get('/:id', productController.getProductById);


module.exports = router;
