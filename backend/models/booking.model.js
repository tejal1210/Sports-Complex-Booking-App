// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true }, // e.g., "07:00 AM - 08:00 AM"
  sport: { type: String, required: true }, // e.g., "Football"
  court: { type: String, required: true }, // e.g., "Court 1"
});

const Booking = mongoose.model('Booking', BookingSchema);
export default Booking;
