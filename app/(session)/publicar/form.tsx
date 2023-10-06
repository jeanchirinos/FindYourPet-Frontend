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
      {/* <section className='h-[200px] w-[300px] rounded-md bg-neutral-200 ' /> */}
      <form action={formAction} className='flex flex-col gap-y-3'>
        <input type='file' name='image' required />
        <Status />
        <Textarea
          label='Descripción'
          isRequired
          name='description'
          className='w-[400px] max-w-full'
          // value={currentCategory.image}
        />
        <Input label='Ubicación' isRequired={false} name='location' />
        {/* <ComboboxComponent array={departamentos} objectKey='nombre_ubigeo' objectId='id_ubigeo' /> */}
        {/* <ListBox array={departamentos} objectKey='nombre_ubigeo' 
        objectId='id_ubigeo' /> */}
        {props.children}
        <input type='text' hidden readOnly value='Lima' name='estate' />
        <input type='text' hidden readOnly value='Lima' name='city' />
        <input type='text' hidden readOnly value='Lince' name='district' />

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
  const { categories } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState<Selection>(
    new Set([categories[0].id.toString()]),
  )

  const [breeds, setBreeds] = useState<BreedsData['breeds']>([])
  const [selectedBreed, setSelectedBreed] = useState<Selection>(new Set([]))

  // EFFECTS
  useEffect(() => {
    async function getBreeds() {
      if (typeof selectedCategory !== 'object') return

      const categoryId = Array.from(selectedCategory)[0]

      const response = await request<BreedsData>(`breedList/${categoryId}`)

      setBreeds(response.breeds)
    }

    getBreeds()
  }, [selectedCategory])

  useEffect(() => {
    if (!breeds.length) return

    const breedId = breeds[0].id.toString()

    setSelectedBreed(new Set([breedId]))
  }, [breeds])

  // RENDER
  return (
    <>
      <Select
        label='Especie'
        selected={selectedCategory}
        setSelected={setSelectedCategory}
        array={categories}
        objectKey='name'
        objectId='id'
      />

      <Select
        label='Raza'
        selected={selectedBreed}
        setSelected={setSelectedBreed}
        array={breeds}
        objectKey='name'
        objectId='id'
        name='breed_id'
      />
    </>
  )
}
