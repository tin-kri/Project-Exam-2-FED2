import { apiFetch } from "@/api/base";
import type { AuthRegisterValues, AuthResponse, LoginFormValues } from "../types/auth.types";

export function registerUser(register: AuthRegisterValues): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: register.name,
      email: register.email,
      password: register.password,
      venueManager: register.venueManager,
    }),
  });
}

export function loginUser(values: LoginFormValues): Promise<AuthResponse> {
 return apiFetch<AuthResponse>("auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });
}
