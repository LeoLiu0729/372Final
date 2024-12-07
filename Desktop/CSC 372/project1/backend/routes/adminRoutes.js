const express = require('express');
const multer = require('multer');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images'); // Save to the images folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });


// Bulk upload products from JSON
router.post('/bulk-upload', upload.single('file'), adminController.bulkUpload);

// Routes for product management
router.get('/products', adminController.getAllProducts); // Fetch all products
router.post('/products', upload.single('image'), adminController.addProduct); // Add a product
router.put('/products/:id', upload.single('image'), adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct); // Delete a product

module.exports = router;
