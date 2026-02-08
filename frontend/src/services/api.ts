const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BOOKING_API = `${BASE_URL}/api/bookings`;

const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
};

export const createBooking = async (data: any) => {
  const res = await fetch(BOOKING_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const searchBooking = async (mobile: string, date: string) => {
  const res = await fetch(
    `${BOOKING_API}/search?mobile=${mobile}&date=${date}`
  );
  return handleResponse(res);
};

export const updateBooking = async (id: string, seats: string[]) => {
  const res = await fetch(`${BOOKING_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seats }),
  });
  return handleResponse(res);
};

export const getBoardingSequence = async (date: string) => {
  const res = await fetch(
    `${BOOKING_API}/boarding-sequence?date=${date}`
  );
  return handleResponse(res);
};

export const markBoarded = async (id: string) => {
  if (!id) throw new Error("Booking ID is missing");

  const res = await fetch(
    `${BOOKING_API}/${id}/boarded`,
    { method: "PATCH" }
  );

  return handleResponse(res);
};


export const getBookedSeatsByDate = async (date: string) => {
  const res = await fetch(`${BOOKING_API}?date=${date}`);
  return handleResponse(res);
};
