const router = require("express").Router();
const ctrl = require("../controllers/bookingController");

router.post("/", ctrl.createBooking);
router.get("/", ctrl.getBookingsByDate);
router.get("/boarding-sequence", ctrl.getBoardingSequence);
router.get("/search", ctrl.getBookingByMobileAndDate);
router.put("/:id", ctrl.updateBooking);
router.patch("/:id/boarded", ctrl.markBoarded);
router.get("/booked-seats", ctrl.getBookedSeatsByDate); // ✅ ADD THIS

module.exports = router;
