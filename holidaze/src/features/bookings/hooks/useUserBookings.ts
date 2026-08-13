import { useEffect, useState } from "react";
import type { BookingVenue } from "../types/booking.types";
import { getUserBookings } from "../api/bookings";


export function useUserBookings(name: string) {
  const [bookings, setBookings] = useState<BookingVenue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

   useEffect(() =>{
    let active = true;

    getUserBookings(name)
     .then((response) => {
         if (!active) return;
         setBookings(response.data);
         setIsLoading(false);
       })
       .catch((error) => {
         if (!active) return;
         setError(error.message);
         setIsLoading(false);
       });

         return () => {
       active = false;
     };
    },[name]);
   

   return { bookings,  isLoading, error };
 
   }
