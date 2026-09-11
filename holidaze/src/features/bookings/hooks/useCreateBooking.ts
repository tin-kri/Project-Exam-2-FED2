import { useState } from "react";
import { createBooking } from "../api/bookings";
import type { Booking, CreateBookingValues } from "../types/booking.types";

export function useCreateBooking() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateBooking(
    values: CreateBookingValues,
  ): Promise<Booking | null> {
    setError(null);
    setIsLoading(true);
    try {
      const response = await createBooking(values);
      return response.data;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create booking",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  return { handleCreateBooking, isLoading, error };
}
