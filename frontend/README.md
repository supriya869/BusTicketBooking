# Bus Ticket Booking System

## Tech Stack
- Frontend: React (Vite)
- Backend: Node.js, Express
- Database: MongoDB Atlas (Free Tier)

## Setup

### Backend
cd backend  
npm install  
node server.js  

### Frontend
cd frontend  
npm install  
npm run dev  

## Features
- Seat booking with 2×2 layout
- Max 6 seats per mobile/day
- Booking confirmation popup
- Boarding sequence optimization
- Click-to-call
- MongoDB persistence

## Boarding Algorithm
Passengers board from the farthest seat to the nearest to avoid blocking and minimize boarding time.

## Assumptions
- Single bus
- One boarding gate
- 60s per booking group
