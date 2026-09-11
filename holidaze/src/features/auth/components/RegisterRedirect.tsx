import { Link } from "react-router-dom";
export default function RegisterRedirect() {
  return (
    <section>
      <p className="mt-6 text-center text-sm text-grey-900">
        Don't have an account? <br />
        <Link
          to="/register"
          className="font-medium text-navy-800 underline underline-offset-4 hover:text-sky-300"
        >
          Sign up here
        </Link>
      </p>
    </section>
  );
}
