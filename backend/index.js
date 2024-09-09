const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const conf = require("./conf/conf");
const fs = require("fs");
const mongoose = require("mongoose");
const book = require("./models/book");
const cart = require("./models/cart");
const buyBook = require("./models/BuyBooks");
const bookRoutes = require('./routes/bookRoutes');
const user = require("./models/userModel");
require("./db/connectToDb");


let cartId = "";
let adminId = "";


//cloudinary
cloudinary.config({
  cloud_name: conf.cloudName,
  api_key: conf.apiKey,
  api_secret: conf.apiSecret,
});

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("server is working perfectly fine");
// });

app.use('/api/books', bookRoutes);

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await buyBook.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//file upload
app.post("/uploads", upload.array("file", 10), async (req, res) => {
  console.log("");
  console.log("req.body hai bro");
  console.log(req.body);
  console.log(JSON.parse(req.body.bookDetails));
  // console.log(name, email);

  const {
    name,
    address,
    author,
    language,
    publisher,
    publicationDate,
    mrp,
    retailPrice,
    discountedPrice,
  } = JSON.parse(req.body.bookDetails);

  const images = req.files;
  console.log("images waala log");
  console.log(images);
  const imageUrls = [];

  for (const image of images) {
    const result = await cloudinary.uploader.upload(image.path).catch((err) => {
      console.log("cloudinary upload mein error".toUpperCase());
    });
    fs.unlink(image.path, (err) => {
      if (err) console.log(err);
      else {
        console.log("\nDeleted file: example_file.txt");
      }
    });
    imageUrls.push(result.secure_url);
  }

  console.log(imageUrls);

  await book.create({
    coverUrls: imageUrls,
    name,
    address,
    author,
    language,
    publisher,
    publicationDate,
    mrp,
    retailPrice,
    discountedPrice,
  });

  res.status(200).json({
    success: true,
    message: "BOOK added successfully",
    imageUrls,
  });
});


app.post("/addToCart", async (req, res) => {
  if (cartId.length === 0) {
    const sampleCart = new cart();
    await sampleCart.save();
    cartId = sampleCart._id;
  }
  console.log("");
  console.log("addd to cart mein hu");
  console.log("cart id = ", cartId);
  console.log(req.body.data.id);
  const bId = new mongoose.Types.ObjectId("" + req.body.data.id);

  const result = await cart.updateOne(
    { _id: cartId }, // Find the cart by its ID
    {
      $push: { books: bId },
    } // Push the book ID to the books array
  );
  console.log(result);
  res.json({
    success: true,
    message: "book added successfully",
  });
});

//get cart
app.get("/cartItems", async (req, res) => {
  const items = await cart.find({}).populate("books");
  console.log(items);
  res.send(items);
});

//orders for admin
app.post("/orders", async (req, res) => {
  console.log(req.body);

  const createdOrder = await orders.create({
    book: req.body.bookId,
    userId: req.body.userId,
  });

  res.json({
    success: true,
    message: "order created successfully",
  });
});




app.get("/buyBooks", async (req, res) => {
  const books = await book.find({});
  res.send(books);
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});