import { MealItem } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const mealItemApi = {
  create: (mealItem: Omit<MealItem, "id">): Promise<MealItem> =>
    fetchWithAuth("/mealitems", {
      method: "POST",
      body: JSON.stringify(mealItem),
    }),

  getAll: (): Promise<MealItem[]> => fetchWithAuth("/mealitems"),

  getById: (id: number): Promise<MealItem> => fetchWithAuth(`/mealitems/${id}`),

  update: (id: number, mealItem: Partial<MealItem>): Promise<MealItem> =>
    fetchWithAuth(`/mealitems/${id}`, {
      method: "PUT",
      body: JSON.stringify(mealItem),
    }),

  delete: (id: number): Promise<void> =>
    fetchWithAuth(`/mealitems/${id}`, {
      method: "DELETE",
    }),

   getByMealId: (mealId: number): Promise<MealItem[]> =>
    fetchWithAuth(`/mealitems/meal/${mealId}`),
};