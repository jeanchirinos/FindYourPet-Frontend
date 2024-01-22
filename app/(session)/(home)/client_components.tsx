'use client'
import { useEffect, useState } from 'react'
import { Select } from '@/components/Select'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import { getPlaces } from '@/controllers/Place'
import { BreedsData, Category, StatusList } from '@/models/Pet'
import { useRouter, useSearchParams } from 'next/navigation'

export function StatusInfo(props: { statusList: StatusList }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(status: string) {
    const newSearchParams = new URLSearchParams({ status, page: '1' })

    router.replace('?' + newSearchParams.toString())
  }

  const defaultValue = searchParams.get('status') ?? '1'

  return (
    <RadioGroup name='status' defaultValue={defaultValue} onChange={handleChange}>
      <div className='flex flex-col gap-y-2'>
        {props.statusList.map(item => (
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
            <RadioGroup.Label className='w-max'>{item.value}</RadioGroup.Label>
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
        options={categories}
        optionKeyText='name'
        optionKeyValue='id'
        label='Especie'
      />
      <Select
        options={breedsData[selectedCategory]}
        optionKeyText='name'
        optionKeyValue='id'
        name='breed_id'
        label='Raza'
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
        options={departamentos}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        setSelected={setSelectedDepartamento}
        label='Departamento'
      />
      <Select
        name='city'
        options={provinciasArray}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        setSelected={setSelectedProvincia}
        label='Provincia'
      />

      <Select
        name='district'
        options={distritosArray}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        label='Distrito'
      />
    </>
  )
}
