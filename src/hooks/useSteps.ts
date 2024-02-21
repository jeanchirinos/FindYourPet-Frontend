import { useState } from 'react'

export function useSteps() {
  const [currentStep, setCurrentStep] = useState(1)

  function nextStep() {
    setCurrentStep(prev => prev + 1)
  }

  function prevStep() {
    setCurrentStep(prev => prev - 1)
  }

  function resetSteps() {
    setCurrentStep(1)
  }

  return {
    currentStep,
    resetSteps,
    nextStep,
    prevStep,
  }
}

export type TUseSteps = ReturnType<typeof useSteps>
