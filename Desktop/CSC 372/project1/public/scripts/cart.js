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
                    <button onclick="updateQuantity(${item.cart_product_id}, this.previousElementSibling.value)">Update</button>
                </td>
                <td>$${item.total_price.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.cart_product_id})">Remove</button></td>
            </tr>
        `).join('');

        cartItemsTable.innerHTML = cartRows;

        // Calculate cart summary
        const subtotal = cart.reduce((sum, item) => sum + item.total_price, 0);
        const tax = subtotal * 0.0675; // 6.75% tax
        const total = subtotal + tax;

        cartSummary.innerHTML = `
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            <p><strong>Tax (6.75%):</strong> $${tax.toFixed(2)}</p>
            <p><strong>Total:</strong> $${total.toFixed(2)}</p>
            <button class="checkout" id="checkout-button">Proceed to Checkout</button>
        `;

        // Attach event listener for checkout button
        document.getElementById('checkout-button').addEventListener('click', checkout);
    } catch (error) {
        console.error('Error loading cart:', error);
        alert('Failed to load cart. Please try again.');
    }
});

// Update quantity
async function updateQuantity(cartProductId, quantity) {
    try {
        const response = await fetch(`/api/cart/${cartProductId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
        });

        if (response.ok) {
            alert('Quantity updated successfully!');
            location.reload();
        } else {
            alert('Failed to update quantity.');
        }
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
}

// Remove from cart
async function removeFromCart(cartProductId) {
    try {
        const response = await fetch(`/api/cart/${cartProductId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Product removed from cart.');
            location.reload();
        } else {
            alert('Failed to remove product from cart.');
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
}

// Checkout function
async function checkout() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert('Please sign in to checkout.');
        return;
    }

    try {
        const response = await fetch('/api/cart/checkout', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id }),
        });

        if (response.ok) {
            alert('Checkout completed successfully! Your cart is now empty.');
            window.location.reload(); // Refresh the page to show an empty cart
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to complete checkout.');
        }
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('An error occurred. Please try again.');
    }
}
