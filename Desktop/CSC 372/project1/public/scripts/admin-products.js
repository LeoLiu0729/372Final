document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const addProductForm = document.getElementById('add-product-form');
    const addProductModal = document.getElementById('add-product-modal');
  
    // Show the Add Product Form
    window.showAddProductForm = () => {
      addProductModal.style.display = 'block';
    };
  
    // Hide the Add Product Form
    window.hideAddProductForm = () => {
      addProductModal.style.display = 'none';
    };
  
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
          <td>$${product.price}</td>
          <td>${product.category_id}</td>
          <td>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
          </td>
        </tr>`
        )
        .join('');
    };
  
    // Add a new product
    addProductForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', document.getElementById('name').value);
      formData.append('description', document.getElementById('description').value);
      formData.append('image', document.getElementById('image').files[0]);
      formData.append('price', document.getElementById('price').value);
      formData.append('category_id', document.getElementById('category_id').value);
  
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Product added successfully!');
        fetchProducts(); // Reload product list
        hideAddProductForm();
      } else {
        const error = await response.json();
        alert(error.error || 'Error adding product');
      }
    });
  
    // Delete a product
    window.deleteProduct = async (id) => {
      if (confirm('Are you sure you want to delete this product?')) {
        await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
  
        alert('Product deleted successfully');
        fetchProducts();
      }
    };
  
    // Redirect to edit page
    window.editProduct = (id) => {
      window.location.href = `product-edit.html?id=${id}`;
    };
  
    // Load products on page load
    fetchProducts();
  });
  