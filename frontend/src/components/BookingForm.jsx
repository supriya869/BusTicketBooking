import { useEffect, useState } from "react";
import SeatLayout from "./SeatLayout";
import BookingConfirmationModal from "./BookingConfirmationModal";
import {
  createBooking,
  getBookedSeatsByDate,
} from "../services/api";

export default function BookingForm() {
  const [travelDate, setDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (!travelDate) return;

    const loadBookedSeats = async () => {
      const bookings = await getBookedSeatsByDate(travelDate);
      const seats = bookings.flatMap(b => b.seats);
      setBookedSeats(seats);
    };

    loadBookedSeats();
  }, [travelDate]);

  const submit = async () => {
    if (!travelDate || !mobile || selectedSeats.length === 0) {
      alert("All fields required");
      return;
    }

    try {
      const res = await createBooking({
        travelDate,
        mobile,
        seats: selectedSeats,
      });

      setConfirmation(res);
      setSelectedSeats([]);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h3>Book Ticket</h3>

      <input
        type="date"
        value={travelDate}
        onChange={e => setDate(e.target.value)}
      />

      <input
        placeholder="Mobile Number"
        value={mobile}
        onChange={e => setMobile(e.target.value)}
      />

      <SeatLayout
        selected={selectedSeats}
        setSelected={setSelectedSeats}
        bookedSeats={bookedSeats}
      />

      <button onClick={submit}>Book Ticket</button>

      <BookingConfirmationModal
        booking={confirmation}
        onClose={() => setConfirmation(null)}
      />
    </div>
  );
}
