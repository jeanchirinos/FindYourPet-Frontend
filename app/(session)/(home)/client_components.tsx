'use client'

import { useEffect, useState } from 'react'
import { Select } from '@/components/Select'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import { getPlaces } from '@/controllers/Place'
import { BreedsData, Category, StatusList } from '@/models/Pet'
import { useRouter, useSearchParams } from 'next/navigation'

export function StatusInfo(props: { statusList: StatusList }) {
  const { statusList } = props

  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(value: string) {
    router.push(`?status=${value}`)
  }

  const defaultValue = searchParams.get('status')

  return (
    <RadioGroup name='status' defaultValue={defaultValue} onChange={handleChange}>
      <div className='flex flex-col gap-y-2'>
        {statusList.map(item => (
          <RadioGroup.Option
            key={item.id}
            value={item.id.toString()}
            className={({ checked }) =>
              twJoin(
                'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md focus:outline-none',
                checked && 'bg-orange-100 text-orange-600',
              )
            }
          >
            <RadioGroup.Label as='p' className='w-max'>
              {item.value}
            </RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}

export function PetInfo(props: { categories: Category[]; breedsData: BreedsData }) {
  const { categories, breedsData } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id.toString())

  // RENDER
  return (
    <>
      <Select
        selected={selectedCategory}
        setSelected={setSelectedCategory}
        array={categories}
        objectKey='name'
        objectId='id'
        placeholder='Especie'
      />
      <Select
        array={breedsData[selectedCategory]}
        objectKey='name'
        objectId='id'
        name='breed_id'
        placeholder='Raza'
      />
    </>
  )
}

export function PlaceInfo(props: { places: Awaited<ReturnType<typeof getPlaces>> }) {
  const { places } = props
  const { departamentos, provincias, distritos } = places

  // Departamento
  const [selectedDepartamento, setSelectedDepartamento] = useState(departamentos[0].id_ubigeo)

  // Provincia
  const provinciasArray = provincias[selectedDepartamento]

  const [selectedProvincia, setSelectedProvincia] = useState(provinciasArray[0].id_ubigeo)

  useEffect(() => {
    const provinciaId = provinciasArray[0].id_ubigeo

    setSelectedProvincia(provinciaId)
  }, [selectedDepartamento, provinciasArray])

  // Distrito
  const distritosArray = distritos[selectedProvincia]

  // RENDER
  return (
    <>
      <Select
        name='estate'
        array={departamentos}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
        setSelected={setSelectedDepartamento}
        placeholder='Departamento'
      />
      <Select
        name='city'
        array={provinciasArray}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
        setSelected={setSelectedProvincia}
        placeholder='Provincia'
      />

      <Select
        name='district'
        array={distritosArray}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
        placeholder='Distrito'
      />
    </>
  )
}
