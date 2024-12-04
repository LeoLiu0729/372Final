document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileUpload = document.getElementById('file-upload');
  
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const file = fileUpload.files[0];
      if (!file) {
        alert('Please select a file to upload.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/api/admin/products/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Error uploading file.');
      }
    });
  });
  