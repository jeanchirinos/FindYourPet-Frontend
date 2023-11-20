'use client'

import { useEffect, useState } from 'react'
import { Select } from '@/components/Select'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import { Button } from '@/components/Button'
import { CiImageOn } from 'react-icons/ci'
import { getPlaces } from '@/controllers/Place'
import { BreedsData, Category } from '@/models/Pet'

export function PetImage() {
  const [imagePreview, setImagePreview] = useState<null | string>(null)

  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return

    setImagePreview(imagePreview)
  }
  // TODO: Edit photo with square cropper and in modal
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
              required
            />
            <Button className='pointer-events-none w-full'>Editar</Button>
          </label>
        </div>
      )}

      {!imagePreview && (
        <label className='mx-auto flex h-[300px] w-[400px] max-w-full items-center justify-center rounded-md border border-dashed border-neutral-300 bg-neutral-100/30'>
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
            required
          />
        </label>
      )}
    </>
  )
}

export function StatusInfo(props: { statusList: { id: number; value: string }[] }) {
  const { statusList } = props

  return (
    <RadioGroup name='status' defaultValue={statusList[0]?.id.toString()}>
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
