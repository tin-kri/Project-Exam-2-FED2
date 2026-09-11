import { NavLink } from "react-router-dom";

export default function Footer() {
  function navLinkClass({ isActive }: { isActive: boolean }) {
    return `rounded-sm text-xs underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-200 ${
      isActive
        ? "font-medium text-background underline"
        : "font-normal text-background"
    }`;
  }
  return (
    <footer className="bg-primary">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-4 pt-16">
        <p className="font-serif text-2xl font-bold tracking-tight text-background">
          Holidaze
        </p>
        <nav
          className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs"
          aria-label="Footer navigation"
        >
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/venues" className={navLinkClass}>
            Venues
          </NavLink>
        </nav>

        <div className="mt-10 w-full border-t border-grey-200 py-4">
          <p className="text-xs text-background lg:text-sm">
            © 2026 Noroff Project Exam
          </p>
        </div>
      </div>
    </footer>
  );
}
