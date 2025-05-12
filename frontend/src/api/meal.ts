import { Meal } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const mealApi = {
  create: (meal: Omit<Meal, "id">): Promise<Meal> =>
    fetchWithAuth("/meals", {
      method: "POST",
      body: JSON.stringify(meal),
    }),

  getAll: (): Promise<Meal[]> => fetchWithAuth("/meals"),

  getById: (id: number): Promise<Meal> => fetchWithAuth(`/meals/${id}`),

  update: (id: number, meal: Partial<Meal>): Promise<Meal> =>
    fetchWithAuth(`/meals/${id}`, {
      method: "PUT",
      body: JSON.stringify(meal),
    }),

  delete: (id: number): Promise<void> =>
    fetchWithAuth(`/meals/${id}`, {
      method: "DELETE",
    }),
};