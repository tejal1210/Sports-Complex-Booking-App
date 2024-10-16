import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const register = (userData) => api.post('/auth/register', userData);
export const login = (userData) => api.post('/auth/login', userData);
export const createBooking = (token, bookingData) =>
    api.post('/bookings', bookingData, { headers: { Authorization: `Bearer ${token}` } });
export const viewBookings = (token, query) =>
    api.get(`/bookings${query}`, { headers: { Authorization: `Bearer ${token}` } });
