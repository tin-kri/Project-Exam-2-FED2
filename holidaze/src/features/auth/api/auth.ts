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
