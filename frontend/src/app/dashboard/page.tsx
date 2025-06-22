"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dailyLogApi } from "@/api/dailylog"
import { workoutApi } from "@/api/workout"
import { mealApi } from "@/api/meal"
import { jwtDecode } from "jwt-decode"
import { Activity, Droplets, Moon, Utensils, Dumbbell, FileText, Eye, Download } from "lucide-react"
import styles from "../../styles/pages/dashboard.module.scss"


function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}

function Progress({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`${styles.progressBar} ${className}`}>
      <div className={styles.progressFill} style={{ width: `${value}%` }}></div>
    </div>
  )
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [workouts, setWorkouts] = useState<any[]>([])
  const [meals, setMeals] = useState<any[]>([])
  const router = useRouter()

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const decodedToken: any = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token")
        router.push("/login")
        return
      }

      const userId = decodedToken.id

      const dailyLogs = await dailyLogApi.getByUserId(userId)
      const workoutsData = await workoutApi.getByUserId(userId) // Agora inclui workout_sets
      const mealsData = await mealApi.getByUserId(userId) // Agora inclui meal_items

      const summaryData = {
        treinosRealizados: workoutsData.length,
        mediaAgua:
          (dailyLogs.reduce((acc: number, log: any) => acc + parseFloat(log.agua_consumida), 0) / dailyLogs.length || 0).toFixed(1),
        mediaSono:
          (dailyLogs.reduce((acc: number, log: any) => acc + parseFloat(log.horas_sono), 0) / dailyLogs.length || 0).toFixed(1),
        refeicoesRegistradas: mealsData.length,
      }

      setSummary(summaryData)
      setWorkouts(workoutsData.slice(-3).reverse())
      setMeals(mealsData.slice(-3).reverse())
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <main className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.grid}>
        {/* Resumo da Semana */}
        <Card>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Activity className={styles.icon} />
              Resumo da Semana
            </h2>
          </div>
          <div className={styles.cardContent}>
            {summary ? (
              <div className={styles.summaryList}>
                <div className={styles.summaryItem}>
                  <span>Treinos realizados</span>
                  <span className={styles.value}>{summary.treinosRealizados}</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Média de água</span>
                  <span className={styles.value}>{summary.mediaAgua} L/dia</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Média de sono</span>
                  <span className={styles.value}>{summary.mediaSono} h/dia</span>
                </div>
                <div className={styles.summaryItem}>
                  <span>Refeições registradas</span>
                  <span className={styles.value}>{summary.refeicoesRegistradas}</span>
                </div>
              </div>
            ) : (
              <p className={styles.paragraphMuted}>Carregando...</p>
            )}
          </div>
        </Card>

        {/* Metas */}
        <Card>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Activity className={styles.icon} />
              Metas
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.goalsList}>
              <div className={styles.goalItem}>
                <div className={styles.goalInfo}>
                  <span className={styles.goalLabel}>
                    <Droplets className={styles.iconSmall} />
                    Água (2L/dia)
                  </span>
                  <span className={styles.percentage}>0%</span>
                </div>
                <Progress value={0} />
              </div>

              <div className={styles.goalItem}>
                <div className={styles.goalInfo}>
                  <span className={styles.goalLabel}>
                    <Moon className={styles.iconSmall} />
                    Sono (8h/dia)
                  </span>
                  <span className={styles.percentage}>0%</span>
                </div>
                <Progress value={0} />
              </div>

              <div className={styles.goalItem}>
                <div className={styles.goalInfo}>
                  <span className={styles.goalLabel}>
                    <Dumbbell className={styles.iconSmall} />
                    Treinos (5/semana)
                  </span>
                  <span className={styles.percentage}>10%</span>
                </div>
                <Progress value={10} />
              </div>
            </div>
          </div>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <FileText className={styles.icon} />
              Ações Rápidas
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.actionsContainer}>
              <button className={styles.primaryButton} onClick={() => router.push("/registro-diario")}>Novo Registro</button>
              <button className={styles.secondaryButton}>
                <Eye className={styles.iconSmall} />
                Ver Registros
              </button>
              <button className={styles.secondaryButton}>
                <Download className={styles.iconSmall} />
                Exportar Relatório
              </button>
            </div>
          </div>
        </Card>

        {/* Últimos Treinos */}
        <Card className={styles.workoutsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Dumbbell className={styles.icon} />
              Últimos Treinos
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.itemsList}>
              {workouts.length > 0 ? (
                workouts.map((workout) => (
                  <div key={workout.id} className={styles.item}>
                    <div className={styles.itemHeader}>
                      <h3>{workout.titulo}</h3>
                      <span className={styles.date}>{formatDate(workout.createdAt)}</span>
                    </div>
                    <p className={styles.itemDescription}>
                      {workout.workout_sets?.length || 0} exercícios •{" "}
                      {workout.workout_sets?.reduce((acc: number, set: any) => acc + set.repeticoes, 0)} séries
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles.paragraphMuted}>Carregando...</p>
              )}
            </div>
          </div>
        </Card>

        {/* Últimas Refeições */}
        <Card className={styles.mealsCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Utensils className={styles.icon} />
              Últimas Refeições
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.itemsList}>
              {meals.length > 0 ? (
                meals.map((meal) => (
                  <div key={meal.id} className={styles.item}>
                    <div className={styles.itemHeader}>
                      <h3>{meal.tipo_refeicao}</h3>
                      <span className={styles.date}>{formatDate(meal.createdAt)}</span>
                    </div>
                    <p className={styles.itemDescription}>
                      {meal.meal_items?.map((item: any) => `${item.nome_alimento} (${item.quantidade})`).join(", ") || "Sem itens registrados"}
                    </p>
                  </div>
                ))
              ) : (
                <p className={styles.paragraphMuted}>Carregando...</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
