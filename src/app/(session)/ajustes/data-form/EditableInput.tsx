import { updateValue } from '@/controllers/User'
import { handleResponse } from '@/utilities/handleResponse'
import { useAutoInput } from './useAutoInput'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'

type Props = {
  initialValue: string | null
  paramName: string
  label: string
}

export function EditableInput(props: Props) {
  const { initialValue, label, paramName } = props

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    const value = formData.get(paramName) as string

    const res = await updateValue({ param: paramName, value })

    handleResponse(res, {
      showSuccessToast: true,
    })
  }

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
    <form action={handleAction} className='group mt-4 flex items-center gap-x-2'>
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
    </form>
  )
}
