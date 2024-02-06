'use client'

import { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { Button } from '@/components/Button'
import { CiImageOn } from 'react-icons/ci'

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
          <CiImageOn size={28} className='text-neutral-400' />
          <p className='max-w-[25ch] text-balance text-center text-sm leading-tight text-neutral-400'>
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
