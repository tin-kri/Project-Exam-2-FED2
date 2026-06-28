const API_BASE = "https://v2.api.noroff.dev/holidaze";
const API_KEY = import.meta.env.VITE_API_KEY;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.errors?.[0]?.message ?? response.statusText;
    throw new Error(`API error ${response.status}: ${message}`);
  }

  return response.json() as Promise<T>;
}