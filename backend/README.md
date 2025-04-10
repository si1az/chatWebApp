# Messaging App Backend

This is the backend for the Messaging App, a lightweight web application designed for messaging in small communities, study groups, or workplaces. The backend is built using Node.js and Express, and it connects to a PostgreSQL database.

## Features

- User authentication (signup, login)
- Room management (create, retrieve rooms)
- Message handling (send, retrieve messages)
- Real-time messaging using Socket.io
- Role-based access control (RBAC)

## Project Structure

- **src/**: Contains the source code for the backend application.
  - **app.js**: Entry point of the application.
  - **config/**: Database configuration and connection logic.
  - **controllers/**: Functions for handling requests related to authentication, messages, and rooms.
  - **models/**: Database models for Users, Rooms, Messages, and User-Room associations.
  - **routes/**: API routes for authentication, messages, and room management.
  - **services/**: WebSocket service for real-time messaging.
  - **utils/**: Utility functions, including authentication middleware.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd messaging-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the environment variables in the `.env` file:
   ```
   DATABASE_URL=your_postgresql_connection_string
   ```

4. Start the server:
   ```
   npm start
   ```

## Database Schema

The backend uses the following database schema:

- **Users**: Stores user information.
- **Rooms**: Stores chat room information.
- **Messages**: Stores messages sent in rooms.
- **User_Rooms**: Associative table for users and rooms.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License.