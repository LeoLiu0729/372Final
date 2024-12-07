const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', cartController.addToCart); // Add to cart
router.get('/', cartController.getCart); // Get cart
// Route for checkout
router.put('/checkout', cartController.checkout);
router.put('/:cartProductId', cartController.updateCartProduct); // Update product quantity
router.delete('/:cartProductId', cartController.removeCartProduct); // Remove product from cart

module.exports = router;
