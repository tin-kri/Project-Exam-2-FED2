import { useState } from "react";
import { registerUser } from "../api/auth";
import type { AuthRegisterValues } from "../types/auth.types";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(values: AuthRegisterValues): Promise<boolean> {
    setIsLoading(true);
    setError(null);
    try {
     const response = await registerUser(values)
console.log("Register response:", response);
      return true; 
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "something went wrong, try again!");
      return false; 
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading, error };
}