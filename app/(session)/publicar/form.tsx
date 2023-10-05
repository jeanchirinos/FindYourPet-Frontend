'use client'

import { Input } from '@/components/Input'
import { useActionToast } from '@/hooks/useActionToast'
import { createPet } from '@/serverActions/pet'

import { RadioGroup } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { twJoin } from 'tailwind-merge'
import { Selection, Textarea } from '@nextui-org/react'
import { SubmitButton } from '@/components/SubmitButton'
import { Category } from '@/services/category'
import { request } from '@/utilities/utilities'
import { BreedsData } from '@/services/breed'
import { Select } from '@/components/Select'

export function Form(props: React.PropsWithChildren) {
  const { formAction } = useActionToast(createPet)

  // console.log({ distritos: distritos['2563'] })

  return (
    <div className='flex gap-4 max-md:flex-col'>
      <section className='h-[200px] w-[300px] rounded-md bg-neutral-200 ' />
      <form action={formAction} className='flex flex-col gap-y-3'>
        <Status />
        <Textarea
          label='Descripción'
          required
          name='description'
          className='w-[400px] max-w-full'
          // value={currentCategory.image}
        />
        <Input label='Ubicación' isRequired={false} name='' />
        {/* <ComboboxComponent array={departamentos} objectKey='nombre_ubigeo' objectId='id_ubigeo' /> */}
        {/* <ListBox array={departamentos} objectKey='nombre_ubigeo' 
        objectId='id_ubigeo' /> */}
        {props.children}

        <SubmitButton>Publicar</SubmitButton>
      </form>
    </div>
  )
}

const status = [
  {
    id: 1,
    value: 'Se Busca',
  },
  {
    id: 2,
    value: 'Perdido',
  },
  {
    id: 3,
    value: 'En adopción',
  },
]

function Status() {
  const [selected, setSelected] = useState(status[0])

  return (
    <>
      <input type='text' name='status' hidden value={selected.id} readOnly />
      <RadioGroup value={selected} onChange={setSelected}>
        <div className='flex gap-2 max-sm:flex-col'>
          {status.map(item => (
            <RadioGroup.Option
              key={item.id}
              value={item}
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
    </>
  )
}

export function PetInfo(props: { categories: Category[] }) {
  // const [selected, setSelected] = useState(props.categories[0])

  const convertedCategories = props.categories.map(category => ({
    ...category,
    id: category.id.toString(),
  }))

  const [selected, setSelected] = useState<Selection>(new Set([convertedCategories[0].id]))
  const [selectedBreed, setSelectedBreed] = useState<BreedsData['breeds'][0] | undefined>(undefined)

  const [breeds, setBreeds] = useState<BreedsData['breeds'] | undefined>(undefined)

  useEffect(() => {
    async function getBreeds() {
      //@ts-ignore
      const response = await request<BreedsData>(`breedList/${selected.values().next().value}`)

      setBreeds(response.breeds)
    }

    getBreeds()
  }, [selected])

  useEffect(() => {
    if (!breeds) return

    setSelectedBreed(breeds[0])
  }, [breeds])

  // const convertedBreeds = props.categories.map(category => ({
  //   ...category,
  //   id: category.id.toString(),
  // }))

  return (
    <>
      {/* <ListBox
        selected={selected}
        setSelected={setSelected}
        array={props.categories}
        objectKey='name'
        objectId='id'
      /> */}
      <Select
        label='Especie'
        selected={selected}
        setSelected={setSelected}
        array={convertedCategories}
        objectKey='name'
        objectId='id'
      />

      {/* <Select
        selected={selectedBreed}
        setSelected={setSelectedBreed}
        array={convertedCategories}
        objectKey='name'
        objectId='id'
      /> */}

      {/* <ListBox
        selected={selectedBreed}
        setSelected={setSelectedBreed}
        array={breeds ?? []}
        objectKey='name'
        objectId='id'
      /> */}
    </>
  )
}
