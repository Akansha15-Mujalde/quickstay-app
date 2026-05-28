const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hotel name is required"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price per night is required"],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 1,
    max: 5,
  },
  type: {
    type: String,
    required: [true, "Property type is required (e.g., Luxury, Resort, Villa)"],
    trim: true,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Hotel", HotelSchema);
