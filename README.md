# _The_ Messaging App

## Description
This is a simple messaging app for managing users, rooms, and messages. It includes an admin panel with various features to manage the system (and perform crud operations).

- **User Management**
  - Register users
  - Fetch, update, and delete users
  - Promote users to admin in specific rooms
  - Ban users (delete them from the database)

- **Room Management**
  - Create rooms
  - Fetch and delete rooms
  - View users in a room and their roles

- **Message Management**
  - Send, fetch, and delete messages
  - View messages by room

- **Statistics**
  - Count messages per user

The app uses **SQLite** as the database and is built with **Node.js** and **Express** for the backend, along with basic **HTML/CSS/JavaScript** for the frontend.

---

## How to Run

### 1. Install Dependencies
Make sure you have **Node.js** installed. Then run:
```bash
npm install
```

### 2. Set Up the Database
Initialize the database by running:
```bash
npm run init-db
```

### 3. Start the Server
Start the app with:
```bash
npm start
```

### 4. Open the Admin Panel
Open your browser and go to:
```
http://localhost:3000
```

---

## Notes
- This is a basic project created for one of my college courses. (and personal learning of web development/tinkering)
- Ensure that you restart the server after making changes to the code.
- The database is stored locally as `database.sqlite`. (delete it if you want to reset the database & before restarting the server)