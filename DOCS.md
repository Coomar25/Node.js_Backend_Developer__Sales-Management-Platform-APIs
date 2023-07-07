# Project Documentation

## Overview

This project is a backend application built with Node.js and Prisma. It provides APIs for managing orders, products, users, and generating sales reports.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org)

## Getting Started

1. Clone the repository: `git clone https://github.com/donib-irakihda/backend-assignment`
2. Install dependencies: `npm install`
3. Set up the database:
   - Create a PostgreSQL database.
   - Set the database connection URL in the `.env` file, using the `DATABASE_URL` variable.
4. Set up the environment variables:
   `DATABASE_URL= <postgresql-url>`
   `SECRET_JWT = <your-secret-jwt>`
5. Run database migrations: `npx prisma migrate dev`
6. Run the seed: `npm run seed`
7. Start the server: `npm run dev`
8. The server will be running on `http://localhost:3000`.
9. Run `node swagger.js` to get the `swagger-output.json` file. Import this file in Postman to get all the APIS setup.

## API Endpoints

- Users:

  - `POST /api/users/register`: Register a new user.
  - `POST /api/users/login`: Authenticate a user.
  - `PUT /api/users/update/:id`: Update user details by ID.
  - `DELETE /api/users/delete/:id`: Delete a user by ID.
  - `GET /api/users/get-user/:id`: Get user details by ID.

- Products:

  - `POST /api/products/add-product`: Add a new product.
  - `PUT /api/products/update-product/:id`: Update product details by ID.
  - `DELETE /api/products/delete-product/:id`: Delete a product by ID.
  - `GET /api/products/get-product/:id`: Get product details by ID.
  - `GET /api/products/get-all-products`: Get all products.

- Orders:

  - `POST /api/orders/add-order`: Add a new order.
  - `PUT /api/orders/update-order/:id`: Update order details by ID.
  - `DELETE /api/orders/delete-order/:id`: Delete an order by ID.
  - `GET /api/orders/get-all-orders`: Get all orders.
  - `GET /api/orders/get-order-by-id/:id`: Get order details by ID.
  - `GET /api/orders/get-all-orders-by-user/:userId`: Get all orders by user.
  - `GET /api/orders/get-all-orders-by-product/:productId`: Get all orders by product.

- Reports:
  - `GET /api/reports/get-total-sales`: Get total sales.
  - `GET /api/reports/get-total-sales-by-day`: Get total sales by day.
  - `GET /api/reports/get-total-sales-by-week`: Get total sales by week.
  - `GET /api/reports/get-total-sales-by-month`: Get total sales by month.
  - `GET /api/reports/get-top-selling-products`: Get top selling products.

## Technologies Used

- Node.js: JavaScript runtime environment.
- Prisma: Database toolkit for Node.js and TypeScript.
- Express.js: Web application framework for Node.js.
- PostgreSQL: Relational database management system.

## Project Structure

- `src`: Contains the source code of the application.
- `src/controllers`: Contains the controller functions for handling API requests.
- `src/routes`: Contains the route definitions for the API endpoints.
- `prisma`: Contains the Prisma configuration and migration files and schemas.
