import { twMerge } from 'tailwind-merge'

export function RadioItem(
  props: React.ComponentProps<'label'> & {
    input?: React.ComponentProps<'input'>
  },
) {
  return (
    <label {...props}>
      <input
        type='radio'
        required
        {...props.input}
        className={twMerge('hidden', props.input?.className)}
      />
      {props.children}
    </label>
  )
}
