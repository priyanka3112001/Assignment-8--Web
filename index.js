const express = require("express"); // Access express
const mongoose = require("mongoose"); // Access mongoose
const nodemailer = require("nodemailer"); // Access nodemailer
const multer = require("multer"); // Import multer
const path = require("path");
const fs = require("fs"); // Access file system to create directory if necessary

const db = require("./database/db.js"); // Access db connection
db();

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "priyankajadhav3112001@gmail.com",
    pass: "rnoa gxyc ndwl rhep", // Be sure to use environment variables in production!
  },
});

const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  name: String,
  email: String,
  mobile: Number,
});

// Product Schema
const productSchema = new Schema({
  productName: String,
  productPrice: Number,
  productImg: String, // Store image path
});

// Create models for User and Product
const userModel = mongoose.model("nnewusers", userSchema);
const productModel = mongoose.model("products", productSchema);

const app = express();
app.use(express.json()); // To parse JSON data
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data
app.set("view engine", "ejs");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the 'uploads' directory exists; if not, create it
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the 'uploads' directory if it doesn't exist
    }
    cb(null, uploadDir); // Store images in the "uploads" folder
  },
  
});

// Initialize multer for file uploads
const upload = multer({ storage: storage });

// Routes

// Add User Page
app.get("/add", (req, res) => {
  res.render("adduser.ejs");
});

// Show All Users
app.get("/show", async (req, res) => {
  try {
    const users = await userModel.find();
    res.render("showuser.ejs", { data: users });
  } catch (err) {
    res.send(err.message);
  }
});

// Add User Action
app.post("/useraction", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    await main(req.body.email); // Send an email after adding a user
    res.redirect("/show");
  } catch (err) {
    res.send(err.message);
  }
});

// Send Welcome Email
async function main(emailid) {
  const info = await transporter.sendMail({
    from: " <priyankajadhav3112001@gmail.com>", // Sender address
    to: emailid, // Recipient
    subject: "JS Application ✔", // Subject line
    text: "Hello world?", // Plain text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
}

// Add Product Page
app.get("/addproduct", (req, res) => {
  res.render("addproduct.ejs");
});

// Show All Products
app.get("/showproducts", async (req, res) => {
  try {
    const products = await productModel.find();
    res.render("showproduct.ejs", { products: products });
  } catch (err) {
    res.send(err.message);
  }
});

// Add Product Action
app.post("/productaction", upload.single("image"), async (req, res) => {
  try {
    const { productName, productPrice } = req.body;
    const productImg = req.file ? req.file.filename : null; // Get the filename from the uploaded image

    const newProduct = new productModel({
      productName,
      productPrice,
      productImg,
    });

    await newProduct.save();
    res.redirect("/showproducts"); // Redirect to show products page
  } catch (err) {
    res.send(err.message);
  }
});

// Serve static files (images)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(9000);
