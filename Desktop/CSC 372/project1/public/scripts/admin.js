document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
  
    // Fetch and display products
    const fetchProducts = async () => {
      const response = await fetch('/api/admin/products');
      const products = await response.json();
  
      productList.innerHTML = products
        .map(
          (product) => `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.description}</td>
          <td><img src="${product.image_url}" alt="${product.name}" width="50"></td>
          <td>${product.price}</td>
          <td>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>`
        )
        .join('');
    };
  
    // Add a new product
    addProductForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const newProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        image_url: document.getElementById('image_url').value,
        price: document.getElementById('price').value,
        category_id: document.getElementById('category_id').value,
      };
  
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
  
      alert('Product added successfully');
      fetchProducts();
    });
  
    // Delete a product
    window.deleteProduct = async (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`/api/admin/products/${id}`, {
          method: 'DELETE',
        });
  
        alert('Product deleted successfully');
        fetchProducts();
      }
    };
  
    // Load products on page load
    fetchProducts();
  });
  