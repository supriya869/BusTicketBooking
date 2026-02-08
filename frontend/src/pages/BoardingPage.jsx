import { useState } from "react";
import {
  getBoardingSequence,
  markBoarded,
} from "../services/api";

export default function BoardingPage() {
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBoarding = async () => {
    if (!date) {
      alert("Please select travel date");
      return;
    }

    setLoading(true);
    try {
      const data = await getBoardingSequence(date);
      setList(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

 const handleBoarded = async (id) => {
  await markBoarded(id);

  // update UI instantly
  setList(prev =>
    prev.map(b =>
      b._id === id ? { ...b, boarded: true } : b
    )
  );
};

  return (
    <div className="section-card">
      <h2>Screen 2: Booking List & Boarding Tracking</h2>

      {/* Input */}
      <div className="form-row">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button onClick={loadBoarding}>
          Load Boarding List
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading boarding sequence...</p>}

      {/* Empty */}
      {!loading && list.length === 0 && (
        <p>No bookings found for selected date</p>
      )}

      {/* Table */}
      {list.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Seq</th>
              <th>Booking ID</th>
              <th>Seats</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map(b => (
              <tr key={b.bookingId}>
                <td>{b.sequence}</td>
                <td>{b.bookingId}</td>
                <td>{b.seats.join(", ")}</td>

                <td>
                  <a
                    href={`tel:${b.mobile}`}
                    className="call-link"
                    title="Call passenger"
                  >
                    📞 {b.mobile}
                  </a>
                </td>

                <td>
                  <span
                    className={
                      b.boarded
                        ? "status boarded"
                        : "status pending"
                    }
                  >
                    {b.boarded ? "Boarded" : "Pending"}
                  </span>
                </td>

              <td>
  <button
    disabled={b.boarded}
    onClick={() => handleBoarded(b._id)}
  >
    {b.boarded ? "Boarded ✅" : "Mark Boarded"}
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Assumptions */}
      <div className="assumptions">
        <h4>Boarding Assumptions</h4>
        <ul>
          <li>Passengers board from farthest seat to nearest</li>
          <li>60 seconds to settle per booking</li>
          <li>No crossing while settling</li>
          <li>All passengers under same booking board together</li>
          <li>Boarding only through front gate</li>
        </ul>
      </div>
    </div>
  );
}
