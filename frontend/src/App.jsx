import { useState } from "react";
import BookingPage from "./pages/BookingPage";
import BoardingPage from "./pages/BoardingPage";
import EditBookingForm from "./components/EditBookingForm";

export default function App() {
  const [page, setPage] = useState("booking");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚌 Bus Ticket Booking</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPage("booking")}>Booking</button>
        <button onClick={() => setPage("boarding")} style={{ marginLeft: 10 }}>
          Boarding
        </button>
      </div>

      {page === "booking" && <BookingPage />}
      {page === "boarding" && <BoardingPage />}
      <EditBookingForm /> 
    </div>
  );
}
