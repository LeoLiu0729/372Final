const Database = require('better-sqlite3');

const db = new Database('./backend/database/termproject.db', {
    verbose: console.log, // Logs SQL queries for debugging
});

db.pragma('busy_timeout = 5000'); // Wait up to 5 seconds for locks to clear
db.pragma('journal_mode = WAL'); // Enable Write-Ahead Logging (WAL) for concurrency

module.exports = db;
