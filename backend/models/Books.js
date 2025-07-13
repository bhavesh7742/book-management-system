const db = require("../db/database");

const getAllBooks = (cb) => {
  db.all("SELECT * FROM books", [], cb);
};

const getBookById = (id, cb) => {
  db.get("SELECT * FROM books WHERE b_id = ?", [id], cb);
};

const createBook = (book, cb) => {
  const { title, author, genre, publication_year, price } = book;
  db.run(
    `INSERT INTO books (title, author, genre, publication_year, price)
     VALUES (?, ?, ?, ?, ?)`,
    [title, author, genre, publication_year, price],
    function (err) {
      cb(err, { b_id: this.lastID });
    }
  );
};

const updateBook = (id, book, cb) => {
  const { title, author, genre, publication_year, price } = book;
  db.run(
    `UPDATE books
     SET title = ?, author = ?, genre = ?, publication_year = ?, price = ?, updated_at = CURRENT_TIMESTAMP
     WHERE b_id = ?`,
    [title, author, genre, publication_year, price, id],
    cb
  );
};

const deleteBook = (id, cb) => {
  db.run("DELETE FROM books WHERE b_id = ?", [id], cb);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
