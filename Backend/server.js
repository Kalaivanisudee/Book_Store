const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 3000;

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// MongoDB connection
mongoose
  .connect(process.env.mongo_uri)
  .then(() => {
    console.log("Connected to MongoDB...");
    // Seed the database on successful connection
    seedDatabase();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
  try {
    await Book.deleteMany(); // Clear existing data

    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 20,
        image: process.env.image1,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 15,
        image: process.env.image2,
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 255,
        image: process.env.image3,
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 220,
        image: process.env.image3,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 115,
        image: process.env.image3,
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 125,
        image: process.env.image3,
      },
    ];

    await Book.insertMany(books);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Define API endpoint for fetching all books
app.get("/api/books", async (req, res) => {
  try {
    // Fetch all books from the database
    const allBooks = await Book.find();

    // Send the entire books array as JSON response
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
