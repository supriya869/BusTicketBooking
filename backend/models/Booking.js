const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: String,
  travelDate: String,
  mobile: String,
  seats: [String],
  boarded: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
