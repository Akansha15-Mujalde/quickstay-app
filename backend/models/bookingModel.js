const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    guestEmail: {
      type: String,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Confirmed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
