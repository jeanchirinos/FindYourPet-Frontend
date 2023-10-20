import { useState } from 'react'

export function useSteps() {
  const [currentStep, setCurrentStep] = useState(1)

  function nextStep() {
    setCurrentStep(currentStep + 1)
  }

  function prevStep() {
    setCurrentStep(currentStep - 1)
  }

  return {
    currentStep,
    nextStep,
    prevStep,
  }
}
