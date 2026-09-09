import { Button } from "@/components/vendor/button";
import { useState } from "react";
import type { AuthRegisterValues } from "../types/auth.types";

type RegisterErrors = Partial<Record<"name" | "email" | "password", string>>;

interface RegisterFormProps {
  onSubmit: (values: AuthRegisterValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function validate(values: AuthRegisterValues): RegisterErrors {
  const errors: RegisterErrors = {};
  if (!values.name.trim()) {
    errors.name = "Username is required.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.name)) {
    errors.name =
      "Username can only contain letters, numbers, and underscores. No spaces";
  }
  if (!values.email) errors.email = "Email is required.";
  else if (!values.email.endsWith("@stud.noroff.no"))
    errors.email = "Email must be a stud.noroff.no address.";
  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  return errors;
}

export default function RegisterForm({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) {
  const [values, setValues] = useState<AuthRegisterValues>({
    name: "",
    email: "",
    password: "",
    venueManager: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await onSubmit(values);
  }

  return (
    <section className="rounded-md bg-secondary p-6">
      <h1 className="text-center text-navy-900 font-serif text-2xl font-bold tracking-tight ">
        Create your Holidaze Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 text-navy-800"
        noValidate
      >
        {error && (
          <div
            role="alert"
            className="rounded-sm border border-destructive bg-background px-4 py-3 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Username</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="exampleusername"
            autoComplete="username"
            value={values.name}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : "name-hint"}
            aria-invalid={!!errors.name}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          <p id="name-hint" className="text-xs text-grey-600">
            This will be your unique profile name. Letters, numbers, underscores
            only and no spaces
          </p>
          {errors.name && (
            <span
              id="name-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.name}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="examplemail@stud.noroff.no"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            aria-invalid={!!errors.email}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          <p id="email-hint" className="text-xs text-grey-600">
            Email must end with @stud.noroff.no
          </p>
          {errors.email && (
            <span
              id="email-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            aria-required="true"
            aria-describedby={
              errors.password ? "password-error" : "password-hint"
            }
            aria-invalid={!!errors.password}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          <p id="password-hint" className="text-xs text-grey-600">
            At least 8 characters
          </p>
          {errors.password && (
            <span
              id="password-error"
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.password}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 mt-6">
            <input
              id="venueManager"
              name="venueManager"
              type="checkbox"
              checked={values.venueManager}
              onChange={handleChange}
              aria-describedby="venueManager-hint"
            />
            <label htmlFor="venueManager">Register as Venue Manager?</label>
          </div>
          <p id="venueManager-hint" className="text-xs text-grey-600">
            Venue managers can list and manage their own venues.
          </p>
        </div>
        <Button
          type="submit"
          variant="outline"
          className="mt-2 w-full"
          disabled={isLoading}
          aria-busy={isLoading}
          aria-live="polite"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </section>
  );
}
