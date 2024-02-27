import { twMerge } from 'tailwind-merge'

type Props = {
  label: string
  name: string
  radioItems: { label: string; value: string }[] | string[]
}

export function RadioGroup(props: Props) {
  const { label, radioItems, name } = props

  function getItemInfo(item: (typeof radioItems)[0]) {
    if (typeof item === 'string') {
      return {
        label: item,
        value: item,
      }
    }

    return item
  }

  return (
    <fieldset>
      <legend>{label}</legend>

      <section className='flex'>
        {radioItems.map((item, i) => (
          <label key={i} className='flex items-center gap-x-1 px-1.5'>
            <input
              type='radio'
              name={name}
              value={getItemInfo(item).value}
              className='accent-foreground-900'
              required
            />
            <span>{getItemInfo(item).label}</span>
          </label>
        ))}
      </section>
    </fieldset>
  )
}

export function RadioItem(
  props: React.ComponentProps<'label'> & {
    input?: React.ComponentProps<'input'>
  },
) {
  return (
    <label {...props} className={twMerge('flex items-center gap-x-1 px-1.5', props.className)}>
      <input
        type='radio'
        required
        {...props.input}
        className={twMerge('hidden', props.input?.className)}
      />
      {props.children}
      {/* <span>{getItemInfo(item).label}</span> */}
    </label>
  )
}
