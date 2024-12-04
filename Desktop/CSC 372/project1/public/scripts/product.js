
document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');

    // Fetch and display products
    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();

            productContainer.innerHTML = products
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


