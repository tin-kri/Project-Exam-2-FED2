import { baseFetch, holidazeFetch } from "@/api/base";
import type {
  AuthRegisterValues,
  AuthResponse,
  LoginFormValues,
  User,
} from "../types/auth.types";
import { useAuthStore } from "../stores/authStore";

export function registerUser(
  register: AuthRegisterValues,
): Promise<AuthResponse> {
  return baseFetch<AuthResponse>("auth/register", {
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
  return baseFetch<AuthResponse>(
    "auth/login",
    {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    },
    { skipSessionHandling: true },
  );
}

/**
 * Logs a user in and returns their full profile.
 *
 * The login endpoint only returns basic auth data (name, email, accessToken),
 * so this makes a second request to fetch profile details (venueManager status,
 * avatar, banner, bio) and merges them into a single User object.
 *
 * Note: the auth store is updated with the login response immediately, before
 * the profile fetch resolves — so there's a brief window where `user` in the
 * store lacks profile fields (venueManager, avatar, etc.) until this promise
 * resolves and the caller updates state again with the full merged result.
 */
export async function loginWithProfile(values: LoginFormValues): Promise<User> {

  const loginResponse = await loginUser(values);
  const userData = loginResponse.data;

  useAuthStore.getState().login(userData);

  const profileResponse = await holidazeFetch<{
    data: {
      venueManager: boolean;
      bio?: string;
      avatar?: { url: string; alt?: string };
      banner?: { url: string; alt?: string };
    };
  }>(`profiles/${userData.name}`);

  const profile = profileResponse.data;

  return {
    ...userData,
    venueManager: profile.venueManager,
    avatar: profile.avatar,
    bio: profile.bio,
    banner: profile.banner,
  };
}
