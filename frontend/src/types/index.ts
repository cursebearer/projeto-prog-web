export interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

export interface DailyLog {
  id?: number;
  user_id: number;
  data: string;
  agua_consumida: number;
  horas_sono: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Workout {
  id?: number;
  daily_log_id: number;
  titulo: string;
  createdAt?: string;
  updatedAt?: string;
  workout_sets?: WorkoutSet[];
}

export interface WorkoutSet {
  id?: number;
  workout_id: number;
  nome_exercicio: string;
  repeticoes: number;
  carga: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Meal {
  id?: number;
  daily_log_id: number;
  tipo_refeicao: string;
  createdAt?: string;
  updatedAt?: string;
  meal_items?: MealItem[];
}

export interface MealItem {
  id?: number;
  meal_id: number;
  nome_alimento: string;
  quantidade: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
}