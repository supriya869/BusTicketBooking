export default function SeatLayout({
  selected,
  setSelected,
  bookedSeats = [],
}) {
  const seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

  const toggle = seat => {
    if (bookedSeats.includes(seat)) return;

    setSelected(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <div className="bus-layout">
      {seats.map((seat, index) => (
        <>
          {/* Insert aisle after every 2 seats */}
          {index % 4 === 2 && <div className="aisle" />}

          <button
            key={seat}
            className={`seat ${
              bookedSeats.includes(seat)
                ? "seat-booked"
                : selected.includes(seat)
                ? "seat-selected"
                : ""
            }`}
            disabled={bookedSeats.includes(seat)}
            onClick={() => toggle(seat)}
          >
            {seat}
          </button>
        </>
      ))}
    </div>
  );
}
