import { API_BASE_URL } from "@/lib/config";

export async function fetchWithAuth(input: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("access_token");

  const headers = new Headers();

  // Установка стандартного заголовка
  headers.set("Content-Type", "application/json");

  // Добавление авторизации, если токен есть
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  //  Заголовки, если переданы в options
  if (options.headers && typeof options.headers === "object") {
    const customHeaders = new Headers(options.headers);
    customHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  // Первый запрос
  const response = await fetch(`${API_BASE_URL}${input}`, {
    ...options,
    headers,
    credentials: "include",
  });

  // Если access_token устарел обновить
  if (response.status === 401) {
    const refreshResponse = await fetch(`${API_BASE_URL}/api/v1/auth/token/refresh/`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      localStorage.setItem("access_token", data.access);

      // Заголовки с новым токеном
      headers.set("Authorization", `Bearer ${data.access}`);

      const retryResponse = await fetch(`${API_BASE_URL}${input}`, {
        ...options,
        headers,
        credentials: "include",
      });

      return retryResponse;
    }
  }

  return response;
}
