// interface RegisterProps {
//     // regsiterAPI data
// }

import type { RegisterForm } from "../types/auth.types";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  return (
    <section className="bg-sky-200 rounded-md p-6 ">
      <h1 className="font-serif text-2xl font-bold tracking-tight text-center text-navy-800">
        {" "}
        Register to Holidaze
      </h1>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            className="block w-full pl-5  py-2 border bg-primary-foreground  border-navy-800
            rounded-sm"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full  bg-primary-foreground  pl-5  py-2 border border-navy-800
            rounded-sm"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="block w-full pl-5  py-2 bg-primary-foreground  border border-navy-800
            rounded-sm"
            id="password"
            type="password"
            autoComplete="password"
            required
            placeholder="••••••••••••"
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$"
            title="Password must be 8-20 characters, contain letters and numbers, and have no special characters"
            aria-describedby="password-error"
          />
        </div>

        <div>
          <label htmlFor="venueManager">Register as Venue Manager?</label>
          <input type="checkbox" id="venueManager" name="venueManager" />
        </div>

        <Button type="submit" variant="outline" className="mt-4 w-full">
          Book now
        </Button>
      </form>
    </section>
  );
}
