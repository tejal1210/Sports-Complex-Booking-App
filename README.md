# Sports Complex Booking App IIT2021005

Welcome to the Sports Complex Booking App! This application allows users to easily book sports facilities at various locations. It offers a seamless user experience, enabling users to view available time slots, create bookings, and manage their accounts.

## Live Demo

You can access the live demo of the application here: [Frontend](https://sports-complex-booking-app-frontend.onrender.com/) [Backend](https://sports-complex-booking-app-backend.onrender.com)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Features

### User Registration and Login

- **Registration**: Users can create an account by providing their name, email, and password. The registration process includes validation to ensure all fields are filled correctly and that the email is unique.
  
- **Login**: Users can log in using their registered email and password. Successful login returns a secure access token for authenticated actions.

### Sports Facility Booking

- **Hourly View**: Users can view the booking schedule in a grid-like format from 7 AM to 12 AM, displaying 1-hour slots for different sports (e.g., football, badminton).
  
- **Location Selection**: Users can select a location from a dropdown menu, making it easy to find available facilities.

- **Create Booking**: Users can click on an available time slot to create a booking. A pop-up allows users to confirm their booking details.

- **Conflict Prevention**: The app prevents conflicting bookings by checking availability in real-time, ensuring users cannot book the same slot multiple times.

### User Profile Management

- **View Bookings**: Users can view their existing bookings in a dedicated section, which displays all relevant details.

- **Logout**: Users can log out securely, ensuring that their session ends and the access token is cleared.

## Technologies

This application is built using the following technologies:

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Render for backend and frontend hosting

## API Endpoints

### User Endpoints

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in an existing user.

### Booking Endpoints

- **GET** `/api/bookings`: View all bookings for the logged-in user.
- **POST** `/api/bookings`: Create a new booking.

## Usage

1. Register a new account by filling in the registration form with your name, email, and password.
2. Log in using your credentials.
3. Select a location from the dropdown menu to find available sports facilities.
4. View the hourly schedule displayed in a grid format and select an available time slot.
5. Confirm your booking through the pop-up window.
6. View your bookings in your profile section to manage existing reservations.

