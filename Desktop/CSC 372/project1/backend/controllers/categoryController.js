const categoryModel = require('../models/categoryModel');

exports.getAllCategories = (req, res) => {
    try {
        const categories = categoryModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error.message);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
