export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="flex w-full flex-col items-center justify-center space-y-5 px-4  pt-25 text-center">
        <h2 className="text-background">Holidaze</h2>
        <nav className="flex flex-col flex-wrap items-center space-y-4 text-xs font-medium text-muted-foreground sm:flex-row sm:space-x-4 sm:space-y-0">
          <a
            href="#"
            className="text-xs lg:text-sm  text-background hover:text-secondary-light"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-xs lg:text-sm  text-background hover:text-secondary-light"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-xs lg:text-sm  text-background "
          >
            Venues
          </a>
        </nav>

        <p className="text-xs lg:text-sm  text-background radius-radius-lg radius-lg">
          © 2026 Noroff Project Exam
        </p>
      </div>
    </footer>
  );
}
