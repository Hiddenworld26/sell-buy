const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "book", default: [] }],
});

module.exports = mongoose.model("cart", cartSchema);