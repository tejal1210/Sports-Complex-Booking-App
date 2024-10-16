import React, { useEffect, useState } from 'react';
import { viewBookings } from '../api';

const Schedule = ({ token }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await viewBookings(token, '?sport=football&date=2024-10-16');
            setBookings(response.data);
        };
        fetchBookings();
    }, [token]);

    return (
        <div>
            <h2>Schedule</h2>
            {bookings.map((booking) => (
                <div key={booking._id}>
                    <p>{booking.sport} - {booking.date} - {booking.slot}</p>
                </div>
            ))}
        </div>
    );
};

export default Schedule;
