'use client'

import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import { Button } from '@/components/Button'
import { CiImageOn } from 'react-icons/ci'
import { getPlaces } from '@/controllers/Place'
import { BreedsData, Category } from '@/models/Pet'
import { SelectNative } from '@/components/Select/SelectNative'

export function PetImage() {
  const [imagePreview, setImagePreview] = useState<null | string>(null)

  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return setImagePreview(null)

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return

    setImagePreview(imagePreview)
  }
  // TODO: Edit photo with square cropper and in modal
  // TODO: Do not reset file when rejecting file change
  return (
    <label
      className={twJoin(
        'relative mx-auto flex aspect-square size-full max-w-[400px] flex-col items-center justify-center rounded-md border',
        imagePreview
          ? 'border-transparent'
          : 'border-dashed border-foreground-300 bg-foreground-100',
      )}
    >
      {imagePreview ? (
        <>
          <img src={imagePreview} alt='Mascota' className='size-full rounded-md object-cover' />

          <Button className='pointer-events-none mt-2.5 w-full'>Editar</Button>
        </>
      ) : (
        <div className='flex flex-col items-center gap-y-2.5'>
          <CiImageOn size={28} className='text-neutral-500' />
          <p className='max-w-[25ch] text-balance text-center text-xs leading-tight text-neutral-500'>
            Selecciona una imagen o arrástrala aquí
          </p>
        </div>
      )}

      <input
        id='image'
        type='file'
        name='image'
        className='absolute inset-0 opacity-0'
        accept='image/*'
        onChange={handleInputImage}
        required
      />
    </label>
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
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  // RENDER
  return (
    <>
      <SelectNative
        options={categories}
        state={{ selected: selectedCategory, onSelectChange: setSelectedCategory }}
        label='Especie'
      />
      <SelectNative
        options={selectedCategory ? breedsData[selectedCategory] : undefined}
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
  const [selectedDepartamento, setSelectedDepartamento] = useState<undefined | string>(undefined)

  // Provincia
  const provinciasArray = selectedDepartamento ? provincias[selectedDepartamento] : undefined

  const [selectedProvincia, setSelectedProvincia] = useState<undefined | string>(undefined)

  useEffect(() => {
    const provinciaId = provinciasArray?.[0].id_ubigeo

    setSelectedProvincia(provinciaId)
  }, [selectedDepartamento, provinciasArray])

  // Distrito
  const distritosArray = selectedProvincia ? distritos[selectedProvincia] : undefined

  // RENDER
  return (
    <>
      <SelectNative
        name='estate'
        options={departamentos}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        state={{ selected: selectedDepartamento, onSelectChange: setSelectedDepartamento }}
        label='Departamento'
      />
      <SelectNative
        name='city'
        options={provinciasArray}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        state={{ selected: selectedProvincia, onSelectChange: setSelectedProvincia }}
        label='Provincia'
      />

      <SelectNative
        name='district'
        options={distritosArray}
        optionKeyValue='id_ubigeo'
        optionKeyText='nombre_ubigeo'
        label='Distrito'
      />
    </>
  )
}
