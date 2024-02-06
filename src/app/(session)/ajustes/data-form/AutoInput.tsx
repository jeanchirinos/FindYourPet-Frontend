import { SubmitButton } from '@/components/SubmitButton'
import { useAutoInput } from './useAutoInput'
import { Input } from '@/components/Input'

type Props = {
  initialValue: string
  label: string
  paramName: string
  children?: React.ReactNode
}

export function AutoInput(props: Props) {
  const { initialValue, label, paramName } = props

  // HOOKS
  const {
    currentValue,
    setCurrentValue,
    inputIsEditable,
    setInputIsEditable,
    inputRef,
    submitButtonRef,
    handleBlur,
    isDisabled,
    pending,
    handleKeyDown,
  } = useAutoInput({ initialValue })

  // RENDER
  return (
    <>
      <Input
        type='text'
        innerRef={inputRef}
        disabled={pending}
        name={paramName}
        label={label}
        value={currentValue}
        onChange={e => setCurrentValue(e.target.value)}
        onFocus={() => setInputIsEditable(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {inputIsEditable && (
        <SubmitButton
          size='sm'
          isDisabled={isDisabled}
          disabled={isDisabled}
          innerRef={submitButtonRef}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      )}
    </>
  )
}
