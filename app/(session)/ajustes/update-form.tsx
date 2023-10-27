'use client'
import {
  updateName,
  updateUserImageProfile,
  updateUsername,
} from '../../../src/serverActions/profile'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'

import { BiSolidCamera } from 'react-icons/bi'
import React, { useRef, useState } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { manageActionResponse } from '@/utilities/manageActionResponse'
import { MobileForm } from './update-mobile'
import { Button } from '@/components/Button'

export function UpdateForm(props: { user: User }) {
  const { user } = props

  return (
    <>
      <ProfileImage user={user} />

      <NameForm initialName={user.name ?? ''} />
      <UsernameForm initialUsername={user.username} />
      <MobileForm initialMobile={user.mobile ?? ''} />
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

    const res = await updateUserImageProfile(formData)

    manageActionResponse(res, {
      onSuccess() {
        profileImageModal.close()
      },
      showSuccessToast: true,
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

function NameForm(props: { initialName: string }) {
  const { initialName = '' } = props

  // STATES
  const [currentName, setCurrentName] = useState(initialName)
  const [nameIsEditable, setNameIsEditable] = useState(false)

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    if (isDisabled) return

    const name = formData.get('name') as string

    const res = await updateName({ name })

    manageActionResponse(res, {
      showSuccessToast: true,
    })
  }

  // VALUES
  const isDisabled = initialName === currentName

  // RENDER
  return (
    <>
      <form action={handleAction} className='mt-4 flex items-center gap-x-2'>
        <Input
          type='text'
          name='name'
          label='Nombre'
          value={currentName}
          onChange={e => setCurrentName(e.target.value)}
          readOnly={!nameIsEditable}
        />

        {nameIsEditable ? (
          <div className='flex gap-x-1.5'>
            <SubmitButton size='sm' isDisabled={isDisabled} />

            <Button
              size='sm'
              onClick={() => {
                setNameIsEditable(false)
                setCurrentName(props.initialName)
              }}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button size='sm' onClick={() => setNameIsEditable(true)}>
            Editar
          </Button>
        )}
      </form>
    </>
  )
}

function UsernameForm(props: { initialUsername: string }) {
  const { initialUsername = '' } = props

  // STATES
  const [currentUsername, setCurrentUsername] = useState(initialUsername)
  const [usernameIsEditable, setUsernameIsEditable] = useState(false)

  // FUNCTIONS
  async function handleAction(formData: FormData) {
    if (isDisabled) return

    const username = formData.get('username') as string

    const res = await updateUsername({ username })

    manageActionResponse(res, {
      showSuccessToast: true,
    })
  }

  // VALUES
  const isDisabled = initialUsername === currentUsername

  // RENDER
  return (
    <>
      <form action={handleAction} className='mt-4 flex items-center gap-x-2'>
        <Input
          type='text'
          name='username'
          label='Usuario'
          value={currentUsername}
          onChange={e => setCurrentUsername(e.target.value)}
          readOnly={!usernameIsEditable}
        />

        {usernameIsEditable ? (
          <div className='flex gap-x-1.5'>
            <SubmitButton size='sm' isDisabled={isDisabled} />
            <Button
              size='sm'
              onClick={() => {
                setUsernameIsEditable(false)
                setCurrentUsername(props.initialUsername)
              }}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button size='sm' onClick={() => setUsernameIsEditable(true)}>
            Editar
          </Button>
        )}
      </form>
    </>
  )
}
