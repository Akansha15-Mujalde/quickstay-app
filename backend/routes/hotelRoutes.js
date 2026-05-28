const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel.js"); // Sirf ek baar import karein

// Get All Hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching hotels", error: error.message });
  }
});

// Add New Hotel
router.post("/add", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding hotel", error: error.message });
  }
});

module.exports = router;
