'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dailyLogApi } from '@/api/dailyLog'
import { workoutApi } from '@/api/workout'
import { mealApi } from '@/api/meal'
import { jwtDecode } from 'jwt-decode';
import styles from '../../styles/pages/dashboard.module.scss'

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [workouts, setWorkouts] = useState<any[]>([])
  const [meals, setMeals] = useState<any[]>([])
  const router = useRouter()

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      const userId = decodedToken.id;

      const dailyLogs = await dailyLogApi.getByUserId(userId); 
      const workoutsData = await workoutApi.getByUserId(userId);
      const mealsData = await mealApi.getByUserId(userId);

      console.log('Daily Logs:', dailyLogs);

      const summaryData = {
        treinosRealizados: workoutsData.length,
        mediaAgua: (dailyLogs.reduce((acc: number, log: any) => acc + parseFloat(log.agua_consumida), 0) / dailyLogs.length || 0).toFixed(1),
        mediaSono: (dailyLogs.reduce((acc: number, log: any) => acc + parseFloat(log.horas_sono), 0) / dailyLogs.length || 0).toFixed(1),
        refeicoesRegistradas: mealsData.length,
      };

      setSummary(summaryData);
      setWorkouts(workoutsData.slice(0, 3));
      setMeals(mealsData.slice(-3).reverse());
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  return (
    <main className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.grid}>
        {/* Resumo da Semana */}
        <div className={styles.card}>
          <h2>Resumo da Semana</h2>
          {summary ? (
            <ul>
              <li>Treinos realizados: {summary.treinosRealizados}</li>
              <li>Média de água: {summary.mediaAgua} L/dia</li>
              <li>Média de sono: {summary.mediaSono} h/dia</li>
              <li>Refeições registradas: {summary.refeicoesRegistradas}</li>
            </ul>
          ) : (
            <p>Carregando...</p>
          )}
        </div>

        {/* Metas */}
        <div className={styles.card}>
          <h2>Metas</h2>
          <ul>
            <li>Água (2L/dia): 80%</li>
            <li>Sono (8h/dia): 95%</li>
            <li>Treinos (5/semana): 100%</li>
          </ul>
        </div>

        {/* Ações Rápidas */}
        <div className={styles.card}>
          <h2>Ações Rápidas</h2>
          <button className={styles.primaryButton}>Novo Registro</button>
          <button className={styles.secondaryButton}>Ver Registros</button>
          <button className={styles.secondaryButton}>Exportar Relatório</button>
        </div>

        {/* Últimos Treinos */}
        <div className={styles.card}>
          <h2>Últimos Treinos</h2>
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div key={workout.id} className={styles.item}>
                <h3>{workout.titulo}</h3>
                <p>{workout.workout_sets?.length || 0} exercícios • {workout.workout_sets?.reduce((acc: number, set: any) => acc + set.repeticoes, 0)} séries</p>
                <p>{formatDate(workout.createdAt)}</p>
              </div>
            ))
          ) : (
            <p>Carregando...</p>
          )}
        </div>

        {/* Últimas Refeições */}
        <div className={styles.card}>
          <h2>Últimas Refeições</h2>
          {meals.length > 0 ? (
            meals.map((meal) => (
              <div key={meal.id} className={styles.item}>
                <h3>{meal.tipo_refeicao}</h3>
                <p>{meal.meal_items?.map((item: any) => item.nome_alimento).join(', ')}</p>
                <p>{formatDate(meal.createdAt)}</p>
              </div>
            ))
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </div>
    </main>
  )
}