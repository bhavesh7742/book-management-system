const express = require("express");
const router = express.Router();
const Book = require("../models/Books");

router.get("/", (_, res) => {
  Book.getAllBooks((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  Book.getBookById(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
});

// router.post("/", (req, res) => {
//   Book.createBook(req.body, (err, result) => {
//     if (err) return res.status(400).json(err);
//     res.status(201).json(result);
//   });
// });

router.post("/", (req, res) => {
  Book.createBook(req.body, (err, result) => {
    if (err) {
      console.error("Insert Error:", err); // <-- Add this
      return res.status(400).json(err);
    }
    res.status(201).json(result);
  });
});

router.put("/:id", (req, res) => {
  Book.updateBook(req.params.id, req.body, (err) => {
    if (err) return res.status(400).json(err);
    res.status(204).end();
  });
});

router.delete("/:id", (req, res) => {
  Book.deleteBook(req.params.id, (err) => {
    if (err) return res.status(400).json(err);
    res.status(204).end();
  });
});

module.exports = router;
