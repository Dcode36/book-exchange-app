const Book = require('../models/Book');
const User = require('../models/User');

// Add a new book listing (only for Owners)
exports.addBook = async (req, res) => {
  const { title, author, genre, city, contact } = req.body;
  const { userId } = req.user;

  const newBook = new Book({
    title,
    author,
    genre,
    city,
    contact,
    owner: userId
  });

  try {
    await newBook.save();
    res.status(201).json({ message: 'Book listed successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Error listing book', error });
  }
};

// Get all books (Seeker or Owner)
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'name email');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Toggle book status (Rented/Exchanged)
exports.toggleStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(bookId, { status }, { new: true });
    res.status(200).json({ message: 'Book status updated', book });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
