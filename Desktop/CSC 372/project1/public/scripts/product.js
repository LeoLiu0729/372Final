document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list');
    const productContainer = document.getElementById('product-container');

    // Function to fetch and display products
    const fetchProducts = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const categoryId = urlParams.get('category');
            let endpoint = '/api/products';

            // Filter products by category if categoryId exists
            if (categoryId) {
                endpoint = `/api/products/category/${categoryId}`;
            }

            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();

            productContainer.innerHTML = products
                .map(
                    (product) => `
                    <article class="product">
                        <a href="details.html?id=${product.id}" class="product-link">
                            <img src="${product.image_url}" alt="${product.name}" />
                            <h3>${product.name}</h3>
                            <p><strong>Price:</strong> $${product.price}</p>
                        </a>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </article>`
                )
                .join('');
        } catch (error) {
            console.error('Error fetching products:', error.message);
            productContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    };

    // Add to cart functionality
    window.addToCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please sign in to add products to your cart.');
            return;
        }

        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, productId }),
            });

            if (response.ok) {
                alert('Product added to cart!');
            } else {
                const error = await response.json();
                alert(error.error || 'Error adding product to cart.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    fetchProducts(); // Load products on page load
});
document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const productList = document.getElementById('product-list');

    // Fetch and display categories
    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const categories = await response.json();

            categoryList.innerHTML = categories
                .map(
                    (category) =>
                        `<li><a href="#" onclick="viewCategory(${category.id})">${category.name}</a></li>`
                )
                .join('');
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch and display products by category
    const fetchProductsByCategory = async (categoryId) => {
        try {
            const response = await fetch(`/api/products/category/${categoryId}`);
            const products = await response.json();

            productList.innerHTML = products
                .map(
                    (product) => `
                    <div class="product-card">
                        <img src="${product.image_url}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>`
                )
                .join('');
        } catch (error) {
            console.error('Error fetching products by category:', error);
            productList.innerHTML = '<p>Failed to load products for this category.</p>';
        }
    };

    // Function to handle category clicks
    window.viewCategory = (categoryId) => {
        fetchProductsByCategory(categoryId);
    };

    // Load categories on page load
    fetchCategories();
});
