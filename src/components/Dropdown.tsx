'use client'
import { Dropdown as NextUiDropdown, DropdownProps } from '@nextui-org/dropdown'
import { useState } from 'react'

export function Dropdown(props: DropdownProps) {
  const [visible, setVisible] = useState(false)

  return (
    <NextUiDropdown
      {...props}
      isOpen={visible}
      onOpenChange={isOpen => {
        setVisible(isOpen)
      }}
      shouldCloseOnInteractOutside={e => {
        setVisible(false)
        return false
      }}
    />
  )
}
