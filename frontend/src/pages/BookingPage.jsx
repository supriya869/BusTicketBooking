import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  return (
    <div>
      <h2>Screen 1: Book / Update / Edit Booking</h2>
      <p>Select travel date, mobile number and seats (max 6).</p>
      <BookingForm />
    </div>
  );
}
