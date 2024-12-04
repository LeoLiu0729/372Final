const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// User Login
router.post('/signin', userController.signin);


// Fetch User Cart
router.get('/:id/cart', userController.getUserCart);

// Update Cart
router.post('/:id/cart', userController.addToCart);

// Remove Product from Cart
router.delete('/:id/cart/:productId', userController.removeFromCart);

module.exports = router;
