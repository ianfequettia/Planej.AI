import {
  type SimulationFormData,
  type SimulationRecord,
} from '@/data/simulation'

const LOCAL_STORAGE_KEY = 'simulation-data'

export const useSimulationStorage = () => {
  const saveFormData = (formData: SimulationFormData) => {
    const id = crypto.randomUUID()
    const record: SimulationRecord = {
      ...formData,
      id,
      createdAt: new Date().toISOString(),
    }

    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...savedData, record]),
    )

    return id
  }

  const getSimulations = (): SimulationRecord[] => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!storage) {
      return []
    }

    const savedData = JSON.parse(storage) as SimulationRecord[]
    const normalizedData = savedData.map((record) => ({
      ...record,
      createdAt: record.createdAt ?? new Date().toISOString(),
    }))

    if (normalizedData.some((_, index) => !savedData[index].createdAt)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalizedData))
    }

    return normalizedData
  }

  const getFormData = (id: string): SimulationRecord | null => {
    return getSimulations().find((record) => record.id === id) || null
  }

  const updateSimulation = (id: string, updatedData: SimulationRecord) => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storage) {
      return
    }

    const savedData = getSimulations()
    const newData = savedData.map((record) =>
      record.id === id ? updatedData : record,
    )

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData))
  }

  const removeSimulation = (id: string) => {
    const savedData = getSimulations()
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(savedData.filter((record) => record.id !== id)),
    )
  }

  return {
    saveFormData,
    getFormData,
    getSimulations,
    updateSimulation,
    removeSimulation,
  }
}
