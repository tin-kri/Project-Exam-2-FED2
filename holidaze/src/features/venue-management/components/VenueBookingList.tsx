import type { VenueBooking } from "../types/venueManagement.types";
import {
  calculateNights,
  calculateTotal,
  formatBookingDate,
} from "@/features/bookings/utils/booking";

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
            You have no bookings yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
            {bookings.map((booking) => {
              const nights = calculateNights(booking.dateFrom, booking.dateTo);
              const total = calculateTotal(nights, price);

              return (
                <article
                  key={booking.id}
                  className="flex flex-col gap-2 rounded-sm bg-white p-4"
                >
                  <dl className="flex flex-col gap-2">
                    <div className="flex gap-4 border-b border-grey-200 pb-2 text-sm">
                      <dt className="w-24 font-bold text-navy-800">Dates</dt>
                      <dd className="m-0 text-grey-900 font-bold">
                        {formatBookingDate(booking.dateFrom)} -{" "}
                        {formatBookingDate(booking.dateTo)}
                      </dd>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <dt className="w-24 font-bold text-navy-800">Guests</dt>
                      <dd className="text-grey-900">{booking.guests}</dd>
                    </div>

                    <div className="flex gap-4 text-sm">
                      <dt className="w-24 font-bold text-navy-800">Total</dt>
                      <dd className="text-grey-900">${total}</dd>
                    </div>

                    {booking.customer && (
                      <div className="flex gap-4 text-sm">
                        <dt className="w-24 font-bold text-navy-800">
                          Customer
                        </dt>
                        <dd className="text-grey-900">
                          {booking.customer.name}
                        </dd>
                      </div>
                    )}
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
