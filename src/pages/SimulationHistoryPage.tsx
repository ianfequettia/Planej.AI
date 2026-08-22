import { ArrowRight, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import type { SimulationRecord } from '@/data/simulation'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'

export function SimulationHistoryPage() {
  const { getSimulations, removeSimulation } = useSimulationStorage()
  const [history, setHistory] = useState<SimulationRecord[]>(getSimulations)

  const handleDelete = (id: string) => {
    if (!window.confirm('Deseja excluir esta simulação?')) {
      return
    }

    removeSimulation(id)
    setHistory((currentHistory) =>
      currentHistory.filter((simulation) => simulation.id !== id),
    )
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">Histórico de Simulações</h1>

      <p className="text-muted-foreground mb-6">
        Consulte suas análises financeiras anteriores.
      </p>

      {history.length === 0 ? (
        <div className="rounded-xl border p-6 text-center">
          <p>Nenhuma simulação encontrada.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-card flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm"
            >
              <div>
                <h2 className="font-semibold">{item.goalName}</h2>

                <p className="mt-2 text-sm">
                  Renda: <strong>R$ {item.income}</strong>
                </p>

                <p className="text-sm">
                  Gastos: <strong>R$ {item.expenses}</strong>
                </p>

                <p className="text-muted-foreground mt-2 text-xs">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString('pt-BR')
                    : 'Data não disponível'}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={`/resultado/${item.id}`}
                  className="bg-secondary-button text-foreground border-border inline-flex items-center gap-2 rounded-3xl border px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                >
                  <ArrowRight size={16} />
                  <span className="hidden sm:inline">Mais detalhes</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-foreground hover:bg-destructive/10 hover:text-destructive rounded-lg p-2 transition-colors"
                  aria-label={`Excluir simulação ${item.goalName}`}
                  title="Excluir simulação"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
