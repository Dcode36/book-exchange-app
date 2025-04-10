const express = require('express');
const { addBook, getBooks, toggleStatus } = require('../controllers/bookController');
const { verifyToken } = require('../utils/verifyToken');
const router = express.Router();

// Only authenticated users can add books
router.post('/', verifyToken, addBook);

// Get all books (for Seeker/Owner)
router.get('/', getBooks);

// Toggle book status
router.put('/:bookId', verifyToken, toggleStatus);

module.exports = router;
