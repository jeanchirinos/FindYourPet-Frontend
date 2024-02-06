import { SetState } from '@/types'

type Props = React.ComponentProps<'input'> & { setValidationCode: SetState<string[]> }

export function CodeInput(props: Props) {
  const { setValidationCode: setValidationCodes, ...otherProps } = props

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value

    if (value.length > 1) return

    const form = document.getElementById('form_codes') as HTMLFormElement
    const inputs = Array.from(form.getElementsByTagName('input'))

    const currInputIndex = inputs.indexOf(e.currentTarget)

    setValidationCodes(prev => {
      const newValidationCode = [...prev]
      newValidationCode[currInputIndex] = e.target.value
      return newValidationCode
    })

    if (!value) return

    const input = inputs[currInputIndex + 1]
    input?.focus()
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!e.currentTarget.value && e.key === 'Backspace') {
      const form = document.getElementById('form_codes')
      if (!form) return

      const inputs = Array.from(form.getElementsByTagName('input'))
      const currInputIndex = inputs.indexOf(e.currentTarget)
      const input = inputs[currInputIndex - 1]

      input?.focus()
    }
  }

  // RENDER
  return (
    <input
      {...otherProps}
      className='size-10 rounded-full bg-foreground-200 text-center'
      onChange={handleChange}
      onKeyDown={handleKeydown}
      type='number'
      min={0}
      max={9}
      maxLength={1}
    />
  )
}
