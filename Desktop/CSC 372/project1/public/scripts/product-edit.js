document.addEventListener('DOMContentLoaded', async () => {
  // Extract product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    alert('No product ID provided. Redirecting to Product Listing...');
    window.location.href = 'admin-products.html';
    return;
  }

  try {
    // Fetch product details
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }

    const product = await response.json();

    // Populate form fields with product details
    document.getElementById('name').value = product.name || '';
    document.getElementById('description').value = product.description || '';
    document.getElementById('image_url').value = product.image_url || '';
    document.getElementById('price').value = product.price || '';
    document.getElementById('category_id').value = product.category_id || '';
  } catch (error) {
    console.error('Error fetching product details:', error);
    alert('Failed to load product details. Redirecting to Product Listing...');
    window.location.href = 'admin-products.html';
  }

  document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('image', document.getElementById('image').files[0]); // Add file
  formData.append('price', document.getElementById('price').value);
  formData.append('category_id', document.getElementById('category_id').value);

  try {
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      body: formData, // Use FormData
    });

    if (response.ok) {
      alert('Product updated successfully!');
      window.location.href = 'admin-products.html';
    } else {
      const error = await response.json();
      alert(error.error || 'Failed to update product.');
    }
  } catch (error) {
    console.error('Error updating product:', error);
    alert('An error occurred while updating the product.');
  }
});

});
