

# Quest Gaming Store

**Quest Gaming Store** is a web application designed to offer a seamless shopping experience for gaming enthusiasts. Users can browse products, add items to their cart, and checkout. Administrators can manage products, including editing, deleting, and bulk uploading via JSON. Additionally, the application integrates the IGDB API to display popular games on the home page.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Integration](#api-integration)
6. [Screenshots](#screenshots)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

### User
- Browse products by category or search for specific items.
- View product details.
- Add products to the shopping cart.
- Update product quantities or remove items from the cart.
- Checkout to empty the cart.

### Admin
- Add new products.
- Edit existing products, including updating images.
- Delete products from the catalog.
- Bulk upload products from a JSON file.

### Additional Features
- Integrated with IGDB API to display trending games.
- Mobile-responsive design.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Third-Party API:** IGDB API
- **Package Manager:** npm
- **Tools:** Multer, Axios, Nodemon

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/LeoLiu0729/372Final.git
   cd 372Final
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   CLIENT_ID=your_igdb_client_id
   ACCESS_TOKEN=your_igdb_access_token
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

6. User
   Leo@gmail.com, Password: 123
   123@gmail.com, Password: 123

7. Admin
   http://locahlost:admin
   
---

## Usage

### User
1. Sign in or create an account.
2. Browse products, filter by category, or search for items.
3. Add products to the cart, update quantities, or remove items.
4. Proceed to checkout to empty the cart.

### Admin
1. Navigate to the admin panel.
2. Manage products by editing, deleting, or bulk uploading via JSON.
3. Ensure all product details, including images, are updated correctly.

---

## API Integration

- **IGDB API:** Displays popular games with information like name, rating, and cover images.


## License

This project is licensed under the MIT License.
