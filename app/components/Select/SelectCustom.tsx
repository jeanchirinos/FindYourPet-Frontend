'use client'

import * as Select from '@radix-ui/react-select'
import { twJoin, twMerge } from 'tailwind-merge'
import { SelectProps, SelectNative } from './SelectNative'
import { useEffect, useState } from 'react'
import { GoChevronDown, GoCheck } from 'react-icons/go'
// import { useMediaQuery } from '@/hooks/useMediaQuery'

type Props = SelectProps & {
  showOnlySelectedIcon?: boolean
  showArrow?: boolean
  placeholder?: string
  type?: 'native-only-mobile' | 'always-custom'
  className?: string
} & React.ComponentProps<typeof Select.Root>

export function SelectCustom(props: Props) {
  const {
    options,
    label,
    className,
    optionKeyValue = 'id',
    optionKeyText = 'name',
    classNames,
    showOnlySelectedIcon,
    defaultValue,
    showArrow = true,
    placeholder = 'Selecciona una opción',
    state,
    stateNumber,
    type = 'native-only-mobile',
    required = true,
    ...otherProps
  } = props

  // HOOKS

  // const isTouchableDevice0 = useMediaQuery('(hover: none) and (max-width: 1023px)')

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()

    userAgent.includes('mobile') ? setIsTouchableDevice(true) : setIsTouchableDevice(false)
  }, [])
  // STATES
  const [auxSelected, setAuxSelected] = useState<string | undefined>(undefined)
  const [isTouchableDevice, setIsTouchableDevice] = useState<undefined | boolean>(undefined)

  // VALUES
  const stringState = 'state' in props ? props.state : undefined
  const numberState = 'stateNumber' in props ? props.stateNumber : undefined

  const myState = stringState ?? numberState
  const itemSelected = options?.find(item => item[optionKeyValue]?.toString() === auxSelected)

  // FUNCTIONS
  function handleChange(value: string) {
    if (stringState ?? numberState) {
      stringState?.onSelectChange?.(value)
      numberState?.onSelectChange?.(Number(value))
    } else {
      setAuxSelected(value)
    }
  }

  // EFFECTS
  // Only use defaultValue if state.selected is undefined
  useEffect(() => {
    if (!defaultValue) return
    if (myState?.selected) return

    setAuxSelected(defaultValue.toString())
  }, [defaultValue, myState?.selected])

  useEffect(() => {
    if (!myState?.selected) return

    setAuxSelected(myState.selected.toString())
  }, [myState?.selected])

  // RENDER

  if (isTouchableDevice === undefined) {
    return null
  }

  if (isTouchableDevice && type === 'native-only-mobile')
    return (
      <SelectNative
        options={options}
        state={{ selected: auxSelected, onSelectChange: setAuxSelected }}
        className={twMerge(className, 'max-w-full')}
      />
    )

  return (
    <Select.Root
      onValueChange={value => handleChange(value)}
      value={auxSelected?.toString()}
      required={required}
      {...otherProps}
    >
      <Select.Trigger
        className={twMerge(
          'placeholder:text-muted-foreground relative flex items-center justify-between gap-x-1.5 rounded-md border border-foreground-100 bg-content2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
          'h-11 w-full min-w-10 max-w-full p-1',
          showOnlySelectedIcon && 'justify-center',
          className,
        )}
      >
        <div className='flex flex-col items-start gap-y-1.5'>
          {label && (
            <label
              className={twMerge(
                'pointer-events-none text-xs text-foreground-600',
                classNames?.label,
              )}
            >
              {label}
            </label>
          )}

          {showOnlySelectedIcon && itemSelected ? (
            <div>{itemSelected.icon}</div>
          ) : (
            <Select.Value placeholder={placeholder} />
          )}
        </div>

        {showArrow && (
          <Select.Icon>
            <GoChevronDown />
          </Select.Icon>
        )}
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position='popper'
          className={twJoin(
            'text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 overflow-hidden rounded-md border border-foreground-100 bg-content2 shadow-md',
            'min-w-28 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          )}
        >
          <Select.Viewport className='h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] px-1.5 py-1'>
            {!required && (
              <SelectItem value='' className={twJoin(classNames?.option)}>
                <div className='flex items-center gap-x-1.5'>
                  <span>{placeholder}</span>
                </div>
              </SelectItem>
            )}

            {options?.map(option => (
              <SelectItem
                key={option[optionKeyValue]}
                value={option[optionKeyValue].toString()}
                className={twJoin(classNames?.option)}
              >
                <div className='flex items-center gap-x-1.5'>
                  <span>{option.icon}</span>
                  <span>{option[optionKeyText]}</span>
                </div>
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

function SelectItem(props: React.PropsWithChildren<React.ComponentProps<typeof Select.Item>>) {
  const { children, className, ...otherProps } = props

  return (
    <Select.Item
      className={twMerge(
        'text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 relative flex h-[25px] select-none items-center gap-x-1.5 rounded-[3px] px-1.5 text-[13px] leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-content3 data-[highlighted]:outline-none',
        className,
      )}
      {...otherProps}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className='inline-flex w-[25px] items-center justify-center'>
        <GoCheck />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
