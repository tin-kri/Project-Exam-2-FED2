import "./App.css";
import { Calendar } from "./components/ui/calendar"
import React from "react";

function App() {
const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <h1>Holidaze</h1>
     
       <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />

      <div className="grid grid-cols-3 gap-4">
        <button className="btn btn-primary w-full">Filter</button>
        <button className="btn btn-secondary w-full">Search Icon</button>
        <button className="btn btn-outline w-full">Book Now</button>
        
      </div>
    </>
  );
}

export default App;
