import { SetState } from '@/types'
import { Select as BaseSelect, SelectItem } from '@nextui-org/react'
// import { useState } from 'react'

type Props = Omit<React.ComponentProps<typeof BaseSelect>, 'children'> & {
  array: any[]
  objectKey: string
  objectId: string
  selected: any
  setSelected: SetState<any>
}

export function Select(props: Props) {
  const { array, objectKey, objectId, selected, setSelected, ...otherProps } = props

  return (
    <div className='flex w-full max-w-xs flex-col gap-2'>
      <BaseSelect
        variant='bordered'
        placeholder='Select an animal'
        selectedKeys={selected}
        // defaultSelectedKeys={selected}
        className='max-w-xs'
        onSelectionChange={setSelected}
        {...otherProps}
      >
        {array?.map(animal => (
          <SelectItem key={animal[objectId]} value={animal[objectId]}>
            {animal[objectKey]}
          </SelectItem>
        ))}
      </BaseSelect>
    </div>
  )
}
