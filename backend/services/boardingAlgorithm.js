exports.getOptimalBoardingSequence = (bookings) => {
  return bookings
    .map((b) => ({
      _id: b._id,                 // 🔥 THIS IS THE FIX
      bookingId: b.bookingId,
      seats: b.seats,
      mobile: b.mobile,
      boarded: b.boarded,
      farthestSeat: Math.max(
        ...b.seats.map((s) => parseInt(s.substring(1)))
      ),
    }))
    .sort((a, b) => b.farthestSeat - a.farthestSeat)
    .map((b, index) => ({
      _id: b._id,                 // 🔥 KEEP _id
      sequence: index + 1,
      bookingId: b.bookingId,
      seats: b.seats,
      mobile: b.mobile,
      boarded: b.boarded,
    }));
};
