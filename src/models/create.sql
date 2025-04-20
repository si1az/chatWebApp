/* Create tables for my chat web app */

/* Users Table */
/* Functional Dependencies: user_id -> username, email, password_hash, created_at */
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* Rooms Table */
/* Functional Dependencies: room_id -> room_name, created_by, created_at, description */
CREATE TABLE Rooms (
    room_id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_name VARCHAR(100) UNIQUE NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (created_by) REFERENCES Users(user_id) ON DELETE CASCADE
);

/* Messages Table */
/* Functional Dependencies: message_id -> room_id, user_id, content, timestamp */
CREATE TABLE Messages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

/* User_Rooms Table */
/* Functional Dependencies: (user_id, room_id) -> joined_at, role */
CREATE TABLE User_Rooms (
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(10) DEFAULT 'member' CHECK (role IN ('member', 'admin')),
    PRIMARY KEY (user_id, room_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id) ON DELETE CASCADE
);

/* Trigger to Auto-add creator to User_Rooms as admin when room is created */
CREATE TRIGGER room_creator_auto_join
AFTER INSERT ON Rooms
FOR EACH ROW
BEGIN
    INSERT INTO User_Rooms (user_id, room_id, role, joined_at)
    VALUES (NEW.created_by, NEW.room_id, 'admin', NEW.created_at);
END;