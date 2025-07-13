const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/books.db");

// DROP and RECREATE table (this deletes old schema and data!)
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS books`);

  db.run(`
    CREATE TABLE books (
      b_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      publication_year INTEGER NOT NULL,
      price REAL NOT NULL CHECK (price >= 0),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
