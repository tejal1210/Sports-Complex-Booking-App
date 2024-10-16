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
    const { date, court } = req.query; // Get date and court from the query parameters
    try {
      // Query the database for bookings that match the date and court
      const bookings = await Booking.find({ date, court: court }).populate('user', 'username');
      res.json(bookings); // Return the bookings found
    } catch (error) {
      console.error('Error fetching bookings:', error); // Log any errors
      res.status(500).json({ message: 'Server error' }); // Return a server error response
    }
  };
  
