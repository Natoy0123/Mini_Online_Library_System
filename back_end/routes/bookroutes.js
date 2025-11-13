const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const { protect, adminOnly } = require('../middleware/auth');


router.post('/', protect, adminOnly, async (req, res) => {
  const { title, author, description } = req.body;
  const book = new Book({ title, author, description, createdBy: req.user._id });
  await book.save();
  res.json(book);
});


router.get('/', protect, async (req, res) => {
  const books = await Book.find().populate('createdBy', 'username');
  res.json(books);
});

module.exports = router;
