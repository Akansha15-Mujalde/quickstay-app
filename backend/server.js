const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Yeh line honi chahiye
require("dotenv").config();

const app = express();

// CORS ko database connectivity ke pehle initialize karein
app.use(cors());
app.use(express.json());

// Routes Setup
app.use("/api/hotels", require("./routes/hotelRoutes"));

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/quickstay";
mongoose
  .connect(mongoURI)
  .then(() => console.log("🚀 MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
