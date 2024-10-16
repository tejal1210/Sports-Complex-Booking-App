// routes/bookingRoutes.js
import express from 'express';
import { createBooking, getBookings } from '../controllers/booking.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', getBookings);

export default router;
