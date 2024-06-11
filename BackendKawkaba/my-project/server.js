const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const ApiError = require("./utils/apiError");
const globalError = require("./Middlewares/ErrorMiddleware");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./API/categoryRoute");
const productRoute = require("./API/productRoute");
const userRoute = require("./API/userRoute");
const cartRoute = require("./API/cartRoute");
const authRoute = require("./API/authRoute");
const quizRoute = require("./API/quizRoute");
const recommendationRoute = require("./API/recommendationRoute");

// connect with DB
dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// eslint-disable-next-line eqeqeq
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount routes here
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1", quizRoute);
app.use("/api/v1", recommendationRoute);

app.all("*", (req, res, next) => {
  //  Create error and send to error handling middleware
  next(new ApiError(`Cant find this route: ${req.originalUrl}`, 400));
});

// Global error handling midleware
app.use(globalError);

app.use(express.static("dist"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Handle rejections outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down the application`);
    process.exit(1);
  });
});

// to use the file 'products' routes

// **************NEW COMMENT**************

// const productsRoutes = require('./routes/products');
// const { ServerApiVersion } = require('mongodb');
// app.use('/api/products', productsRoutes);

// to use file 'login' routes
// const loginRoute = require('./login');

// app.use('/api', loginRoute);

const users = [];

// Signup endpoint
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Create a new user object
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
  };

  // Store the new user
  users.push(newUser);

  // Return success response
  return res.json({ message: "Signup successful" });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  // Find the user with the provided email
  const user = users.find((user) => user.email === email);

  // Check if the user exists and the password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Return success response
  return res.json({ message: "Login successful" });
});
