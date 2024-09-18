# Authentication and User Management Project

This project is a RESTful API for authentication and user management, built with **Typescript**, **Node.js**, **Express**, **Prisma**, and **JWT**. The API allows you to create, update, list, and delete users, as well as perform login and authenticate requests using **JWT**.

## Features

- **Authentication**:
  - User login with email and password.
  - JWT token generation to secure routes.
- **User Management**:
  - Creation of new users with password hashing.
  - Listing all users.
  - Fetching users by ID.
  - Updating user information.
  - Deleting users.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. **Install dependencies**:

   Navigate to the project folder and run the following command:

   ```bash
   npm install
   ```

3. **Configure the database**:

   Set up your database in the `prisma/schema.prisma` file according to your environment. To configure Prisma, run:

   ```bash
   npx prisma migrate dev
   ```

4. **Start the server**:

   After configuring the database, start the server:

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:3000`.

## Endpoints

### Authentication

- `POST /api/login`: Logs in a user and returns a JWT token.
  - **Body**: `{ "email": "user@example.com", "password": "password" }`

### Users

- `POST /api/user`: Creates a new user.
  - **Body**: `{ "name": "Name", "email": "user@example.com", "password": "password" }`
  - **Authentication**: Requires JWT token.

- `GET /api/users`: Returns a list of all users.
  - **Authentication**: Requires JWT token.

- `GET /api/user/:id`: Returns a specific user by ID.
  - **Authentication**: Requires JWT token.

- `PUT /api/user/:id`: Updates an existing user.
  - **Body**: `{ "name": "Updated Name", "email": "newemail@example.com", "password": "newpassword" }`
  - **Authentication**: Requires JWT token.

- `DELETE /api/user/:id`: Deletes a specific user by ID.
  - **Authentication**: Requires JWT token.

## Authentication Middleware

Routes that require authentication use the `authMiddleware`, which validates the JWT token sent in the `Authorization` header.

Example of request header:
```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The project includes custom error handling using exception classes and a global middleware to catch errors and return appropriate messages to the client.

## Logging

The project uses **Winston** to handle logging of errors and important events.