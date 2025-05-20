import { Workout } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const workoutApi = {
  create: (workout: Omit<Workout, "id">): Promise<Workout> =>
    fetchWithAuth("/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
    }),

  getAll: (): Promise<Workout[]> => fetchWithAuth("/workouts"),

  getByUserId: (userId: number) => fetchWithAuth(`/workouts/user/${userId}`),

  update: (id: number, workout: Partial<Workout>): Promise<Workout> =>
    fetchWithAuth(`/workouts/${id}`, {
      method: "PUT",
      body: JSON.stringify(workout),
    }),

  delete: (id: number): Promise<void> =>
    fetchWithAuth(`/workouts/${id}`, {
      method: "DELETE",
    }),
};