const productModel = require('../models/productModel');

// Fetch all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};
