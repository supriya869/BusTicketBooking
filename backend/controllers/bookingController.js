const Booking = require("../models/Booking");
const { getOptimalBoardingSequence } = require("../services/boardingAlgorithm");
const { v4: uuid } = require("uuid");

exports.createBooking = async (req, res) => {
  const { travelDate, mobile, seats } = req.body;

  if (!travelDate || !mobile || !seats || seats.length === 0) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (seats.length > 6) {
    return res.status(400).json({ message: "Max 6 seats allowed per day" });
  }

  const existing = await Booking.find({ travelDate, mobile });
  const alreadyBooked = existing.reduce((sum, b) => sum + b.seats.length, 0);

  if (alreadyBooked + seats.length > 6) {
    return res.status(400).json({ message: "Seat limit exceeded" });
  }

  const booking = await Booking.create({
    bookingId: uuid().slice(0, 8),
    travelDate,
    mobile,
    seats,
  });

  res.json(booking);
};

exports.getBookingsByDate = async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({ travelDate: date });
  res.json(bookings);
};

exports.getBoardingSequence = async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({ travelDate: date });
  res.json(getOptimalBoardingSequence(bookings));
};

// exports.markBoarded = async (req, res) => {
//   await Booking.findByIdAndUpdate(req.params.id, { boarded: true });
//   res.json({ message: "Boarded marked" });
// };

exports.getBookingByMobileAndDate = async (req, res) => {
  const { mobile, date } = req.query;

  if (!mobile || !date) {
    return res.status(400).json({ message: "Mobile and date required" });
  }

  const bookings = await Booking.find({ travelDate: date, mobile });
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { seats } = req.body;

  if (!seats || seats.length === 0) {
    return res.status(400).json({ message: "Seats required" });
  }

  if (seats.length > 6) {
    return res.status(400).json({ message: "Max 6 seats allowed" });
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.boarded) {
    return res.status(400).json({ message: "Cannot edit after boarding" });
  }

  const otherBookings = await Booking.find({
    travelDate: booking.travelDate,
    mobile: booking.mobile,
    _id: { $ne: id },
  });

  const usedSeats = otherBookings.reduce(
    (sum, b) => sum + b.seats.length,
    0
  );

  if (usedSeats + seats.length > 6) {
    return res.status(400).json({ message: "Seat limit exceeded for the day" });
  }

  booking.seats = seats;
  await booking.save();

  res.json({
    message: "Booking updated successfully",
    booking,
  });
};
exports.getBookedSeatsByDate = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  // Get all bookings for that date
  const bookings = await Booking.find({ travelDate: date });

  // Flatten all seats into one array
  const bookedSeats = bookings.flatMap(b => b.seats);

  res.json(bookedSeats);
};


exports.markBoarded = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Booking ID missing" });
  }

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.boarded) {
    return res.status(400).json({ message: "Already boarded" });
  }

  booking.boarded = true;
  await booking.save();

  res.json({
    message: "Passenger boarded successfully",
    booking,
  });
};


