'use client'

import { twJoin, twMerge } from 'tailwind-merge'

export type SelectProps = {
  options: any[] | undefined
  label?: React.ReactNode
  optionKeyValue?: string
  optionKeyText?: string
  classNames?: {
    label?: string
    select?: string
    option?: string
  }
  state?: {
    selected?: string
    onSelectChange?: (value: string) => void
  }
  stateNumber?: {
    selected?: number
    onSelectChange?: (value: number) => void
  }
}

export function SelectNative(props: React.ComponentProps<'select'> & SelectProps) {
  const {
    options,
    label,
    optionKeyValue = 'id',
    optionKeyText = 'name',
    classNames,
    className,
    state,
    stateNumber,
    ...otherProps
  } = props

  const stringState = 'state' in props ? props.state : undefined
  const numberState = 'stateNumber' in props ? props.stateNumber : undefined

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (stringState) {
      stringState?.onSelectChange?.(e.target.value)
    }

    if (numberState) {
      numberState?.onSelectChange?.(Number(e.target.value))
    }
  }

  // RENDER
  return (
    <div className={twMerge('relative flex', className)}>
      {label && (
        <label
          className={twMerge(
            'pointer-events-none absolute top-1 ml-2.5 text-xs text-foreground-600',
            classNames?.label,
          )}
        >
          {label}
        </label>
      )}
      <select
        required
        className={twMerge(
          'w-full cursor-pointer rounded-sm border-r-4 border-r-transparent bg-neutral-100 pb-1 pl-1.5 text-sm text-secondary-foreground focus:outline-none dark:bg-zinc-700',
          label ? 'pt-6' : 'py-2',
          classNames?.select,
        )}
        value={stringState?.selected ?? numberState?.selected ?? undefined}
        onChange={handleChange}
        {...otherProps}
      >
        <option className='hidden' value=''>
          Selecciona una opción
        </option>
        {options?.map(option => (
          <option
            key={option[optionKeyValue]}
            value={option[optionKeyValue].toString()}
            className={twJoin(classNames?.option)}
          >
            {option[optionKeyText]}
          </option>
        ))}
      </select>
    </div>
  )
}
