// import type { Profile } from "../types/profile.types";
// import { useUserBookings } from "@/features/bookings/hooks/useUserBookings";
// import BookingCard from "@/features/bookings/components/BookingCard";

import type { Profile } from "../types/profile.types";
import { useUserBookings } from "@/features/bookings/hooks/useUserBookings";
import BookingCard from "@/features/bookings/components/BookingCard";
import { separateBookings } from "@/features/bookings/utils/booking";

interface UserBookingsProps {
  profile: Profile;
}

export default function UserBookings({ profile }: UserBookingsProps) {
  const { bookings, isLoading, error } = useUserBookings(profile.name);
  const { upcoming, previous } = separateBookings(bookings);

  return (
    <section className="bg-bg-card mt-12 rounded-sm">
      <div className="flex flex-col gap-8 bg-bg-card px-6 py-8 ">
        <h2 className="font-serif text-2xl font-semibold tracking-tight text-navy-800">
          My Bookings
        </h2>
        <div className="flex flex-col gap-4 ">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-navy-800">
            Upcoming Bookings
          </h3>

          {isLoading && (
            <p className="text-grey-900 text-center text-base">Loading...</p>
          )}

          {error && (
            <p role="alert" className="text-center text-base text-destructive">
              {error}
            </p>
          )}

          {!isLoading && !error && upcoming.length === 0 && (
            <p className="text-grey-900 text-center text-base">
              You have no upcoming bookings
            </p>
          )}

          {upcoming.length > 0 && (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {upcoming.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t border-grey-200 pt-8">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-navy-800">
            Previous Bookings
          </h3>

          {isLoading && (
            <p className="text-grey-900 text-center text-base">Loading...</p>
          )}

          {error && (
            <p role="alert" className="text-center text-base text-destructive">
              {error}
            </p>
          )}

          {!isLoading && !error && previous.length === 0 && (
            <p className="text-grey-900 text-center text-base">
              You have no previous bookings
            </p>
          )}

          {previous.length > 0 && (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {previous.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}