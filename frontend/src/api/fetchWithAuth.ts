const API_URL = "http://localhost:5000/healthenv";
//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/healthenv";

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Erro na API: ${response.statusText}`);
  }

  return response.json();
}