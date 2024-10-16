// controllers/bookingController.js
import Booking from '../models/booking.model.js';

export const createBooking = async (req, res) => {
  const { date, timeSlot, sport, court } = req.body;

  const existingBooking = await Booking.findOne({ date, timeSlot, sport, court });

  if (existingBooking) {
    return res.status(400).json({ message: 'Booking conflict' });
  }

  const booking = await Booking.create({ ...req.body, user: req.user.id });

  if (booking) {
    res.status(201).json(booking);
  } else {
    res.status(400).json({ message: 'Invalid booking data' });
  }
};

export const getBookings = async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({ date }).populate('user', 'username');
  res.json(bookings);
};
