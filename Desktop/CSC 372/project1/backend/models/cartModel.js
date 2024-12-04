const db = require('../db');

exports.addProductToCart = ({ userId, productId }) => {
    try {
        // Find the active cart for the user
        let cart = db.prepare(`SELECT id FROM Carts WHERE user_id = ? AND status = 'new'`).get(userId);

        // If no active cart exists, create one
        if (!cart) {
            const insertCart = db.prepare(`INSERT INTO Carts (user_id, status) VALUES (?, 'new')`);
            insertCart.run(userId);
            cart = db.prepare(`SELECT id FROM Carts WHERE user_id = ? AND status = 'new'`).get(userId);
        }

        // Insert or update product in the cart
        const cartProduct = db.prepare(`
            SELECT id, quantity FROM CartProducts WHERE cart_id = ? AND product_id = ?
        `).get(cart.id, productId);

        if (cartProduct) {
            // Update quantity if product already in cart
            const updateCartProduct = db.prepare(`
                UPDATE CartProducts SET quantity = quantity + 1 WHERE id = ?
            `);
            updateCartProduct.run(cartProduct.id);
        } else {
            // Insert new product into cart
            const insertCartProduct = db.prepare(`
                INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)
            `);
            insertCartProduct.run(cart.id, productId, 1);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};
exports.getCartByUserId = (userId) => {
    const sql = `
        SELECT 
            cp.id AS cart_product_id,
            cp.quantity,
            p.id AS product_id,
            p.name AS product_name,
            p.price,
            p.image_url,
            (cp.quantity * p.price) AS total_price
        FROM CartProducts cp
        JOIN Carts c ON cp.cart_id = c.id
        JOIN Products p ON cp.product_id = p.id
        WHERE c.user_id = ? AND c.status = 'new';
    `;

    console.log('Executing SQL with User ID:', userId);

    return db.prepare(sql).all(userId);
};



exports.updateCartProduct = (productId, quantity) => {
    const query = `
        UPDATE CartProducts
        SET quantity = ?
        WHERE id = ?;
    `;
    return db.prepare(query).run(quantity, productId);
};

exports.removeCartProduct = (productId) => {
    const query = `
        DELETE FROM CartProducts
        WHERE id = ?;
    `;
    return db.prepare(query).run(productId);
};
