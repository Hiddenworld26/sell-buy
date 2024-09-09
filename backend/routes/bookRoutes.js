const express = require('express');
const { getBooks, addBook } = require('../controllers/bookController');

const router = express.Router();

// GET /api/books - Get all books
router.get('/buybooks', getBooks);

// POST /api/books - Add a new book
// router.post('/', addBook);

module.exports = router;
