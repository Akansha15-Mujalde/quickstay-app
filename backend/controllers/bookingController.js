// backend/controllers/bookingController.js
const Booking = require("../models/bookingModel");

// 1. Nayi Booking Create karna
const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      hotelName,
      hotelImage,
      location,
      checkIn,
      checkOut,
      guests,
      totalPaid,
    } = req.body;

    const newBooking = new Booking({
      hotelId,
      hotelName,
      hotelImage,
      location,
      checkIn,
      checkOut,
      guests,
      totalPaid,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

// 2. Saari Bookings Get karna
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

module.exports = { createBooking, getBookings };
