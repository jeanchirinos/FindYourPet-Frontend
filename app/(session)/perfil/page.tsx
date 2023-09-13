'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Image from 'next/image'
import { BiSolidCamera } from 'react-icons/bi'
import { HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi'
import { useRef, useState } from 'react'
import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'

export default function Page() {
  // REF
  const cropperRef = useRef<CropperRef>(null)

  // STATES
  const [isEditable, setIsEditable] = useState(false)
  const [isImageEditable, setIsImageEditable] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  // FUNCTIONS
  function handleCancel() {
    setIsEditable(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsEditable(false)
  }

  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]

    if (file) {
      setIsImageEditable(true)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function submitUpdateImage(e: React.FormEvent) {
    e.preventDefault()
    const canvas = cropperRef.current?.getCanvas()?.toDataURL()

    // if (!canvas) return
    // TODO: Send image to server
  }

  // RENDER
  return (
    <div className='mx-auto w-[400px] max-w-full space-y-3'>
      <section className='relative mx-auto aspect-square w-[250px] max-w-full'>
        {isImageEditable ? (
          <form className='flex flex-col gap-y-2' onSubmit={submitUpdateImage}>
            <Cropper
              src={imagePreview}
              className='cropper'
              stencilComponent={CircleStencil}
              ref={cropperRef}
            />
            <Button type='submit' className='bg-primary text-white'>
              Guardar
            </Button>
          </form>
        ) : (
          <>
            <Image
              className='rounded-full object-cover'
              src='https://api-encuentratumascota.nijui.com/users/1/profile.webp'
              width='600'
              height='600'
              alt='Lechonk aesthetic'
            />

            <label className='absolute bottom-5 right-5 cursor-pointer'>
              <div className='rounded-full bg-pink-500 p-1 text-2xl text-white'>
                <BiSolidCamera />
              </div>
              <input
                type='file'
                className='invisible absolute'
                accept='image/*'
                onChange={handleInputImage}
              />
            </label>
          </>
        )}
      </section>
      {!isEditable && (
        <section className='flex flex-col gap-3'>
          <div>
            <div className='text-center'>
              <h1 className='text-2xl font-bold leading-none'>name</h1>
              <span>username</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineMail />
              <span>Correo: email</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineDeviceMobile />
              <span>Celular: mobile</span>
            </div>
          </div>
          <Button className='bg-primary text-white' onPress={() => setIsEditable(true)}>
            Editar
          </Button>
        </section>
      )}

      {isEditable && (
        <section>
          <form action='' className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <Input type='text' label='Nombre' isRequired={false} />
            <Input type='text' label='Usuario' />
            {/* <Input type="text" label="Correo" isRequired={false}/> */}
            <Input type='text' label='Móvil' isRequired={false} />
            <div className='flex w-full gap-2 child:w-1/2'>
              <Button type='button' onPress={handleCancel}>
                Cancelar
              </Button>
              <Button type='submit' className='bg-primary text-white'>
                Guardar
              </Button>
            </div>
          </form>
        </section>
      )}
    </div>
  )
}
