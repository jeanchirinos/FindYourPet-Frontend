import { useRef, useState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
  initialValue: string | null
}

export function useAutoInput(props: Props) {
  const initialValue = props.initialValue ?? ''

  // HOOKS
  const { pending } = useFormStatus()

  // STATES
  const [currentValue, setCurrentValue] = useState(initialValue)
  const [inputIsEditable, setInputIsEditable] = useState(false)

  // VALUES
  const inputRef = useRef<HTMLInputElement>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const submittingRef = useRef(pending)
  const isDisabled = initialValue === currentValue || pending

  // EFFECTS
  useEffect(() => {
    submittingRef.current = pending

    if (!pending) {
      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }
  }, [pending, initialValue])

  useEffect(() => {
    setCurrentValue(initialValue)
  }, [initialValue])

  // FUNCTIONS
  function handleBlur() {
    setTimeout(() => {
      if (submittingRef.current) return
      if (document.activeElement === submitButtonRef.current) return

      setInputIsEditable(false)
      setCurrentValue(initialValue)
    }, 100)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setInputIsEditable(false)
      setCurrentValue(initialValue)
      inputRef.current?.blur()
    }
  }

  return {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    handleBlur,
    handleKeyDown,
    isDisabled,
    pending,
  }
}
