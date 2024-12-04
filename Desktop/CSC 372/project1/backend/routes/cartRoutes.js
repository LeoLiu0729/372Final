const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// Add a product to the cart
router.post('/', cartController.addToCart);

// Fetch the cart for a user
router.get('/', cartController.getCart);

// Update the quantity of a product in the cart
router.put('/:cartProductId', cartController.updateCartProduct);

// Remove a product from the cart
router.delete('/:cartProductId', cartController.removeCartProduct);

module.exports = router;
