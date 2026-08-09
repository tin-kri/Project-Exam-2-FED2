import { useState, useEffect } from "react";
import { getProfile } from "../api/profile";
import { useAuthStore } from "@/features/auth/stores/authStore";
import type { Profile } from "../types/profile.types";

export default function useProfile() {
  const user = useAuthStore((state) => state.user);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    if (!user) return;
    let active = true;

    async function load() {
        if (!user) return;
      try {
        setIsLoading(true);
        const response = await getProfile(user.name);
        if (active) setProfile(response.data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();
    return () => { active = false; };
  }, [user]);

  return { profile, isLoading, error };
}