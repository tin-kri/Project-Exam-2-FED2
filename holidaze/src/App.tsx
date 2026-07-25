import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenuesPage from "./features/venues/pages/Venues";
import VenueDetailPage from "./features/venues/pages/VenueDetails";
import RegisterPage from "./features/auth/pages/Register";
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
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
