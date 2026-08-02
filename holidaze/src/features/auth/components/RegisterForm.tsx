import { Button } from "@/components/ui/button";
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
  if (!values.name.trim()) errors.name = "Full name is required.";
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
        Register to Holidaze
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 text-navy-800"
        noValidate
      >
        {error && <p className="text-destructive">{error}</p>}

        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          {errors.name && (
            <span className="text-sm text-destructive">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          {errors.email && (
            <span className="text-sm text-destructive">{errors.email}</span>
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
            className="w-full rounded-sm border border-input bg-background px-4 py-2"
          />
          {errors.password && (
            <span className="text-sm text-destructive">{errors.password}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="venueManager"
            name="venueManager"
            type="checkbox"
            checked={values.venueManager}
            onChange={handleChange}
          />
          <label htmlFor="venueManager">Register as Venue Manager?</label>
        </div>

        <Button
          type="submit"
          variant="outline"
          className="mt-2 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </section>
  );
}
