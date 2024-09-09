const buyBook = require('../models/BuyBooks');


const getBooks = async (req, res) => {
  try {
    const books = await buyBook.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addBook = async (req, res) => {
  const {coverUrls , author, rating, title, price } = req.body;

  try {
    const newBook = new buyBook({
      coverUrls,
      author,
      rating,
      title,
      price,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  getBooks,
  addBook,
};
