import { API_BASE_URL } from "@/lib/config";

export async function fetchWithAuth(input: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include", 
  };

  let response = await fetch(`${API_BASE_URL}${input}`, fetchOptions);

  if (response.status === 401) {
    await fetch(`${API_BASE_URL}/api/v1/auth/token/refresh/`, {
      method: "POST",
      credentials: "include",
    });
    response = await fetch(`${API_BASE_URL}${input}`, fetchOptions);
  }

  return response;

}
