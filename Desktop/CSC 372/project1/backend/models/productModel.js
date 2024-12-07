const db = require('../db');

exports.getAllProducts = () => {
    try {
        const stmt = db.prepare('SELECT * FROM Products');
        const products = stmt.all();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
exports.addProduct = ({ name, description, image_url, price, category_id }) => {
    const stmt = db.prepare(
      'INSERT INTO Products (name, description, image_url, price, category_id) VALUES (?, ?, ?, ?, ?)'
    );
    stmt.run(name, description, image_url, price, category_id);
  };
  
  exports.updateProduct = (id, { name, description, image_url, price, category_id }) => {
    const stmt = db.prepare(
      'UPDATE Products SET name = ?, description = ?, image_url = ?, price = ?, category_id = ? WHERE id = ?'
    );
    stmt.run(name, description, image_url, price, category_id, id);
  };
  
  exports.deleteProduct = (productId) => {
    // Delete dependent records in CartProducts
    const deleteCartProductsQuery = `
        DELETE FROM CartProducts WHERE product_id = ?;
    `;
    db.prepare(deleteCartProductsQuery).run(productId);

    // Delete the product itself
    const deleteProductQuery = `
        DELETE FROM Products WHERE id = ?;
    `;
    return db.prepare(deleteProductQuery).run(productId);
};
exports.getProductById = (productId) => {
  const query = 'SELECT * FROM Products WHERE id = ?';
  const stmt = db.prepare(query);

  const product = stmt.get(productId); // Fetch the product
  console.log(`Fetched product for ID ${productId}:`, product); // Debug log
  return product;
};
exports.getProductsByCategory = (categoryId) => {
  const query = `
      SELECT 
          p.id, p.name, p.description, p.image_url, p.price, p.category_id, c.name AS category_name
      FROM Products p
      JOIN Categories c ON p.category_id = c.id
      WHERE p.category_id = ?;
  `;

  const stmt = db.prepare(query);
  const products = stmt.all(categoryId);
  console.log(`Fetched products for category ID ${categoryId}:`, products); // Debug log
  return products;
};
