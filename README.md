# Messaging App

## Overview
This is a lightweight web application designed for messaging in small communities, study groups, or workplaces. The app includes features for user authentication, room-based messaging, and real-time chat functionality.

## Features
- User authentication (signup and login)
- Room-based messaging for organized discussions
- Real-time messaging using WebSocket (Socket.io)
- Message history/logs per user
- Role-based access control (RBAC) for managing user permissions in rooms

## Tech Stack
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.io

## Project Structure
```
messaging-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── messageController.js
│   │   │   └── roomController.js
│   │   ├── models
│   │   │   ├── Message.js
│   │   │   ├── Room.js
│   │   │   ├── User.js
│   │   │   └── UserRoom.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── messageRoutes.js
│   │   │   └── roomRoutes.js
│   │   ├── services
│   │   │   └── socketService.js
│   │   └── utils
│   │       └── authMiddleware.js
│   ├── package.json
│   ├── .env
│   └── README.md
├── frontend
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   │   ├── ChatRoom.js
│   │   │   ├── Login.js
│   │   │   ├── MessageList.js
│   │   │   ├── RoomList.js
│   │   │   └── Signup.js
│   │   ├── context
│   │   │   └── AuthContext.js
│   │   ├── hooks
│   │   │   └── useSocket.js
│   │   ├── pages
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   └── SignupPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   │       └── main.css
│   ├── package.json
│   └── README.md
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- Docker (optional, for containerized setup)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd messaging-app
   ```

2. Set up the backend:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file with your database configuration.

3. Set up the frontend:
   - Navigate to the frontend directory:
     ```
     cd ../frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```

### Running the Application
- To run the backend:
  ```
  cd backend
  npm start
  ```

- To run the frontend:
  ```
  cd frontend
  npm start
  ```

### Docker Setup
- To run the application using Docker, use the following command:
  ```
  docker-compose up
  ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.