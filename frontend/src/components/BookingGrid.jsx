import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // Ensure you've installed react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import styles for the date picker
import './BookingGrid.css'; // Make sure to create this CSS file for styles

const BookingGrid = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [centers] = useState(['Indiranagar', 'Koramangala']);
  const sports = ['Football', 'Badminton', 'Squash', 'Tennis', 'Basketball', 'Cricket'];
  
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const navigate = useNavigate(); // Initialize navigation

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      console.log('Bookings fetched:', response.data); // Debugging statement
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  useEffect(() => {
    fetchBookings();
    // Check if user is logged in based on token in local storage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update login status
  }, []);

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
      const token = localStorage.getItem('token'); // Get the token from local storage
      if (!token) {
        alert('No token found, please log in.');
        navigate('/login'); // Redirect to login if no token
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Set the authorization header
        },
      };

      const bookingData = {
        sport: selectedSport,
        timeSlot: selectedTime,
        court: selectedCenter,
        date: selectedDate.toLocaleDateString('en-CA'), // Use local date string in YYYY-MM-DD format
      };

      await axios.post('http://localhost:5000/api/bookings', bookingData, config); // Send booking data with token
      setShowModal(false);
      fetchBookings(); // Refresh bookings after successful creation
    } catch (error) {
      console.error('Error creating booking', error); // Log error for debugging
      alert('Error creating booking: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div>
      {/* Header with Login Button */}
      <div className="header">
        <h1>Sports Complex Booking</h1>
        {/* Render Login Button only if the user is not logged in */}
        {!isLoggedIn && (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>

      {/* Selection Container with DatePicker and Center Selection */}
      <div className="selection-container">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)} // Update selected date
          dateFormat="yyyy-MM-dd" // Format the date
          placeholderText="Select a date"
          className="date-picker" // Add your custom styles for the date picker
        />
        
        <select onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
          <option value="">Select Center</option>
          {centers.map((center, index) => (
            <option key={index} value={center}>{center}</option>
          ))}
        </select>
      </div>

      {/* Grid for booking slots */}
      <div className="grid">
        {sports.map((sport, index) => (
          <div key={index}>
            <h2>{sport}</h2>
            {[...Array(17)].map((_, hourIndex) => {
              const hour = `${7 + hourIndex}:00`;
              const isBooked = bookings.some(
                (booking) => 
                  booking.sport === sport && 
                  booking.timeSlot === hour &&
                  booking.date === selectedDate.toLocaleDateString('en-CA') // Check date in correct format
              );

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

      {/* Modal for creating booking */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Booking</h2>
            <p>Sport: {selectedSport}</p>
            <p>Time: {selectedTime}</p>
            <p>Center: {selectedCenter}</p>
            <p>Date: {selectedDate.toLocaleDateString('en-CA')}</p> {/* Display selected date */}
            <button onClick={createBooking}>Confirm Booking</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingGrid;
