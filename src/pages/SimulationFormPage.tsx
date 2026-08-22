import { useState } from 'react'

import { SimulationForm } from '@/components/features/Simulation/Form'
import { SimulationHero } from '@/components/features/Simulation/Hero'
import { AIInsightsCard } from '@/components/features/SimulationResults/AIInsightCardProps'

export function SimulationFormPage() {
  const [simulationId, setSimulationId] = useState<string | null>(null)

  if (simulationId) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <SimulationHero />
        <AIInsightsCard simulationId={simulationId} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero />
      <SimulationForm onComplete={setSimulationId} />
    </main>
  )
}
