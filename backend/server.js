const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 THIS LINE IS CRITICAL
app.use("/api/bookings", bookingRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 8004;

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
