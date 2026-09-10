import { Link } from "react-router-dom";

export default function CreateVenueCTA() {
  return (
    <div className="rounded-lg bg-navy-800 px-6 py-8 text-center">
      <h2 className="font-serif text-xl font-bold text-white">
        Create a New Venue
      </h2>
      <p className="mt-2 text-sm text-white/80">
        Rent out your venue by registering a venue here
      </p>
      <Link
        to="/manage-venues/"
        className="mt-4 inline-block font-semibold text-white underline underline-offset-4 hover:text-sky-300"
      >
        Create a New Venue
      </Link>
    </div>
  );
}
