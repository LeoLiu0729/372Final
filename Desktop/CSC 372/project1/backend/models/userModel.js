const db = require('../db');

exports.getUserByEmailAndPassword = (email, password) => {
    try {
      const query = 'SELECT * FROM Users WHERE email = ? AND password = ?';
      const user = db.prepare(query).get(email, password); // Synchronous query
      return user; // If no user is found, it returns undefined
    } catch (err) {
      console.error('Error fetching user:', err);
      throw err;
    }
  };

// Get Cart for a User
exports.getCartByUserId = (userId) => {
    const stmt = db.prepare(`
        SELECT cp.id, p.name, p.description, p.price, cp.quantity 
        FROM CartProducts cp
        JOIN Products p ON cp.product_id = p.id
        WHERE cp.cart_id = (SELECT id FROM Carts WHERE user_id = ? AND status = 'new')`);
    return stmt.all(userId);
};

// Add a Product to a Cart
exports.addProductToCart = (cartId, productId, quantity) => {
    const stmt = db.prepare('INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)');
    stmt.run(cartId, productId, quantity);
};

// Get or Create Cart for User
exports.getOrCreateCart = (userId) => {
    // Check if a "new" cart exists
    let stmt = db.prepare('SELECT id FROM Carts WHERE user_id = ? AND status = "new"');
    let cart = stmt.get(userId);

    // If no cart exists, create one
    if (!cart) {
        stmt = db.prepare('INSERT INTO Carts (user_id, status) VALUES (?, "new")');
        stmt.run(userId);
        cart = db.prepare('SELECT id FROM Carts WHERE user_id = ? AND status = "new"').get(userId);
    }

    return cart;
};

// Remove Product from Cart
exports.removeProductFromCart = (cartProductId, userId) => {
    const stmt = db.prepare(`
        DELETE FROM CartProducts
        WHERE id = ? 
        AND cart_id = (SELECT id FROM Carts WHERE user_id = ? AND status = "new")
    `);
    stmt.run(cartProductId, userId);
};
