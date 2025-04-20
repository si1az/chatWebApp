/* Sample crud operations */

/* CREATE: Add a new user */
INSERT INTO Users (username, email, password_hash, created_at)
VALUES ('eve', 'eve@example.com', 'hash5', DATETIME('now'));

/* READ: Get all messages with usernames and room names */
SELECT m.message_id, u.username, r.room_name, m.content, m.timestamp
FROM Messages m
JOIN Users u ON m.user_id = u.user_id
JOIN Rooms r ON m.room_id = r.room_id
ORDER BY m.timestamp DESC;

/* READ: List users in the 'General' room with their roles */
SELECT u.username, ur.role
FROM User_Rooms ur
JOIN Users u ON ur.user_id = u.user_id
WHERE ur.room_id = (SELECT room_id FROM Rooms WHERE room_name = 'General');

/* UPDATE: Promote a user to admin in a room */
UPDATE User_Rooms
SET role = 'admin'
WHERE user_id = (SELECT user_id FROM Users WHERE username = 'bob')
AND room_id = (SELECT room_id FROM Rooms WHERE room_name = 'General');

/* DELETE: Remove old messages (older than 20 days) */
DELETE FROM Messages
WHERE timestamp < DATETIME('now', '-20 days');

/* READ: Count messages per user */
SELECT u.username, COUNT(m.message_id) AS message_count
FROM Users u
LEFT JOIN Messages m ON u.user_id = m.user_id
GROUP BY u.username;

/* CREATE: Add a new message */
INSERT INTO Messages (room_id, user_id, content, timestamp)
VALUES (1, 5, 'Testing CRUD!', DATETIME('now'));

/* UPDATE: Change a room’s description */
UPDATE Rooms
SET description = 'Updated general discussion room'
WHERE room_name = 'General';

/* DELETE: Remove a user from a room */
DELETE FROM User_Rooms
WHERE user_id = (SELECT user_id FROM Users WHERE username = 'charlie')
AND room_id = (SELECT room_id FROM Rooms WHERE room_name = 'Work Chat');