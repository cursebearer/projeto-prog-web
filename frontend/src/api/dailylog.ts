import { DailyLog } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const dailyLogApi = {
  create: (dailyLog: Omit<DailyLog, "id">): Promise<DailyLog> =>
    fetchWithAuth("/dailylogs", {
      method: "POST",
      body: JSON.stringify(dailyLog),
    }),

  getAll: (): Promise<DailyLog[]> => fetchWithAuth("/dailylogs"),

  getById: (id: number): Promise<DailyLog> => fetchWithAuth(`/dailylogs/${id}`),

  update: (id: number, dailyLog: Partial<DailyLog>): Promise<DailyLog> =>
    fetchWithAuth(`/dailylogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(dailyLog),
    }),

  delete: (id: number): Promise<void> =>
    fetchWithAuth(`/dailylogs/${id}`, {
      method: "DELETE",
    }),
};