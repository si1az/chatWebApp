const fs = require('fs');
const db = require('./db');

// Load SQL files
const createSchema = fs.readFileSync('./src/models/create.sql', 'utf8');
const insertData = fs.readFileSync('./src/models/insert.sql', 'utf8');

// Execute SQL to set up the database
db.exec(createSchema, (err) => {
    if (err) {
        console.error('Error creating database schema:', err.message);
    } else {
        console.log('Database schema created successfully.');

        // Insert sample data
        db.exec(insertData, (err) => {
            if (err) {
                console.error('Error inserting sample data:', err.message);
            } else {
                console.log('Sample data inserted successfully.');
            }
        });
    }
});