const productModel = require('../models/productModel');
const fs = require('fs');
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
  
  exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : req.body.image_url;
  
    if (!name || !price || !category_id) {
      return res.status(400).json({ error: 'Name, price, and category ID are required.' });
    }
  
    try {
      productModel.updateProduct(id, { name, description, image_url, price, category_id });
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product.' });
    }
  };
  

// Delete a product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id);
  res.status(200).json({ message: 'Product deleted successfully' });
};
exports.bulkUpload = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read and parse the JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Validate and insert products
    for (const product of jsonData) {
      if (product.name && product.description && product.price && product.category_id) {
        await productModel.addProduct(product);
      } else {
        return res.status(400).json({ error: 'Invalid product data in JSON file.' });
      }
    }

    res.json({ message: 'Bulk upload successful!' });
  } catch (error) {
    console.error('Error in bulk upload:', error);
    res.status(500).json({ error: 'Bulk upload failed.' });
  }
};