import { useAuthStore } from "@/features/auth/stores/authStore";

const API_BASE = "https://v2.api.noroff.dev/";
const HOLIDAZE_BASE = "https://v2.api.noroff.dev/holidaze/";
const API_KEY = import.meta.env.VITE_API_KEY;

//header function for all requests
function buildHeaders(options: RequestInit): HeadersInit {
  const token = useAuthStore.getState().user?.accessToken;
  return {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
}

export async function baseFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: buildHeaders(options),
  });
  return handleResponse<T>(response)}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    useAuthStore.getState().logout();
    throw new Error("Your session expired. Please log in again.");
  }
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.errors?.[0]?.message ?? response.statusText;
    throw new Error(`API error ${response.status}: ${message}`);
  }
  return response.json() as Promise<T>;
}

export async function holidazeFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${HOLIDAZE_BASE}${endpoint}`, {
    ...options,
    headers: buildHeaders(options),
  });

  return handleResponse<T>(response);
}
