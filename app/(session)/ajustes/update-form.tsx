'use client'
import { updateMobile, updateUser, updateUserImageProfile } from './actions'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'

import { BiSolidCamera } from 'react-icons/bi'
import React, { useRef, useState } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'
import { useFormAction } from '@/hooks/useFormAction'
import { SubmitButton } from '@/components/SubmitButton'
import { Modal, useModal } from '@/components/Modal'
import { manageActionResponse } from '@/utilities/manageActionResponse'
import { Button } from '@/components/Button'
import { useSteps } from '@/hooks/useSteps'
import { clientRequest } from '@/utilities/clientRequest'

export function UpdateForm(props: { user: User }) {
  const { user } = props
  const { formAction } = useFormAction(updateUser)

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

function MobileForm(props: { initialMobile: string }) {
  const { initialMobile } = props

  // STATES
  const [currentMobile, setCurrentMobile] = useState(initialMobile)
  const [isEditable, setIsEditable] = useState(false)

  // HOOKS
  const updateMobileModal = useModal()

  const { currentStep, nextStep } = useSteps()

  // FUNCTIONS
  async function handleMobileFormAction(formData: FormData) {
    const response = await updateMobile(formData)

    manageActionResponse(response, {
      onSuccess() {
        nextStep()
      },
      showSuccessToast: false,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (isDisabled) return
    updateMobileModal.open()
  }

  // VALUES
  const isDisabled = initialMobile === currentMobile

  return (
    <>
      <form onSubmit={handleSubmit} className='mt-4 flex items-center gap-x-2'>
        <Input
          type='text'
          name='mobile'
          label='Móvil'
          isRequired={false}
          value={currentMobile}
          minLength={9}
          maxLength={9}
          pattern='^9[0-9]{8}$'
          onChange={e => setCurrentMobile(e.target.value)}
          readOnly={!isEditable}
        />

        {isEditable ? (
          <div className='flex gap-x-1.5'>
            <Button size='sm' isDisabled={isDisabled} type='submit'>
              Guardar
            </Button>
            <Button
              size='sm'
              onClick={() => {
                setIsEditable(false)
                setCurrentMobile(props.initialMobile)
              }}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button size='sm' onClick={() => setIsEditable(true)}>
            Editar
          </Button>
        )}
      </form>

      <Modal modal={updateMobileModal}>
        {currentStep === 1 && (
          <form
            className='flex flex-col justify-center gap-y-5 text-center'
            action={handleMobileFormAction}
          >
            <input type='hidden' name='mobile' value={currentMobile} />
            <h2 className='max-w-[30ch]'>
              Se enviará un código de verificación a tu número de celular
            </h2>

            <div className='flex justify-center gap-x-2'>
              <Button onClick={updateMobileModal.close}>Cancelar</Button>
              <SubmitButton>Confirmar</SubmitButton>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form
            className='flex flex-col justify-center gap-y-5 text-center'
            action={handleMobileFormAction}
          >
            <h2 className='max-w-[30ch]'>
              Ingrese el código de verificación que se envió a su número de celular
            </h2>

            <section id='form_codes' className='flex justify-around'>
              <CodeInput />
              <CodeInput />
              <CodeInput />
              <CodeInput />
              <CodeInput />
              <CodeInput />
            </section>

            <Button onClick={updateMobileModal.close}>Cerrar</Button>
          </form>
        )}

        <></>
      </Modal>
    </>
  )
}

function CodeInput() {
  return (
    <input
      className='aspect-square h-10 rounded-full bg-foreground-200 text-center'
      maxLength={1}
      onChange={async e => {
        const form = document.getElementById('form_codes')!
        const inputs = Array.from(form.getElementsByTagName('input'))

        const currInputIndex = inputs.indexOf(e.currentTarget)

        const code = inputs.map(input => input.value).join('')

        if (e.currentTarget === inputs.at(-1)) {
          const response = await clientRequest('verify-mobile', { method: 'POST', body: { code } })

          if (response.status === 'success') {
            alert('Success')
          } else {
            alert('Error')
          }
        }

        const value = e.currentTarget.value

        if (value) {
          const newIndex = e.currentTarget.value ? currInputIndex + 1 : currInputIndex - 1

          const input = inputs[newIndex]
          input?.focus()
        }
      }}
      onKeyDown={e => {
        if (!e.currentTarget.value && e.key === 'Backspace') {
          const form = document.getElementById('form_codes')!
          const inputs = Array.from(form.getElementsByTagName('input'))

          const currInputIndex = inputs.indexOf(e.currentTarget)

          const newIndex = currInputIndex - 1
          const input = inputs[newIndex]
          input?.focus()
        }
      }}
    />
  )
}
