'use client'
import { Input as NextUiInput } from '@nextui-org/input'
import { cnx } from '@/lib/utils'
import { useState } from 'react'
import { IconEye, IconEyeSlash } from '@/icons'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { classNames, innerRef, ...componentProps } = props

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const passwordVisibility =
    componentProps.type === 'password'
      ? {
          endContent: (
            <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
              {isVisible ? (
                <IconEyeSlash className='pointer-events-none text-2xl text-default-400' />
              ) : (
                <IconEye className='pointer-events-none text-2xl text-default-400' />
              )}
            </button>
          ),
          type: isVisible ? 'text' : 'password',
        }
      : {}

  return (
    <NextUiInput
      isRequired
      classNames={{
        ...classNames,
        label: cnx('after:hidden !text-foreground-500', classNames?.label),
      }}
      labelPlacement='outside'
      placeholder=' '
      {...componentProps}
      {...passwordVisibility}
      ref={innerRef}
    />
  )
}
