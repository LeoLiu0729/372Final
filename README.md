# Quest Gaming Store

## Project Overview
This is a full-stack e-commerce application for managing and purchasing gaming products. The project includes:
- Admin functionalities (add, edit, delete, and bulk upload products).
- User functionalities (browse products, add to cart, update cart, and checkout).

## Features
- Admin can manage products (CRUD operations).
- Users can sign up, log in, add products to their cart, and manage the cart.
- Products are dynamically loaded from the database.
- Database: SQLite3.

## Prerequisites
- Node.js (v20+)
- SQLite3
- npm

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/LeoLiu0729/quest-gaming-store.git
   cd quest-gaming-store


Install dependencies:
```bash
npm install

Initialize the database:
Run the SQL script to create and populate tables:

sqlite3 backend/database/termproject.db < backend/database/initialize_database.sql
Start the server:
npm start
Open your browser and go to:
http://localhost:3000
