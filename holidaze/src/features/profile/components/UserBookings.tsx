import type { Profile } from "../types/profile.types";
import { useUserBookings } from "@/features/bookings/hooks/useUserBookings";
import BookingCard from "@/features/bookings/components/BookingCard";

interface UserBookingsProps {
  profile: Profile;
}

export default function UserBookings({ profile }: UserBookingsProps) {
  const { bookings, isLoading, error } = useUserBookings(profile.name);

  return (
    <section className="bg-bg-card mt-12 rounded-sm">
      <div className="flex flex-col gap-4 bg-bg-card px-6 py-8">
        <h2 className="text-center font-serif text-2xl font-semibold tracking-tight text-navy-800">
          My Bookings
        </h2>

        {isLoading && (
          <p className="text-grey-900 text-center text-base">Loading…</p>
        )}

        {error && (
          <p role="alert" className="text-center text-base text-destructive">
            {error}
          </p>
        )}

        {!isLoading && !error && bookings.length === 0 && (
          <p className="text-grey-900 text-center text-base">
            You have no bookings
          </p>
        )}

        {bookings.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
