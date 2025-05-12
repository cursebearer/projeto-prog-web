import { WorkoutSet } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const workoutSetApi = {
  create: (workoutSet: Omit<WorkoutSet, "id">): Promise<WorkoutSet> =>
    fetchWithAuth("/workoutsets", {
      method: "POST",
      body: JSON.stringify(workoutSet),
    }),

  getAll: (): Promise<WorkoutSet[]> => fetchWithAuth("/workoutsets"),

  getById: (id: number): Promise<WorkoutSet> => fetchWithAuth(`/workoutsets/${id}`),

  update: (id: number, workoutSet: Partial<WorkoutSet>): Promise<WorkoutSet> =>
    fetchWithAuth(`/workoutsets/${id}`, {
      method: "PUT",
      body: JSON.stringify(workoutSet),
    }),

  delete: (id: number): Promise<void> =>
    fetchWithAuth(`/workoutsets/${id}`, {
      method: "DELETE",
    }),
};