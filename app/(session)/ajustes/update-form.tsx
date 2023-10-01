'use client'
import { updateUser, updateUserImageProfile } from './actions'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'

import { BiSolidCamera } from 'react-icons/bi'
import { useRef, useState } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { useActionToast } from '@/hooks/useActionToast'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'

export function UpdateForm(props: { user: User }) {
  const { user } = props
  const { formAction } = useActionToast(updateUser)

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
        <Input
          type='text'
          label='Móvil'
          isRequired={false}
          defaultValue={user.mobile ?? ''}
          name='mobile'
          minLength={9}
          maxLength={9}
          pattern='^9[0-9]{8}$'
        />
        <SubmitButton />
      </form>
    </>
  )
}

function ProfileImage(props: { user: User }) {
  const { user } = props

  const profileImageModal = useModal()

  // REF
  const cropperRef = useRef<CropperRef>(null)
  const inputImageRef = useRef<HTMLInputElement>(null)

  const [imagePreview, setImagePreview] = useState<undefined | string>(undefined)
  const [dataImage, setDataImage] = useState<undefined | string>('')

  const { formAction } = useActionToast(updateUserImageProfile, {
    onSuccess() {
      profileImageModal.close()
    },
  })

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

      <Modal
        modal={profileImageModal}
        onExitComplete={() => {
          const inputImage = inputImageRef.current

          if (!inputImage) return

          inputImageRef.current.value = ''
        }}
      >
        <form className='flex flex-col gap-y-2' action={formAction}>
          <input type='text' name='image' hidden value={dataImage} readOnly />
          <section className='relative max-h-[70vh] w-[400px] max-w-full overflow-y-auto'>
            <Cropper
              src={imagePreview}
              // src={user.image}
              // backgroundClassName='!w-full !h-auto'
              // boundaryClassName='max-w-full w-[500px]'
              stencilComponent={CircleStencil}
              ref={cropperRef}
            />

            {/* <div className='h-[1000px] w-[100px]' /> */}
          </section>
          <SubmitButton
            onPress={() => setDataImage(cropperRef.current?.getCanvas()?.toDataURL())}
          />
        </form>
      </Modal>
    </>
  )
}
