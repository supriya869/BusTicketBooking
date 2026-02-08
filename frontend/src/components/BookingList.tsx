type Booking = {
  _id: string;
  bookingId: string;
  seats: string[];
  mobile: string;
};

type Props = {
  list: Booking[];
  onBoard: (id: string) => void;
};

export default function BookingList({ list, onBoard }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Seq</th>
          <th>Booking ID</th>
          <th>Seats</th>
          <th>Call</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {list.map((b, i) => (
          <tr key={b._id}>
            <td>{i + 1}</td>
            <td>{b.bookingId}</td>
            <td>{b.seats.join(", ")}</td>
            <td>
              <a href={`tel:${b.mobile}`}>📞</a>
            </td>
            <td>
              <button onClick={() => onBoard(b._id)}>
                Mark Boarded
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
