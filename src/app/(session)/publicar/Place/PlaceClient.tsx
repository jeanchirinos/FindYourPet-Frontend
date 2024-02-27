'use client'

import { useState } from 'react'
import { getPlaces } from '@/controllers/Place'
import { SelectNative } from '@/components/Select/SelectNative'

export function PlaceClient(props: {
  places: Awaited<ReturnType<typeof getPlaces>>
  initialData?: {
    estate: string
    city: string
    district: string
  }
}) {
  const { places, initialData } = props
  const { departamentos, provincias, distritos } = places

  // STATES
  const [selectedDepartamento, setSelectedDepartamento] = useState<undefined | string>(
    initialData?.estate ?? 'D-14',
  )
  const [selectedProvincia, setSelectedProvincia] = useState<undefined | string>(
    initialData?.city ?? 'P-135',
  )

  // VALUES
  const provinciasList = selectedDepartamento
    ? //@ts-ignore
      provincias.filter(item => item.department_code === selectedDepartamento)
    : undefined
  const distritosList = selectedProvincia
    ? //@ts-ignore
      distritos.filter(item => item.province_code === selectedProvincia)
    : undefined

  // RENDER
  return (
    <>
      <SelectNative
        name='estate'
        options={departamentos}
        optionKeyValue='code'
        optionKeyText='name'
        state={{ selected: selectedDepartamento, onSelectChange: setSelectedDepartamento }}
        label='Departamento'
      />
      <SelectNative
        name='city'
        options={provinciasList}
        optionKeyValue='code'
        optionKeyText='name'
        state={{
          selected: selectedProvincia,
          onSelectChange: setSelectedProvincia,
        }}
        label='Provincia'
      />

      <SelectNative
        name='district'
        options={distritosList}
        optionKeyValue='code'
        optionKeyText='name'
        label='Distrito'
        defaultValue={initialData?.district}
      />
    </>
  )
}
