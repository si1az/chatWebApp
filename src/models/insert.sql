/* Inserting sample data into tables */

/* Insert Users */
INSERT INTO Users (username, email, password_hash, created_at) VALUES
('alice', 'alice@example.com', 'hash1', DATETIME('now', '-30 days')),
('bob', 'bob@example.com', 'hash2', DATETIME('now', '-25 days')),
('charlie', 'charlie@example.com', 'hash3', DATETIME('now', '-20 days')),
('dave', 'dave@example.com', 'hash4', DATETIME('now', '-15 days'));

/* Insert Rooms (trigger auto-adds creators to User_Rooms) */
INSERT INTO Rooms (room_name, created_by, description, created_at) VALUES
('General', 1, 'General discussion room', DATETIME('now', '-28 days')),
('Study Group', 2, 'Room for study discussions', DATETIME('now', '-22 days')),
('Work Chat', 3, 'Work-related conversations', DATETIME('now', '-18 days')),
('Gaming', 4, 'Gaming discussions', DATETIME('now', '-10 days'));

/* Insert Messages */
INSERT INTO Messages (room_id, user_id, content, timestamp) VALUES
(1, 1, 'Hello everyone!', DATETIME('now', '-25 days')),
(2, 2, 'Who’s joining the study session?', DATETIME('now', '-20 days')),
(3, 3, 'Review the latest project update.', DATETIME('now', '-15 days')),
(1, 2, 'Welcome to General chat!', DATETIME('now', '-23 days')),
(4, 4, 'Team up for the tournament?', DATETIME('now', '-5 days'));

/* Insert Additional User_Rooms (beyond auto-added admins) */
INSERT INTO User_Rooms (user_id, room_id, role, joined_at) VALUES
(2, 1, 'member', DATETIME('now', '-20 days')),
(3, 1, 'member', DATETIME('now', '-18 days')),
(4, 2, 'member', DATETIME('now', '-15 days')),
(1, 3, 'member', DATETIME('now', '-10 days'));