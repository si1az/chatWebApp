# Messaging App Frontend

This is the frontend part of the Messaging App, a lightweight web application designed for messaging in small communities, study groups, or workplaces. The app allows users to create accounts, join chat rooms, and send messages in real-time.

## Features

- User authentication (login and signup)
- Real-time messaging using WebSocket (Socket.io)
- Room-based messaging functionality
- Message history/logs per user
- Role-based access control (RBAC) for managing user permissions

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:

   ```
   cd messaging-app/frontend
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Folder Structure

- `public/`: Contains static files like `index.html` and favicon.
- `src/`: Contains the main application code.
  - `components/`: Reusable React components.
  - `context/`: Context API for managing authentication state.
  - `hooks/`: Custom hooks for managing WebSocket connections.
  - `pages/`: Different pages of the application.
  - `styles/`: CSS styles for the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.