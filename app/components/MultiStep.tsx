import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import {
  Children,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  // useEffect,
  // useRef,
} from 'react'
import { twMerge } from 'tailwind-merge'
import type { UseModal } from './Modal'

function useMultiStepHook() {
  const [currentStep, setCurrentStep] = useState(1)

  const prevStep = () => setCurrentStep(currentStep - 1)
  const nextStep = () => setCurrentStep(currentStep + 1)

  return { currentStep, setCurrentStep, prevStep, nextStep }
}

type UseMultiStep = ReturnType<typeof useMultiStepHook>

// export function useAutoFocus<T>() {
//   const inputRef = useRef<T>(null)

//   useEffect(() => {
//     if (inputRef.current) {
//       setTimeout(() => {
//         const current = inputRef.current as HTMLInputElement
//         current?.focus()
//       }, 500)
//     }
//   }, [])

//   return inputRef
// }

// interface IMultiStepComponent extends PropsWithChildren {
//   className?: string
// }

export function MultiStepComponent(props: React.ComponentProps<'div'>) {
  const { children, className } = props
  const { currentStep } = useMultiStep()

  const duration = 0.5

  const stepTransition: AnimationProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration,
    },
  }

  return (
    <div className={twMerge('h-full max-w-full', className, 'overflow-x-hidden')}>
      <div
        className='flex h-full transition-transform child:w-full child:shrink-0'
        style={{
          transitionDuration: `${duration}s`,
          transform: `translate3d(${(currentStep - 1) * -100}%, 0, 0)`,
        }}
      >
        {Children.map(children, (child, i) => (
          <Step step={i + 1} stepTransition={stepTransition}>
            {child}
          </Step>
        ))}
      </div>
    </div>
  )
}

interface IStep extends PropsWithChildren {
  step: number
  stepTransition: AnimationProps
}

function Step(props: IStep) {
  const { step, children, stepTransition } = props
  const { currentStep } = useMultiStep()

  const initial = step !== 1

  return (
    <div>
      <AnimatePresence initial={initial}>
        {step === currentStep && (
          <motion.div {...stepTransition} className='h-full'>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ICtxProps extends Pick<UseModal, 'close'>, UseMultiStep {}

const CtxMultiStep = createContext({} as ICtxProps)

// CONTEXT
interface IMultiStep extends PropsWithChildren {
  modal: UseModal
  className?: string
}

export function MultiStep(props: IMultiStep) {
  const { children, modal, className = '' } = props
  const { close } = modal

  const multiStep = useMultiStepHook()

  return (
    <CtxMultiStep.Provider value={{ close, ...multiStep }}>
      <MultiStepComponent className={className}>{children}</MultiStepComponent>
    </CtxMultiStep.Provider>
  )
}

export function MultiStepProvider(props: IMultiStep) {
  const { children, modal } = props
  const { close } = modal

  const multiStep = useMultiStepHook()

  return <CtxMultiStep.Provider value={{ close, ...multiStep }}>{children}</CtxMultiStep.Provider>
}

export const useMultiStep = () => useContext(CtxMultiStep)
