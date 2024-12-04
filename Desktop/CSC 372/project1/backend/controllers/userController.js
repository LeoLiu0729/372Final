const userModel = require('../models/userModel');

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmailAndPassword(email, password);

    if (user) {
      return res.json({ success: true, user });
    } else {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
exports.getUserCart = (req, res) => {
    const userId = req.params.id;
    const cart = userModel.getCartByUserId(userId);
    res.json(cart);
};

exports.addToCart = (req, res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    const cart = userModel.getOrCreateCart(userId);
    userModel.addProductToCart(cart.id, productId, quantity);

    res.json({ message: 'Product added to cart successfully' });
};

exports.removeFromCart = (req, res) => {
    const { id: userId, productId } = req.params;

    userModel.removeProductFromCart(productId, userId);
    res.json({ message: 'Product removed from cart successfully' });
};
