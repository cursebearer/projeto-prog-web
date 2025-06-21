import { DailyLog } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const dailyLogApi = {
  create: async (dailyLog: Omit<DailyLog, "id">): Promise<{ dailyLog: DailyLog }> => {
  const response = await fetchWithAuth("/dailylogs", {
    method: "POST",
    body: JSON.stringify(dailyLog),
  });

  console.log("Retorno da API:", response);
  return response; 
},

  getAll: async (): Promise<{ dailyLogs: DailyLog[] }> => {
    const response = await fetchWithAuth('/dailylogs');
    return response.json();
  },

  getByUserId: (id: number): Promise<DailyLog[]> => fetchWithAuth(`/dailylogs/user/${id}`),

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