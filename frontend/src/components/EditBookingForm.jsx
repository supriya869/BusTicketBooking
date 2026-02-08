import { useState } from "react";
import SeatLayout from "./SeatLayout";
import { searchBooking, updateBooking } from "../services/api";

export default function EditBookingForm() {
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [booking, setBooking] = useState(null);
  const [seats, setSeats] = useState([]);

  const search = async () => {
    try {
      const res = await searchBooking(mobile, date);
      if (res.length === 0) {
        alert("No booking found");
        return;
      }
      setBooking(res[0]);
      setSeats(res[0].seats);
    } catch (e) {
      alert(e.message);
    }
  };

  const update = async () => {
    try {
      const res = await updateBooking(booking._id, seats);
      alert("Booking updated successfully");
      setBooking(res.booking);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, marginTop: 20 }}>
      <h3>Edit / Update Booking</h3>

      <input
        placeholder="Mobile Number"
        value={mobile}
        onChange={e => setMobile(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button onClick={search}>Search Booking</button>

      {booking && (
        <>
          <p><b>Booking ID:</b> {booking.bookingId}</p>

          {booking.boarded ? (
            <p style={{ color: "red" }}>
              ❌ Cannot edit. Passenger already boarded.
            </p>
          ) : (
            <>
              <SeatLayout selected={seats} setSelected={setSeats} />
              <button onClick={update}>Update Booking</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
