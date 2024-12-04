document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const form = document.getElementById('edit-product-form');
  
    // Fetch product details if editing
    if (productId) {
      fetch(`/api/admin/products/${productId}`)
        .then((response) => response.json())
        .then((product) => {
          document.getElementById('name').value = product.name;
          document.getElementById('description').value = product.description;
          document.getElementById('image_url').value = product.image_url;
          document.getElementById('price').value = product.price;
          document.getElementById('category_id').value = product.category_id;
        });
    }
  
    // Save product
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const productData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        image_url: document.getElementById('image_url').value,
        price: document.getElementById('price').value,
        category_id: document.getElementById('category_id').value,
      };
  
      const method = productId ? 'PUT' : 'POST';
      const url = productId
        ? `/api/admin/products/${productId}`
        : '/api/admin/products';
  
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
  
      alert('Product saved successfully!');
      window.location.href = 'admin-products.html';
    });
  });
  