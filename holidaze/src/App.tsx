import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenuesPage from "./features/venues/pages/Venues";
import VenueDetailPage from "./features/venues/pages/VenueDetails";
import RegisterPage from "./features/auth/pages/Register";
import LoginPage from "./features/auth/pages/Login";
import ProfilePage from "./features/profile/pages/Profile";
import BookingConfirmationPage from "./features/bookings/pages/BookingConfirmation";
import CreateVenuePage from "./features/venue-management/pages/CreateVenuePage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import { Toaster } from "sonner";
import ManageVenuePage from "./features/venue-management/pages/ManageVenuePage";
import EditVenuePage from "./features/venue-management/pages/EditVenuePage";
import Footer from "./components/layout/footer";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Toaster />
         <main className="flex-1">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/venues" element={<VenuesPage />} />
        <Route path="/venues/:id" element={<VenueDetailPage />} />
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

        <Route
          path="/manage-venues"
          element={
            <ProtectedRoute requireVenueManager>
              <CreateVenuePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-venues/:id"
          element={
            <ProtectedRoute requireVenueManager>
              <ManageVenuePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-venues/:id/edit"
          element={
            <ProtectedRoute requireVenueManager>
              <EditVenuePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </main>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
