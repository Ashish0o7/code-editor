// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./auth");

const app = express();
const PORT = 5000;
const MONGODB_URI = "mongodb://localhost:27017/myapp";

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
