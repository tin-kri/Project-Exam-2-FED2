import { Link } from "react-router-dom";
export default function LoginRedirect() {
  return (
    <section>
    <p className="mt-6 text-center text-sm text-grey-900">
      Already have an account?{" "}
      <Link
        to="/login"
        className="font-medium text-navy-800 underline underline-offset-4 hover:text-sky-300"
      >
        Log in here
      </Link>
    </p>
    </section>
  );
}
