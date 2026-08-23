import { format, differenceInCalendarDays } from "date-fns";
import type { VenueBooking } from "../types/venueManagement.types";

interface VenueBookingsListProps {
  bookings: VenueBooking[];
  price: number;
}

export default function VenueBookingsList({
  bookings,
  price,
}: VenueBookingsListProps) {
  return (
    <section className="mt-8 rounded-sm bg-bg-card">
      <div className="flex flex-col gap-4 px-6 py-8">
        <h2 className="font-serif text-2xl font-semibold text-navy-800">
          Bookings
        </h2>

        {!bookings || bookings.length === 0 ? (
          <p className="text-center text-base text-grey-900">
            No bookings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => {
              const nights = differenceInCalendarDays(
                new Date(booking.dateTo),
                new Date(booking.dateFrom),
              );
              const total = nights * price;

              return (
                <article
                  key={booking.id}
                  className="flex flex-col gap-2 rounded-sm bg-white p-4"
                >
                  <div className="flex gap-4 border-b border-grey-200 pb-2 text-sm">
                    <span className="w-24 font-bold text-navy-800">Dates</span>
                    <span className="text-grey-900">
                      {format(new Date(booking.dateFrom), "d MMM yyyy")} -{" "}
                      {format(new Date(booking.dateTo), "d MMM yyyy")}
                    </span>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <span className="w-24 font-bold text-navy-800">Guests</span>
                    <span className="text-grey-900">{booking.guests}</span>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <span className="w-24 font-bold text-navy-800">Total</span>
                    <span className="text-grey-900">${total}</span>
                  </div>

                  {booking.customer && (
                    <div className="flex gap-4 text-sm">
                      <span className="w-24 font-bold text-navy-800">
                        Customer
                      </span>
                      <span className="text-grey-900">
                        {booking.customer.name}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
