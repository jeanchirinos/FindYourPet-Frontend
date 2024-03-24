'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { IconPicture } from '@/icons'

type Props = { initialImage?: string }

export function PetImage(props: Props) {
  const { initialImage = null } = props

  // STATES
  const [imagePreview, setImagePreview] = useState<null | string>(initialImage)

  const inputRef = useRef<HTMLInputElement>(null)

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return setImagePreview(null)

    const MAX_FILE_SIZE = 1048576

    const file = e.target.files[0]
    const newImagePreview = URL.createObjectURL(file)

    if (file.size > MAX_FILE_SIZE) {
      inputRef.current!.value = ''
      setImagePreview(null)
      return toast.error('El peso de la imagen debe ser menor a 1MB')
    }

    if (!file.type.includes('image')) {
      inputRef.current!.value = ''
      setImagePreview(null)
      return toast.error('Selecciona una imagen válida')
    }

    setImagePreview(newImagePreview)
  }

  // TODO: Edit photo with square cropper and in modal
  // TODO: Do not reset file when rejecting file change

  // RENDER
  return (
    <div className='flex w-[400px] max-w-full flex-col md:w-full'>
      <label
        className={cn(
          'relative mx-auto flex aspect-square size-full max-w-[400px] cursor-pointer flex-col items-center justify-center rounded-md border',
          imagePreview
            ? 'border-transparent'
            : 'border-dashed border-foreground-300 bg-foreground-100',
        )}
      >
        {imagePreview ? (
          <img src={imagePreview} alt='Mascota' className='size-full rounded-md object-cover' />
        ) : (
          <div className='flex flex-col items-center gap-y-2.5'>
            <IconPicture size={28} className='text-neutral-400' />
            <p className='max-w-[25ch] text-balance text-center text-sm leading-tight text-neutral-400'>
              Selecciona una imagen o arrástrala aquí
            </p>
          </div>
        )}

        <input
          type='file'
          name='image'
          ref={inputRef}
          className='absolute inset-0 cursor-pointer opacity-0'
          accept='image/*'
          onChange={handleInputImage}
          required={!imagePreview}
        />
      </label>

      {imagePreview && (
        <Button className='mt-2.5' size='sm' onClick={() => inputRef.current?.click()}>
          Editar
        </Button>
      )}
    </div>
  )
}
