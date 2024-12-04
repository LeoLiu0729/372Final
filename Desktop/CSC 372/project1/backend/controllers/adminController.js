const productModel = require('../models/productModel');

// Get all products
exports.getAllProducts = (req, res) => {
  const products = productModel.getAllProducts();
  res.status(200).json(products);
};

// Add a new product
exports.addProduct = (req, res) => {
    const { name, description, price, category_id } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : null;
  
    if (!name || !price || !category_id || !image_url) {
      return res.status(400).json({ error: 'Name, price, category ID, and image are required.' });
    }
  
    productModel.addProduct({ name, description, image_url, price, category_id });
    res.status(201).json({ message: 'Product added successfully' });
  };
  
  // Update a product
  exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : null;
  
    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Name, price, and category ID are required.' });
    }
  
    productModel.updateProduct(id, { name, description, image_url, price, category_id });
    res.status(200).json({ message: 'Product updated successfully' });
  };

// Delete a product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id);
  res.status(200).json({ message: 'Product deleted successfully' });
};
