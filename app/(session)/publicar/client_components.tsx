'use client'

import { BreedsData } from '@/services/breed'
import { Category } from '@/services/category'
import { request } from '@/utilities/utilities'
import { useEffect, useState } from 'react'
import { SelectNative } from '@/components/Select'
import departamentos from '@/data/departamentos.json'
import provincias from '@/data/provincias.json'
import distritos from '@/data/distritos.json'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'

export function PetInfo(props: { categories: Category[] }) {
  const { categories } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)

  const [breeds, setBreeds] = useState<BreedsData['breeds']>([])

  // EFFECTS
  useEffect(() => {
    async function getBreeds() {
      const response = await request<BreedsData>(`breedList/${selectedCategory}`)

      setBreeds(response.breeds)
    }

    getBreeds()
  }, [selectedCategory])

  // RENDER
  return (
    <>
      <SelectNative
        selected={selectedCategory}
        setSelected={setSelectedCategory}
        array={categories}
        objectKey='name'
        objectId='id'
      />

      <SelectNative array={breeds} objectKey='name' objectId='id' name='breed_id' />
    </>
  )
}

export function Place() {
  // Departamento
  const [selectedDepartamento, setSelectedDepartamento] = useState(
    departamentos[0].id_ubigeo as keyof typeof provincias,
  )

  // Provincia
  const provinciasArray = provincias[selectedDepartamento]

  const [selectedProvincia, setSelectedProvincia] = useState(
    provinciasArray[0].id_ubigeo as keyof typeof distritos,
  )

  useEffect(() => {
    const provinciaId = provinciasArray[0].id_ubigeo as keyof typeof distritos

    setSelectedProvincia(provinciaId)
  }, [selectedDepartamento, provinciasArray])

  // Distrito
  const distritosArray = distritos[selectedProvincia]

  // RENDER
  return (
    <>
      <SelectNative
        name='estate'
        array={departamentos}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
        setSelected={setSelectedDepartamento}
      />
      <SelectNative
        name='city'
        array={provinciasArray}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
        setSelected={setSelectedProvincia}
      />

      <SelectNative
        name='district'
        array={distritosArray}
        objectId='id_ubigeo'
        objectKey='nombre_ubigeo'
      />
    </>
  )
}

export function StatusInfo(props: { statusList: { id: number; value: string }[] }) {
  const { statusList } = props

  return (
    <RadioGroup name='status' defaultValue={statusList[0].id.toString()}>
      <div className='flex gap-2 max-sm:flex-col'>
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
            <RadioGroup.Label as='p'>{item.value}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
