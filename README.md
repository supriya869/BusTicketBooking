# 🚌 Bus Ticket Booking & Boarding Management System

A full-stack **Bus Ticket Booking System** designed for bus conductors to manage seat reservations and passenger boarding efficiently.  
The system focuses on **clean UI**, **optimized boarding logic**, and **real-time booking & boarding tracking**.

---

## 🚀 Features

### 🔹 Screen 1: Book / Update / Edit Booking
- Select **Travel Date**, **Mobile Number**, and **Seats**
- **2 × 2 seat layout** with **15 rows**
- Real-time seat availability (already booked seats disabled)
- Maximum **6 seats per mobile number per day**
- Edit bookings before boarding
- Confirmation popup on successful booking with:
  - Booking ID
  - Travel Date
  - Mobile Number
  - Selected Seats

---

### 🔹 Screen 2: Booking List & Boarding Tracking
- View bookings by **travel date**
- Optimized **boarding sequence**
- Click-to-call passenger mobile number
- Mark passengers as **Boarded**
- Boarding status updates in real time (Pending / Boarded)

---

## 🧠 Boarding Optimization Algorithm

To minimize boarding time and avoid aisle blocking:
- Passengers are boarded **from the farthest seat to the nearest seat**
- All passengers under the same booking board together
- Each booking takes **60 seconds** to settle
- No crossing allowed while settling

This approach significantly reduces total boarding time.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML5, CSS3

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- MongoDB Atlas (Cloud Database)
- Mongoose ODM

### Tools
- Git & GitHub
- Postman
- VS Code

---

## 🏗 Project Architecture

- Frontend communicates with backend via REST APIs
- Backend follows **MVC architecture**
- MongoDB stores bookings and boarding status
- Boarding optimization handled via a service layer

---

## ▶️ How to Run the Project Locally

### ✅ Prerequisites
- Node.js installed
- MongoDB Atlas account
- Git installed

---

### 🔹 Backend Setup

```bash
cd backend
npm install
