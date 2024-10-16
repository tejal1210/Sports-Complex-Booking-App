import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingGrid.css'; // Make sure to create this CSS file for styles

const BookingGrid = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState('');
  const [centers, setCenters] = useState(['Indiranagar', 'Koramangala']);
  const sports = ['Football', 'Badminton', 'Squash', 'Tennis', 'Basketball', 'Cricket'];

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:5000/api/bookings'); // Adjust the API endpoint as needed
    setBookings(response.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleBooking = (sport, hour) => {
    setSelectedSport(sport);
    setSelectedTime(hour);
    setShowModal(true);
  };

  const createBooking = async () => {
    // Call API to create booking
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        sport: selectedSport,
        time: selectedTime,
        center: selectedCenter, // include center if needed
      });
      setShowModal(false);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error creating booking', error);
      // Optionally handle errors here
    }
  };

  return (
    <div>
      <h1>Sports Booking</h1>
      <select onChange={(e) => setSelectedCenter(e.target.value)} value={selectedCenter}>
        <option value="">Select Center</option>
        {centers.map((center, index) => (
          <option key={index} value={center}>{center}</option>
        ))}
      </select>
      <div className="grid">
        {sports.map((sport, index) => (
          <div key={index}>
            <h2>{sport}</h2>
            {[...Array(17)].map((_, hourIndex) => {
              const hour = `${7 + hourIndex}:00`;
              const isBooked = bookings.some(
                (booking) => booking.sport === sport && booking.time === hour
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
            <button onClick={createBooking}>Confirm Booking</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingGrid;
