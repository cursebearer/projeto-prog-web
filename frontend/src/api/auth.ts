import { AuthResponse, LoginCredentials, RegisterData } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await fetchWithAuth("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    localStorage.setItem("token", response.token);
    return response;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await fetchWithAuth("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    localStorage.setItem("token", response.token);
    return response;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};