import { Button } from "@/components/vendor/button";
import { useState } from "react";
import type { LoginFormValues } from "../types/auth.types";

type LoginErrors = Partial<Record<"email" | "password", string>>;

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

function validate(values: LoginFormValues) {
  const errors: LoginErrors = {};
  if (!values.email) errors.email = "Email is required.";
  else if (!values.email.endsWith("@stud.noroff.no"))
    errors.email = "Email must be a stud.noroff.no address.";
  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 8)
    errors.password = "Password must be at least 8 characters.";
  return errors;
}

export default function LoginForm({
  onSubmit,
  isLoading,
  error,
}: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginErrors]) {
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
      <h1 className="text-center text-navy-900 font-serif text-2xl font-bold tracking-tight">
        Log in to your Holidaze Account
      </h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-4 flex flex-col gap-4 text-navy-800"
      >
        {error && (
          <p role="alert" className="text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : "email-hint"}
            aria-invalid={!!errors.email}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          <p id="email-hint" className="text-xs text-grey-600">
            Please use your stud.noroff.no mail to log in
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
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            placeholder="••••••••••••"
            aria-required="true"
            aria-describedby={errors.password ? "password-error" : undefined}
            aria-invalid={!!errors.password}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
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

        <Button
          type="submit"
          variant="outline"
          className="mt-2 w-full"
          aria-busy={isLoading}
          disabled={isLoading}
          aria-live="polite"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </section>
  );
}
