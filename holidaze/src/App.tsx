import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenuesPage from "./features/venues/pages/Venues";
import VenueDetailPage from "./features/venues/pages/VenueDetails";
import RegisterPage from "./features/auth/pages/Register";
import LoginPage from "./features/auth/pages/Login";
import ProfilePage from "./features/profile/pages/Profile";
import BookingConfirmationPage from "./features/bookings/pages/BookingConfirmation";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
          path="/booking-confirmed"
          element={
            <ProtectedRoute>
              <BookingConfirmationPage />
            </ProtectedRoute>
          }
        />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
