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
exports.getProductsByCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    console.log(`Fetching products for category ID: ${categoryId}`); // Debug log

    try {
        const products = productModel.getProductsByCategory(categoryId);

        if (!products || products.length === 0) {
            console.log(`No products found for category ID: ${categoryId}`); // Debug log
            return res.status(404).json({ error: 'No products found for this category' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products by category:', error.message);
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;
    console.log(`Fetching product with ID: ${productId}`);

    try {
        const product = productModel.getProductById(productId);

        if (!product) {
            console.log(`No product found for ID: ${productId}`); 
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};
