"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import LoggedHeader from "@/components/LoggedHeader";
import { dailyLogApi } from "@/api/dailylog"
import { workoutApi } from "@/api/workout";
import { mealApi } from "@/api/meal";
import { authApi } from "@/api/auth"; // Importe o authApi
import styles from "../../styles/pages/registros.module.scss"

const icons = {
  Calendar: () => (
    <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Search: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Filter: () => (
    <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  Edit: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
    </svg>
  ),
  Delete: () => (
    <svg className={styles.iconSmall} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
}

interface DailyRecord {
  id: number
  date: string
  agua_consumida?: number
  horas_sono?: number
}

export default function DailyRecords() {
  const [user, setUser] = useState<{ nome?: string; email?: string } | null>(null);
  const [records, setRecords] = useState<DailyRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<DailyRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        const decoded: any = jwtDecode(token);
        if (!decoded || !decoded.id) {
          router.push("/login");
          return;
        }
        const userId = decoded.id;

        // BUSCA O USUÁRIO COMPLETO NA API, IGUAL NA DASHBOARD
        const userData = await authApi.getUserById(userId);
        setUser(userData);

        const userRecords = await dailyLogApi.getByUserId(userId);
        const mappedRecords = userRecords.map((rec: any) => ({
          ...rec,
          date: rec.data || rec.date || "",
        }));
        setRecords(mappedRecords);
        setFilteredRecords(mappedRecords);

        const userWorkouts = await workoutApi.getByUserId(userId);
        setWorkouts(userWorkouts);

        const userMeals = await mealApi.getByUserId(userId);
        setMeals(userMeals);

      } catch (err) {
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, [router])

  // Filtro por busca e data
  useEffect(() => {
    let filtered = records
    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          (record.agua_consumida && record.agua_consumida.toString().includes(searchTerm)) ||
          (record.horas_sono && record.horas_sono.toString().includes(searchTerm)),
      )
    }
    if (filterDate) {
      filtered = filtered.filter((record) =>
        record.date && record.date.slice(0, 10) === filterDate
      )
    }
    setFilteredRecords(filtered)
  }, [searchTerm, filterDate, records])

  // Agrupamento e exibição por data do registro
  const getUTCDateKey = (dateStr: string) => dateStr.slice(0, 10)

  const groupedByDate: Record<string, DailyRecord[]> = {}
  filteredRecords.forEach((record) => {
    const dateKey = getUTCDateKey(record.date)
    if (!groupedByDate[dateKey]) groupedByDate[dateKey] = []
    groupedByDate[dateKey].push(record)
  })

  const formatDate = (dateString: string) => {
    // Usa a data UTC para exibir corretamente
    const [year, month, day] = dateString.split("-")
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // força UTC
    })
  }

  const handleEditDay = (date: string, dayRecords: DailyRecord[]) => {
    // Lógica para editar os registros do dia
    console.log("Editar registros do dia:", date, dayRecords)
  }

  const handleDeleteDay = (date: string, dayRecords: DailyRecord[]) => {
    // Lógica para excluir os registros do dia
    console.log("Excluir registros do dia:", date, dayRecords)
  }

  return (
    <>
      <LoggedHeader user={user || undefined} />
      <div className={styles.recordsContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Registros Diários</h1>
            <p className={styles.subtitle}>Gerencie todos os seus registros de água e sono</p>
          </div>
          <button className={styles.primaryButton}>
            <icons.Plus />
            Novo Registro
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <icons.Filter />
              Filtros
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.filtersGrid}>
              <div className={styles.searchContainer}>
                <icons.Search />
                <input
                  type="text"
                  placeholder="Buscar por água ou sono..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className={styles.dateInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.recordsSection}>
          {isLoading ? (
            <div className={styles.emptyState}>Carregando...</div>
          ) : Object.keys(groupedByDate).length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyContent}>
                <icons.Search />
                <h3>Nenhum registro encontrado</h3>
                <p>Tente ajustar os filtros ou adicionar novos registros.</p>
                <button className={styles.primaryButton}>
                  <icons.Plus />
                  Adicionar Primeiro Registro
                </button>
              </div>
            </div>
          ) : (
            Object.entries(groupedByDate).map(([date, dayRecords]) => (
              <div key={date} className={styles.dayGroup}>
                <div className={styles.dayHeader}>
                  <icons.Calendar />
                  <h2 className={styles.dayTitle}>{formatDate(date)}</h2>
                  <div className={styles.dayDivider}></div>
                  <div className={styles.dayActions}>
                    <button
                      className={styles.iconButton}
                      title="Editar registros do dia"
                      onClick={() => handleEditDay(date, dayRecords)}
                    >
                      <icons.Edit />
                    </button>
                    <button
                      className={styles.iconButton}
                      title="Excluir registros do dia"
                      onClick={() => handleDeleteDay(date, dayRecords)}
                    >
                      <icons.Delete />
                    </button>
                  </div>
                </div>

                {/* Caixa Água e Sono */}
                <div className={styles.recordsList}>
                  {dayRecords
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record) => (
                      <div key={record.id} className={styles.recordCard}>
                        <div className={styles.recordContent}>
                          <div className={styles.recordInfo}>
                            <div className={styles.recordDetails}>
                              {record.agua_consumida !== undefined && (
                                <>
                                  <div className={styles.recordHeader}>
                                    <h3 className={styles.recordTitle}>Água Consumida</h3>
                                  </div>
                                  <p className={styles.recordDescription}>
                                    {record.agua_consumida} litros
                                  </p>
                                </>
                              )}
                              {record.horas_sono !== undefined && (
                                <>
                                  <div className={styles.recordHeader}>
                                    <h3 className={styles.recordTitle}>Horas de Sono</h3>
                                  </div>
                                  <p className={styles.recordDescription}>
                                    {record.horas_sono} horas
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Caixa Treinos */}
                <div className={styles.recordsList}>
                  {workouts
                    .filter((w) => dayRecords.some((r) => r.id === w.daily_log_id))
                    .map((workout) => (
                      <div key={workout.id} className={styles.recordCard}>
                        <div className={styles.recordContent}>
                          <div className={styles.recordInfo}>
                            <div className={styles.recordDetails}>
                              <div className={styles.recordHeader}>
                                <h3 className={styles.recordTitle}>Treino</h3>
                              </div>
                              <p className={styles.recordDescription}>
                                {workout.titulo}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Caixa Refeições */}
                <div className={styles.recordsList}>
                  {meals
                    .filter((m) => dayRecords.some((r) => r.id === m.daily_log_id))
                    .map((meal) => (
                      <div key={meal.id} className={styles.recordCard}>
                        <div className={styles.recordContent}>
                          <div className={styles.recordInfo}>
                            <div className={styles.recordDetails}>
                              <div className={styles.recordHeader}>
                                <h3 className={styles.recordTitle}>Refeição</h3>
                              </div>
                              <p className={styles.recordDescription}>
                                {meal.tipo_refeicao}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
