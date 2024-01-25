'use client'

import { SetState } from '@/types'

type Props = React.ComponentProps<'select'> & {
  options: any[] | undefined
  optionKeyText: string
  optionKeyValue: string
  selected?: any
  setSelected?: SetState<any>
  label: string
}

export function Select(props: Props) {
  const { options, optionKeyText, optionKeyValue, selected, setSelected, ...otherProps } = props

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!setSelected) return

    setSelected(e.target.value)
  }

  // RENDER
  return (
    <label className='flex flex-col gap-y-1 rounded-lg bg-default-100 px-2 py-1.5'>
      <span className='pointer-events-none absolute ml-1 text-xs text-foreground-600'>
        {props.label}
      </span>
      <select
        required
        {...otherProps}
        onChange={handleChange}
        value={selected?.toString()}
        className='cursor-pointer bg-default-100 pt-4 text-sm focus:outline-none'
      >
        {options?.map(option => (
          <option key={option[optionKeyValue]} value={option[optionKeyValue].toString()}>
            {option[optionKeyText]}
          </option>
        ))}
      </select>
    </label>
  )
}
