import { useState } from "react";
import { changeAvatar } from "../api/profile";
import { useAuthStore } from "@/features/auth/stores/authStore";

export default function useChangeAvatar() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleChangeAvatar(url: string, alt?: string): Promise<boolean> {
    if (!user) return false;
    setError(null);
    setIsLoading(true);
    try {
      const response = await changeAvatar(user.name, { url, alt });
      login({ ...user, avatar: response.data.avatar });
      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to Change Avatar");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { handleChangeAvatar, isLoading, error };
}