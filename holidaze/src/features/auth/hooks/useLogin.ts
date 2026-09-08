import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import type { LoginFormValues } from "../types/auth.types";
import { loginWithProfile } from "../api/auth";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();

    async function handleLogin(values: LoginFormValues): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginWithProfile(values);
      login(user);
      return true;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Something went wrong, try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }


  return { handleLogin, isLoading, error };
}