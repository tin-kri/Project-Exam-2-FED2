import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/venues" element={<h1>Venues</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/join" element={<h1>Join</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
