const db = require('../db');

// Get all products
exports.getAllProducts = () => {
  const stmt = db.prepare('SELECT * FROM Products');
  return stmt.all();
};

// Add a new product
exports.addProduct = ({ name, description, image_url, price, category_id }) => {
    const stmt = db.prepare(
      'INSERT INTO Products (name, description, image_url, price, category_id) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(name, description, image_url, price, category_id);
  };

// Update a product
exports.updateProduct = (id, { name, description, image_url, price, category_id }) => {
  const stmt = db.prepare(
    'UPDATE Products SET name = ?, description = ?, image_url = ?, price = ?, category_id = ? WHERE id = ?'
  );
  stmt.run(name, description, image_url, price, category_id, id);
};

// Delete a product
exports.deleteProduct = (id) => {
  const stmt = db.prepare('DELETE FROM Products WHERE id = ?');
  stmt.run(id);
};
