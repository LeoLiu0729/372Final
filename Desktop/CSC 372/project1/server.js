const express = require('express');
const path = require('path');
const productRoutes = require('./backend/routes/productRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');
const cartRoutes = require('./backend/routes/cartRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const apiRoutes = require('./backend/routes/apiRoutes'); // Update with your file path
require('dotenv').config();

const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API routes
app.use('/api', apiRoutes);
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes); 


// Cart routes
app.use('/api/cart', cartRoutes);
// Catch-all for unknown API routes
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    next();
});

// Serve frontend for unknown routes (fallback to index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
