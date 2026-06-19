# MERN Realtime Chat Application

A production-style MERN (MongoDB, Express.js, React, Node.js) chat application featuring robust user authentication, a comprehensive friend system, and real-time messaging capabilities powered by Socket.io. This backend repository provides the core API for all chat functionalities.

## 🌟 Key Features & Benefits

*   **User Authentication**: Secure user registration, login, and session management using JWT (JSON Web Tokens).
*   **Friend System**: Functionality to search for other users and manage a friend list (implicit from user searching and messaging).
*   **Real-time Messaging**: Instant message delivery and reception, ensuring a fluid chat experience (Socket.io integration for real-time capabilities).
*   **User Management**: API endpoints for searching and managing user profiles.
*   **Scalable Backend**: Built with Node.js and Express.js, providing a robust and performant API.
*   **MongoDB Integration**: Utilizes Mongoose for elegant MongoDB object modeling.

## 🛠️ Technologies Used

### Languages

*   JavaScript

### Tools & Libraries

*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js.
*   **MongoDB**: NoSQL database for flexible data storage.
*   **Mongoose**: MongoDB object modeling for Node.js.
*   **Socket.io**: For real-time, bidirectional event-based communication.
*   **Bcryptjs**: For password hashing and security.
*   **JSON Web Token (JWT)**: For secure authentication.
*   **Dotenv**: For managing environment variables.

## 🚀 Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js**: Version 14.x or higher installed.
*   **npm** (Node Package Manager) or **Yarn**: Comes with Node.js installation.
*   **MongoDB**: A running MongoDB instance (local or cloud-based like MongoDB Atlas).
*   **Git**: For cloning the repository.

## 💻 Installation & Setup

Follow these steps to get your development environment set up:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/prynshu19/mern-realtime-chat-app.git
    cd mern-realtime-chat-app
    ```

2.  **Navigate to the Backend Directory:**
    ```bash
    cd backend
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    # or using yarn
    # yarn install
    ```

4.  **Create an Environment File:**
    Create a `.env` file in the `backend` directory by copying the `.env.example` file:
    ```bash
    cp .env.example .env
    ```

5.  **Configure Environment Variables:**
    Open the newly created `.env` file and fill in the following variables:

    *   `MONGO_URL`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/chatApp` or your MongoDB Atlas URI).
    *   `JWT_SECRET`: A strong, secret string used for signing JWTs (e.g., `someSuperSecretKeyForJWT`).
    *   `PORT`: The port your server will run on (e.g., `5000`).

    Example `.env` file:
    ```
    MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatApp?retryWrites=true&w=majority
    JWT_SECRET=your_very_secure_jwt_secret_key_here
    PORT=5000
    ```

6.  **Start the Backend Server:**
    ```bash
    npm start
    # or if you have a custom start script in package.json, use that.
    # For development with nodemon:
    # npm run dev
    ```
    The server should now be running, typically on `http://localhost:5000` (or your specified `PORT`). You should see a message in the console indicating successful MongoDB connection.

    *Note: This repository only contains the backend code. A separate frontend repository (likely a React application) would be required to fully interact with this backend.*

## 💡 Usage & API Documentation

The backend exposes a RESTful API for managing users, authentication, and messages.

### Authentication Endpoints (`/api/auth`)

*   **`POST /api/auth/signup`**
    *   Registers a new user.
    *   **Request Body**:
        ```json
        {
          "name": "John Doe",
          "username": "johndoe",
          "email": "john@example.com",
          "phone": "+1234567890",
          "password": "securepassword123"
        }
        ```
    *   **Response**: A JWT token upon successful registration.

*   **`POST /api/auth/login`**
    *   Authenticates a user and issues a JWT token.
    *   **Request Body**:
        ```json
        {
          "email": "john@example.com",
          "password": "securepassword123"
        }
        ```
        or
        ```json
        {
          "username": "johndoe",
          "password": "securepassword123"
        }
        ```
    *   **Response**: A JWT token upon successful login.

### User Endpoints (`/api/users`)

*   **`GET /api/users?search={keyword}`**
    *   Searches for users by username.
    *   **Authorization**: Required (JWT in `Authorization` header).
    *   **Query Parameter**: `search` (optional, case-insensitive partial match).
    *   **Example Request**:
        ```
        GET /api/users?search=john
        Authorization: Bearer <your_jwt_token>
        ```
    *   **Response**: An array of user objects matching the keyword.

### Message Endpoints (`/api/messages`)

*   **`POST /api/messages/:reciverId`**
    *   Sends a message to a specific receiver.
    *   **Authorization**: Required (JWT in `Authorization` header).
    *   **Path Parameter**: `reciverId` (ID of the user to send the message to).
    *   **Request Body**:
        ```json
        {
          "text": "Hello there!"
        }
        ```
    *   **Example Request**:
        ```
        POST /api/messages/654c8a8e3d0d8b4e7c2e3f4a
        Authorization: Bearer <your_jwt_token>
        Content-Type: application/json

        {
          "text": "Hey, how are you?"
        }
        ```
    *   **Response**: The created message object.

*   **`GET /api/messages/:reciverId`** (Assumed based on chat app functionality)
    *   Retrieves chat history between the authenticated user and a specific receiver.
    *   **Authorization**: Required (JWT in `Authorization` header).
    *   **Path Parameter**: `reciverId` (ID of the user to retrieve messages with).
    *   **Response**: An array of message objects in the conversation.

### Authentication Middleware

Most routes are protected by the `authMiddleware.js`. To access these routes, you must include a valid JWT in the `Authorization` header of your request in the format:

`Authorization: Bearer <YOUR_JWT_TOKEN>`

## ⚙️ Configuration Options

The primary configuration is done via the `.env` file in the `backend` directory.

*   **`MONGO_URL`**: Essential for connecting to your MongoDB database. Ensure it's correctly formatted and accessible.
*   **`JWT_SECRET`**: A critical security parameter. Use a long, random, and complex string. **Never expose this in public repositories.**
*   **`PORT`**: Defines which port the Express server will listen on. Default is often 5000.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please follow these steps:

1.  **Fork** the repository.
2.  **Create a new branch** for your feature or fix (`git checkout -b feature/your-feature-name`).
3.  **Make your changes** and ensure tests pass (if any).
4.  **Commit your changes** (`git commit -m 'feat: Add new feature'`).
5.  **Push to your branch** (`git push origin feature/your-feature-name`).
6.  **Open a Pull Request** explaining your changes.

Please make sure to update documentation as needed and adhere to the project's coding style.

## 📄 License

This project is currently **not specified** under any license. You are free to use, modify, and distribute it, but it's recommended to add an open-source license (e.g., MIT, Apache 2.0) to clarify usage terms.

## 🙏 Acknowledgments

*   Thanks to the creators of Node.js, Express.js, MongoDB, Mongoose, Socket.io, and all other open-source libraries that make projects like this possible.
