const API_BASE = "https://v2.api.noroff.dev/";
const HOLIDAZE_BASE = "https://v2.api.noroff.dev/holidaze/";
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


export async function fetchVenues<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response =  await fetch (`${HOLIDAZE_BASE}${endpoint}`, {
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
 
// export async function fetchBrowseListings() {
//   const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUCTION.LISTINGS}?_active=true&_seller=true&_bids=true`;
//   try {
//     const headers = isLoggedIn()
//       ? getAuthHeaders()
//       : { 'Content-Type': 'application/json' };
//     const response = await fetch(url, { headers });
//     if (!response.ok) {
//       throw new Error('Failed to fetch browse listings');
//     }
//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.error('failed to fetch browse listings', error);
//     throw error;
//   }
// }