// Importing SQLite3 to our project.
const sqlite3 = require("sqlite3").verbose();
// Setting up a database for storing data.
const db = new sqlite3.Database(process.env.DATABASE || "database.db");

console.log("db", db);

export default db;  