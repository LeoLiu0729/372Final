
document.addEventListener('DOMContentLoaded', async () => {
const user = JSON.parse(localStorage.getItem('user'));
const cartItemsTable = document.querySelector('.cart-items tbody');
const cartSummary = document.querySelector('.cart-summary');

if (!user) {
alert('Please sign in to view your cart.');
window.location.href = 'signin.html';
return;
}

try {
// Fetch cart details with userId
const response = await fetch(`/api/cart?userId=${user.id}`, {
    method: 'GET',
});

if (!response.ok) {
    throw new Error('Failed to fetch cart details.');
}

const cart = await response.json();

// Render cart items
const cartRows = cart.map((item) => `
    <tr>
        <td>
            <img src="${item.image_url}" alt="${item.product_name}" class="cart-image">
            ${item.product_name}
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
            <input type="number" value="${item.quantity}" min="1" data-product-id="${item.product_id}">
            <button onclick="updateQuantity(${item.product_id}, this)">Update</button>
        </td>
        <td>$${item.total_price.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${item.product_id})">Remove</button></td>
    </tr>
`).join('');

cartItemsTable.innerHTML = cartRows;

// Render cart summary
const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
const tax = subtotal * 0.0675; // 6.75% tax
const total = subtotal + tax;

cartSummary.innerHTML = `
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Tax (6.75%):</strong> $${tax.toFixed(2)}</p>
    <p><strong>Total:</strong> $${total.toFixed(2)}</p>
    <button class="checkout">Proceed to Checkout</button>
`;
} catch (error) {
console.error('Error loading cart:', error);
alert('Failed to load cart. Please try again.');
}
});

// Update quantity of product in cart
async function updateQuantity(productId, button) {
const input = button.previousElementSibling;
const newQuantity = input.value;

try {
    const response = await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
        alert('Quantity updated successfully.');
        location.reload();
    } else {
        const error = await response.json();
        alert(error.error || 'Failed to update quantity.');
    }
} catch (error) {
    console.error('Error updating quantity:', error);
}
}


// Remove product from cart
async function removeFromCart(cartProductId) {
if (!confirm('Are you sure you want to remove this item from your cart?')) {
    return;
}

try {
    const response = await fetch(`/api/cart/${cartProductId}`, { method: 'DELETE' });

    if (response.ok) {
        alert('Product removed from cart.');
        location.reload();
    } else {
        const error = await response.json();
        alert(error.error || 'Failed to remove product from cart.');
    }
} catch (error) {
    console.error('Error removing product from cart:', error);
}
}
