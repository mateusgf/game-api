const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(process.env.DATABASE || "database.db");

export default db;  