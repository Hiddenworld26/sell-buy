const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  //   publisher: "",
  //   publicationDate: new Date(),

  name: {
    type: String,
  },
  coverUrls: [{ type: String }],
  email: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
  },
  mrp: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  retailPrice: {
    type: Number,
  },
  author: {
    type: String,
  },
  language: {
	type: String
  },
  publisher: {
	type: String
  },
  publicationDate: {
	type: Date
  }
});

module.exports = mongoose.model("book", bookSchema);