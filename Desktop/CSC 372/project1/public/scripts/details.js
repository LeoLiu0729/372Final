document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('Product ID not provided.');
        window.location.href = 'products.html';
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        const product = await response.json();

        if (product.error) {
            alert('Product not found.');
            window.location.href = 'products.html';
            return;
        }

        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image_url}" alt="${product.name}" />
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <p><strong>Category:</strong> ${product.category_name}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    } catch (error) {
        console.error('Error fetching product details:', error);
        alert('Failed to load product details.');
    }
});

// Add to cart (already implemented in products.js)
window.addToCart = (productId) => {
    // Reuse your existing addToCart function
};
