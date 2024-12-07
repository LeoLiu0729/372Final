const cartModel = require('../models/cartModel');


exports.addToCart = (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        cartModel.addProductToCart({ userId, productId });
        res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to cart' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.query.userId; // Retrieve user ID from the query parameters
        console.log('Received User ID in Backend:', userId);

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required to fetch the cart.' });
        }

        const cartItems = await cartModel.getCartByUserId(userId);
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart.' });
    }
};




exports.getCart = (req, res) => {
  const { userId } = req.query;

  try {
    const cart = cartModel.getCartByUserId(userId);
    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};
exports.updateCartProduct = async (req, res) => {
    const { cartProductId } = req.params;
    const { quantity } = req.body;

    try {
        await cartModel.updateCartProduct(cartProductId, quantity);
        res.status(200).json({ message: 'Quantity updated successfully.' });
    } catch (error) {
        console.error('Error updating cart product:', error);
        res.status(500).json({ error: 'Failed to update quantity.' });
    }
};


exports.removeCartProduct = async (req, res) => {
    const { cartProductId } = req.params;

    try {
        await cartModel.removeCartProduct(cartProductId);
        res.status(200).json({ message: 'Product removed from cart.' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Failed to remove product.' });
    }
};
exports.checkout = async (req, res) => {
    try {
      const { userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required for checkout.' });
      }
  
      console.log(`Checkout for User ID: ${userId}`);
  
      // Clear the cart for the user
      await cartModel.clearCart(userId);
  
      res.json({ message: 'Checkout completed successfully. Cart is now empty.' });
    } catch (error) {
      console.error('Error during checkout:', error);
      res.status(500).json({ error: 'Failed to complete checkout.' });
    }
  };