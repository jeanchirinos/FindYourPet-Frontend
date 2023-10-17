'use client'
import { updateMobile, updateUser, updateUserImageProfile } from './actions'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'

import { BiSolidCamera } from 'react-icons/bi'
import { useRef, useState } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { useFormAction } from '@/hooks/useFormAction'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { manageActionResponse } from '@/utilities/manageActionResponse'

export function UpdateForm(props: { user: User }) {
  const { user } = props
  const { formAction } = useFormAction(updateUser)

  const updateMobileModal = useModal()

  async function handleMobileFormAction(formData: FormData) {
    const response = await updateMobile(formData)

    manageActionResponse(response, {
      onSuccess() {
        updateMobileModal.open()
      },
      showSuccessToast: false,
    })
  }

  return (
    <>
      <ProfileImage user={user} />
      <form className='flex max-w-[350px] flex-col gap-3' action={formAction}>
        <Input
          type='text'
          label='Nombre'
          isRequired={false}
          defaultValue={user.name ?? ''}
          name='name'
        />
        <Input type='text' label='Usuario' defaultValue={user.username} name='username' />
        <SubmitButton />
      </form>
      <form action={handleMobileFormAction} className='mt-4 flex items-center gap-x-2'>
        <Input
          type='text'
          name='mobile'
          label='Móvil'
          isRequired={false}
          defaultValue={user.mobile ?? ''}
          minLength={9}
          maxLength={9}
          pattern='^9[0-9]{8}$'
        />
        <SubmitButton>Agregar</SubmitButton>
      </form>

      <Modal modal={updateMobileModal}>
        <form className='flex flex-col justify-center gap-y-5 text-center'>
          <section>
            <h2>Se envió un código de verificación a tu número de celular</h2>

            <p>Ingresa el código</p>
          </section>
          <section className='flex justify-around'>
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
            <div className='aspect-square h-10 rounded-full bg-foreground-200' />
          </section>

          <SubmitButton>Confirmar</SubmitButton>
        </form>
      </Modal>
    </>
  )
}

function ProfileImage(props: { user: User }) {
  const { user } = props

  // HOOKS
  const profileImageModal = useModal()

  // REF
  const cropperRef = useRef<CropperRef>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)

  // STATES
  const [imagePreview, setImagePreview] = useState<undefined | string>(undefined)

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return
    // if(file.size > 1024 * 1024 * 2) return

    setImagePreview(imagePreview)
    profileImageModal.open()
  }

  async function formAction(formData: FormData) {
    const image = cropperRef.current?.getCanvas()?.toDataURL()!

    formData.set('image', image)

    const response = await updateUserImageProfile(formData)

    manageActionResponse(response, {
      onSuccess() {
        profileImageModal.close()
      },
    })
  }

  // RENDER
  return (
    <>
      <section className='relative mb-5 aspect-square w-[250px] max-w-full'>
        <Image
          className='rounded-full object-cover'
          src={user.image}
          width={300}
          height={300}
          alt='Perfil'
          priority
        />
        <label className='absolute bottom-5 right-5'>
          <div className='pointer-events-none absolute rounded-full bg-pink-500 p-1 text-2xl text-white'>
            <BiSolidCamera />
          </div>
          <input
            ref={inputImageRef}
            type='file'
            className='aspect-square w-[2rem] opacity-0'
            accept='image/*'
            onChange={handleInputImage}
          />
        </label>
      </section>

      <Modal modal={profileImageModal}>
        <form className='flex flex-col gap-y-2' action={formAction}>
          <section className='relative max-h-[70vh] w-[400px] max-w-full overflow-y-auto'>
            <Cropper src={imagePreview} stencilComponent={CircleStencil} ref={cropperRef} />
          </section>
          <SubmitButton />
        </form>
      </Modal>
    </>
  )
}
