import { apiFetch } from "@/api/base";
import type { RegisterForm } from "../types/auth.types";

export function registerUser(register: RegisterForm): Promise<Response> {
  return apiFetch<Response>("/register", {
    method: "POST",
    body: JSON.stringify({
      name: register.name,
      email: register.email,
      password: register.password,
      venueManager: register.venueManager,
    }),
  });
}
