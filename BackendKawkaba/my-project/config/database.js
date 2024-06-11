const mongoose = require("mongoose");

// Connect to the database
const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(`Database Connected: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = dbConnection;
