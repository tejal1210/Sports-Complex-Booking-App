import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingGrid.css';

const BookingGrid = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [centers] = useState(['Indiranagar', 'Koramangala']);
  const sports = ['Football', 'Badminton', 'Squash', 'Tennis', 'Basketball', 'Cricket'];

  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const formattedDate = selectedDate.toLocaleDateString('en-CA');
      const response = await axios.get(`http://localhost:5000/api/bookings?date=${formattedDate}&court=${selectedCenter}`);
      console.log('Bookings fetched:', response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  useEffect(() => {
    fetchBookings();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [selectedDate, selectedCenter]);

  const handleBooking = (sport, hour) => {
    setSelectedSport(sport);
    setSelectedTime(hour);
    setShowModal(true);
  };

  const createBooking = async () => {
    if (!selectedCenter) {
      alert('Please select a center');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in.');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const bookingData = {
        sport: selectedSport,
        timeSlot: selectedTime,
        court: selectedCenter,
        date: selectedDate.toLocaleDateString('en-CA'),
      };

      await axios.post('http://localhost:5000/api/bookings', bookingData, config);
      setShowModal(false);
      fetchBookings();
    } catch (error) {
      console.error('Error creating booking', error);
      alert('Error creating booking: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Sports Complex Booking</h1>
        {!isLoggedIn && (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>

      <div className="selection-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="date-picker"
        />
        
        <select onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
          <option value="">Select Center</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>{center}</option>
          ))}
        </select>
      </div>

      <div className="grid">
        {sports.map((sport, index) => (
          <div key={index}>
            <h2>{sport}</h2>
            {[...Array(17)].map((_, hourIndex) => {
              const hour = `${7 + hourIndex}:00`;
              const isBooked = bookings.some((booking) => {
                const bookingDate = new Date(booking.date).toLocaleDateString('en-CA'); // Ensure correct format
                const bookingSport = booking.sport;
                const bookingTimeSlot = booking.timeSlot;

                console.log(`Checking booking:`, {
                  sport,
                  hour,
                  bookingSport,
                  bookingTimeSlot,
                  bookingDate,
                  selectedDate: selectedDate.toLocaleDateString('en-CA'),
                });

                return (
                  bookingSport === sport &&
                  bookingTimeSlot === hour &&
                  bookingDate === selectedDate.toLocaleDateString('en-CA')
                );
              });

              return (
                <div
                  key={hourIndex}
                  className={`slot ${isBooked ? 'booked' : ''}`} 
                  onClick={() => !isBooked && handleBooking(sport, hour)}
                >
                  {hour}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Booking</h2>
            <p>Sport: {selectedSport}</p>
            <p>Time: {selectedTime}</p>
            <p>Center: {selectedCenter}</p>
            <p>Date: {selectedDate.toLocaleDateString('en-CA')}</p>
            <button onClick={createBooking}>Confirm Booking</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingGrid;
