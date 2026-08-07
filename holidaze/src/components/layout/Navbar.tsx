import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/stores/authStore";

const leftLinks = [
  { to: "/venues", label: "Venues" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
 const user = useAuthStore((state) => state.user);
const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }
const navLinks = user
  ? [
      { to: "/venues", label: "Venues" },
      { to: "/contact", label: "Contact" },
      { to: "/profile", label: "Profile" },
    ]
  : [
      { to: "/venues", label: "Venues" },
      { to: "/contact", label: "Contact" },
      { to: "/login", label: "Login" },
      { to: "/register", label: "Join" },
    ];

const rightLinks = user
  ? [{ to: "/profile", label: "Profile" }]
  : [
      { to: "/login", label: "Login" },
      { to: "/register", label: "Join" },
    ];



  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center px-4 py-6 md:px-8">
        <Link
          to="/"
          className="rounded-sm font-serif text-2xl font-bold tracking-tight text-navy-800 no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800"
        >
          Holidaze
        </Link>

        {/* left links */}
        <ul className="ml-8 pt-1 hidden list-none gap-6 md:flex">
          {leftLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `rounded-sm text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 ${
                    isActive
                      ? "font-medium  text-navy-800 underline"
                      : "font-normal text-navy-800 no-underline"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* right links */}
        <ul className="ml-auto pt-1 hidden list-none gap-6 md:flex">
          {rightLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                state={to === "/login" ? {from: location} : undefined}
                className={({ isActive }) =>
                  `rounded-sm text-base  underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 ${
                    isActive
                      ? "font-medium text-navy-800 underline"
                      : "font-normal text-navy-800 no-underline"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          {user&& (
            <li>
              <button
              onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-auto flex cursor-pointer flex-col justify-center gap-1.25 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 md:hidden"
        >
          <span className="block h-0.5 w-6 rounded-full bg-navy-800" />
          <span className="block h-0.5 w-6 rounded-full bg-navy-800" />
          <span className="block h-0.5 w-6 rounded-full bg-navy-800" />
        </button>
      </nav>

      {/* dropdown */}
      {menuOpen && (
        <ul className="flex list-none flex-col bg-white py-2 md:hidden">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-sm px-4 py-3 text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-800 ${
                    isActive
                      ? "font-medium text-navy-800 underline"
                      : "font-normal text-grey-900 no-underline"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
