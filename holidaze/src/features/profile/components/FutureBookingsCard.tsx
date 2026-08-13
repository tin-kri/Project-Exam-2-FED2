import type { Profile } from "../types/profile.types";

interface FutureBookingsProps {
  profile: Profile;
}    

export default function FutureBookings({ profile}: FutureBookingsProps) {
  return (
    <section className="bg-bg-card rounded-sm mt-12">
      <div className="flex flex-col items-center gap-4  bg-sand-100 px-6 py-8">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
          My Bookings
        </h1>
      
        <p className="text-grey-900 text-base">You have no upcoming bookings</p>
       
      </div>
    </section>
  );
}
//create types for bookingx
//create a getBookings, should it be one for prev and future?
//fetch, then maybe split them into prev and future?
//create a booking card 
//render bookings