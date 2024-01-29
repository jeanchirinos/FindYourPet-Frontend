'use client'

import { Select, SelectItem } from '@nextui-org/react'

export function FilterDistrito(props: { distritos: any[] }) {
  return (
    <Select label='Distrito' placeholder='' selectionMode='multiple' className='max-w-sm'>
      {props.distritos.map(item => (
        <SelectItem key={item.id_ubigeo} value={item.id_ubigeo}>
          {item.nombre_ubigeo}
        </SelectItem>
      ))}
    </Select>
  )
}
