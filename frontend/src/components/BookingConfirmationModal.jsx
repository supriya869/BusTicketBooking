export default function BookingConfirmationModal({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>🎉 Booking Confirmed</h3>

        <p><b>Booking ID:</b> {booking.bookingId}</p>
        <p><b>Travel Date:</b> {booking.travelDate}</p>
        <p><b>Mobile:</b> {booking.mobile}</p>
        <p><b>Seats:</b> {booking.seats.join(", ")}</p>

        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
