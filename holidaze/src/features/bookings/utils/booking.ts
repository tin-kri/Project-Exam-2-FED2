import type { BookingVenue } from "../types/booking.types";

export function calculateNights(dateFrom: string, dateTo: string): number {
  const from = new Date(dateFrom).getTime();
  const to = new Date(dateTo).getTime();
  const diff = to - from;

  if (Number.isNaN(diff) || diff <= 0) return 0;

  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function calculateTotal(nights: number, pricePerNight: number): number {
  if (nights <= 0 || pricePerNight <= 0) return 0;
  return nights * pricePerNight;
}

export function formatBookingDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function separateBookings(
  bookings: BookingVenue[],
): { upcoming: BookingVenue[]; previous: BookingVenue[] } {
  const now = Date.now();

  const upcoming = bookings
    .filter((b) => new Date(b.dateTo).getTime() >= now)
    .sort(
      (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
    );

  const previous = bookings
    .filter((b) => new Date(b.dateTo).getTime() < now)
    .sort(
      (a, b) => new Date(b.dateTo).getTime() - new Date(a.dateTo).getTime(),
    );

  return { upcoming, previous };
}
