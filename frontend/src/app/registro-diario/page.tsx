"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Droplets, Moon, Dumbbell, Utensils, Plus, Trash2, Save, ArrowLeft } from "lucide-react"
import styles from "../../styles/pages/registro-diario.module.scss"

interface WorkoutSet {
  nome_exercicio: string
  repeticoes: number
  carga: number
}

interface Workout {
  titulo: string
  sets: WorkoutSet[]
}

interface MealItem {
  nome_alimento: string
  quantidade: string
}

interface Meal {
  tipo_refeicao: string
  items: MealItem[]
}

interface DailyLogData {
  data: string
  agua_consumida: number
  horas_sono: number
  workouts: Workout[]
  meals: Meal[]
}

export default function RegistroDiarioPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [dailyLog, setDailyLog] = useState<DailyLogData>({
    data: new Date().toISOString().split("T")[0],
    agua_consumida: 0,
    horas_sono: 0,
    workouts: [],
    meals: [],
  })

  // Funções para Treinos
  const addWorkout = () => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: [...prev.workouts, { titulo: "", sets: [] }],
    }))
  }

  const removeWorkout = (index: number) => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((_, i) => i !== index),
    }))
  }

  const updateWorkout = (index: number, field: string, value: string) => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, i) => (i === index ? { ...workout, [field]: value } : workout)),
    }))
  }

  const addWorkoutSet = (workoutIndex: number) => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, i) =>
        i === workoutIndex
          ? { ...workout, sets: [...workout.sets, { nome_exercicio: "", repeticoes: 0, carga: 0 }] }
          : workout,
      ),
    }))
  }

  const removeWorkoutSet = (workoutIndex: number, setIndex: number) => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, i) =>
        i === workoutIndex ? { ...workout, sets: workout.sets.filter((_, si) => si !== setIndex) } : workout,
      ),
    }))
  }

  const updateWorkoutSet = (workoutIndex: number, setIndex: number, field: string, value: string | number) => {
    setDailyLog((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, i) =>
        i === workoutIndex
          ? {
              ...workout,
              sets: workout.sets.map((set, si) => (si === setIndex ? { ...set, [field]: value } : set)),
            }
          : workout,
      ),
    }))
  }

  // Funções para Refeições
  const addMeal = () => {
    setDailyLog((prev) => ({
      ...prev,
      meals: [...prev.meals, { tipo_refeicao: "", items: [] }],
    }))
  }

  const removeMeal = (index: number) => {
    setDailyLog((prev) => ({
      ...prev,
      meals: prev.meals.filter((_, i) => i !== index),
    }))
  }

  const updateMeal = (index: number, field: string, value: string) => {
    setDailyLog((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) => (i === index ? { ...meal, [field]: value } : meal)),
    }))
  }

  const addMealItem = (mealIndex: number) => {
    setDailyLog((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) =>
        i === mealIndex ? { ...meal, items: [...meal.items, { nome_alimento: "", quantidade: "" }] } : meal,
      ),
    }))
  }

  const removeMealItem = (mealIndex: number, itemIndex: number) => {
    setDailyLog((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) =>
        i === mealIndex ? { ...meal, items: meal.items.filter((_, ii) => ii !== itemIndex) } : meal,
      ),
    }))
  }

  const updateMealItem = (mealIndex: number, itemIndex: number, field: string, value: string) => {
    setDailyLog((prev) => ({
      ...prev,
      meals: prev.meals.map((meal, i) =>
        i === mealIndex
          ? {
              ...meal,
              items: meal.items.map((item, ii) => (ii === itemIndex ? { ...item, [field]: value } : item)),
            }
          : meal,
      ),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Aqui você faria a chamada para sua API
      console.log("Dados para salvar:", dailyLog)

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Registro salvo com sucesso!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao salvar:", error)
      alert("Erro ao salvar registro")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={() => router.push("/dashboard")}>
          <ArrowLeft className={styles.icon} />
          Voltar
        </button>
        <h1 className={styles.title}>Registro Diário</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Informações Básicas */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Calendar className={styles.icon} />
              Informações Básicas
            </h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="data">Data</label>
                <input
                  type="date"
                  id="data"
                  value={dailyLog.data}
                  onChange={(e) => setDailyLog((prev) => ({ ...prev, data: e.target.value }))}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="agua">
                  <Droplets className={styles.iconSmall} />
                  Água Consumida (L)
                </label>
                <input
                  type="number"
                  id="agua"
                  step="0.1"
                  min="0"
                  value={dailyLog.agua_consumida}
                  onChange={(e) => setDailyLog((prev) => ({ ...prev, agua_consumida: Number(e.target.value) }))}
                  className={styles.input}
                  placeholder="Ex: 2.5"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="sono">
                  <Moon className={styles.iconSmall} />
                  Horas de Sono
                </label>
                <input
                  type="number"
                  id="sono"
                  step="0.5"
                  min="0"
                  max="24"
                  value={dailyLog.horas_sono}
                  onChange={(e) => setDailyLog((prev) => ({ ...prev, horas_sono: Number(e.target.value) }))}
                  className={styles.input}
                  placeholder="Ex: 8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Treinos */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Dumbbell className={styles.icon} />
              Treinos
            </h2>
            <button type="button" className={styles.addButton} onClick={addWorkout}>
              <Plus className={styles.iconSmall} />
              Adicionar Treino
            </button>
          </div>
          <div className={styles.cardContent}>
            {dailyLog.workouts.map((workout, workoutIndex) => (
              <div key={workoutIndex} className={styles.workoutItem}>
                <div className={styles.workoutHeader}>
                  <input
                    type="text"
                    value={workout.titulo}
                    onChange={(e) => updateWorkout(workoutIndex, "titulo", e.target.value)}
                    className={styles.input}
                    placeholder="Nome do treino (ex: Treino de Peito)"
                    required
                  />
                  <button type="button" className={styles.removeButton} onClick={() => removeWorkout(workoutIndex)}>
                    <Trash2 className={styles.iconSmall} />
                  </button>
                </div>

                <div className={styles.setsContainer}>
                  <div className={styles.setsHeader}>
                    <span>Exercícios</span>
                    <button type="button" className={styles.addSetButton} onClick={() => addWorkoutSet(workoutIndex)}>
                      <Plus className={styles.iconSmall} />
                      Adicionar Exercício
                    </button>
                  </div>

                  {workout.sets.map((set, setIndex) => (
                    <div key={setIndex} className={styles.setItem}>
                      <input
                        type="text"
                        value={set.nome_exercicio}
                        onChange={(e) => updateWorkoutSet(workoutIndex, setIndex, "nome_exercicio", e.target.value)}
                        className={styles.input}
                        placeholder="Nome do exercício"
                        required
                      />
                      <input
                        type="number"
                        value={set.repeticoes}
                        onChange={(e) => updateWorkoutSet(workoutIndex, setIndex, "repeticoes", Number(e.target.value))}
                        className={styles.inputSmall}
                        placeholder="Reps"
                        min="1"
                        required
                      />
                      <input
                        type="number"
                        value={set.carga}
                        onChange={(e) => updateWorkoutSet(workoutIndex, setIndex, "carga", Number(e.target.value))}
                        className={styles.inputSmall}
                        placeholder="Carga (kg)"
                        step="0.5"
                        min="0"
                      />
                      <button
                        type="button"
                        className={styles.removeSetButton}
                        onClick={() => removeWorkoutSet(workoutIndex, setIndex)}
                      >
                        <Trash2 className={styles.iconSmall} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refeições */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Utensils className={styles.icon} />
              Refeições
            </h2>
            <button type="button" className={styles.addButton} onClick={addMeal}>
              <Plus className={styles.iconSmall} />
              Adicionar Refeição
            </button>
          </div>
          <div className={styles.cardContent}>
            {dailyLog.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className={styles.mealItem}>
                <div className={styles.mealHeader}>
                  <select
                    value={meal.tipo_refeicao}
                    onChange={(e) => updateMeal(mealIndex, "tipo_refeicao", e.target.value)}
                    className={styles.select}
                    required
                  >
                    <option value="">Selecione o tipo de refeição</option>
                    <option value="Café da manhã">Café da manhã</option>
                    <option value="Lanche da manhã">Lanche da manhã</option>
                    <option value="Almoço">Almoço</option>
                    <option value="Lanche da tarde">Lanche da tarde</option>
                    <option value="Jantar">Jantar</option>
                    <option value="Ceia">Ceia</option>
                  </select>
                  <button type="button" className={styles.removeButton} onClick={() => removeMeal(mealIndex)}>
                    <Trash2 className={styles.iconSmall} />
                  </button>
                </div>

                <div className={styles.itemsContainer}>
                  <div className={styles.itemsHeader}>
                    <span>Alimentos</span>
                    <button type="button" className={styles.addSetButton} onClick={() => addMealItem(mealIndex)}>
                      <Plus className={styles.iconSmall} />
                      Adicionar Alimento
                    </button>
                  </div>

                  {meal.items.map((item, itemIndex) => (
                    <div key={itemIndex} className={styles.itemRow}>
                      <input
                        type="text"
                        value={item.nome_alimento}
                        onChange={(e) => updateMealItem(mealIndex, itemIndex, "nome_alimento", e.target.value)}
                        className={styles.input}
                        placeholder="Nome do alimento"
                        required
                      />
                      <input
                        type="text"
                        value={item.quantidade}
                        onChange={(e) => updateMealItem(mealIndex, itemIndex, "quantidade", e.target.value)}
                        className={styles.inputMedium}
                        placeholder="Quantidade (ex: 100g, 1 xícara)"
                        required
                      />
                      <button
                        type="button"
                        className={styles.removeSetButton}
                        onClick={() => removeMealItem(mealIndex, itemIndex)}
                      >
                        <Trash2 className={styles.iconSmall} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botão de Salvar */}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton} disabled={loading}>
            <Save className={styles.icon} />
            {loading ? "Salvando..." : "Salvar Registro"}
          </button>
        </div>
      </form>
    </main>
  )
}
