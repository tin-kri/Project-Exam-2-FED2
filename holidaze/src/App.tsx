import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VenuesPage from "./pages/Venues";
import VenueDetailPage from "./pages/VenueDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />{" "}
          <Route path="contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/join" element={<h1>Join</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
