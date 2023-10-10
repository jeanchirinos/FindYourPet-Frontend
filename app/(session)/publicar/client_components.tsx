'use client'

import { BreedsData } from '@/services/breed'
import { Category } from '@/services/category'
import { useEffect, useState } from 'react'
import { SelectNative } from '@/components/Select'
import departamentos from '@/data/departamentos.json'
import provincias from '@/data/provincias.json'
import distritos from '@/data/distritos.json'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import useSWR from 'swr'
import { Button } from '@/components/Button'
import { CiImageOn } from 'react-icons/ci'

export function PetImage() {
  const [imagePreview, setImagePreview] = useState<null | string>(null)

  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return
    // if(file.size > 1024 * 1024 * 2) return

    // how to get file dimensions

    setImagePreview(imagePreview)
  }

  return (
    <>
      {imagePreview && (
        <div className='mx-auto flex w-[400px] max-w-full flex-col gap-y-3'>
          <img src={imagePreview} alt='Mascota' className='max-h-[250px] self-center rounded-md' />
          <label className='relative flex cursor-pointer justify-center overflow-hidden'>
            <input
              type='file'
              name='image'
              className='absolute z-10 opacity-0'
              accept='image/*'
              onChange={handleInputImage}
            />
            <Button className='pointer-events-none w-full'>Editar</Button>
          </label>
        </div>
      )}
      {!imagePreview && (
        <label className='flex h-[300px] w-[400px] items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-100/30'>
          <div className='flex flex-col items-center gap-y-2.5'>
            <CiImageOn size={28} className='text-neutral-500' />
            <p className='max-w-[25ch] text-center text-xs leading-tight text-neutral-500 text-balance'>
              Selecciona una imagen o arrástrala aquí
            </p>
          </div>
          <input
            type='file'
            name='image'
            className='absolute opacity-0'
            accept='image/*'
            onChange={handleInputImage}
          />
        </label>
      )}
    </>
  )
}

export function PetInfo(props: { categories: Category[] }) {
  const { categories } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id)
  const { data } = useSWR<BreedsData>(`breedList/${selectedCategory}`)

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

      <SelectNative array={data?.breeds} objectKey='name' objectId='id' name='breed_id' />
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
