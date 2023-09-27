'use client'

import {
  //@ts-ignore
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'
import { updateUser, updateUserImage } from './actions'
import { Input } from '@/components/Input'
import { User } from '../perfil/[id]/page'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'

import { BiSolidCamera } from 'react-icons/bi'
import { useRef, useState, useEffect } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import Image from 'next/image'

const initialState = {
  status: null,
  msg: null,
}

export function UpdateForm(props: { user: User }) {
  const { user } = props
  const [state, formAction] = useFormState(updateUser, initialState)

  useEffect(() => {
    if (!state.status) return
    // @ts-ignore
    toast[state.status](state.msg)
  }, [state])

  return (
    <>
      <ProfileImage user={user} />
      <form className='flex max-w-[350px] flex-col gap-3' action={formAction}>
        <Input type='text' label='Nombre' isRequired={false} defaultValue={user.name} name='name' />
        <Input type='text' label='Usuario' defaultValue={user.username} name='username' required />
        <Input
          type='text'
          label='Móvil'
          isRequired={false}
          defaultValue={user.mobile}
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

function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className='bg-primary text-white disabled:bg-gray-500'
      {...props}
    >
      {pending ? 'Updating' : 'Update'}
    </Button>
  )
}

function ProfileImage(props: { user: User }) {
  const { user } = props

  const [state, formAction] = useFormState(updateUserImage, initialState)

  useEffect(() => {
    if (!state.status) return
    // @ts-ignore
    toast[state.status](state.msg)

    if (state.status === 'success') {
      setImagePreview(undefined)
    }
  }, [state])

  // REF
  const cropperRef = useRef<CropperRef>(null)

  const [imagePreview, setImagePreview] = useState<undefined | string>('')
  const [dataImage, setDataImage] = useState<undefined | string>('')

  // FUNCTIONS
  function handleInputImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return

    const file = e.target.files[0]
    const imagePreview = URL.createObjectURL(file)

    if (!file) return
    if (!file.type.includes('image')) return
    // if(file.size > 1024 * 1024 * 2) return

    setImagePreview(imagePreview)
  }

  // RENDER
  return (
    <section className='relative mb-5 aspect-square w-[250px] max-w-full'>
      {imagePreview ? (
        <form className='flex flex-col gap-y-2' action={formAction}>
          <input type='text' name='image' hidden value={dataImage} readOnly />
          <Cropper
            src={imagePreview}
            className='cropper'
            stencilComponent={CircleStencil}
            ref={cropperRef}
          />
          <footer className='flex gap-x-2 child:flex-grow'>
            <Button onPress={() => setImagePreview(undefined)}>Cancelar</Button>
            <SubmitButton
              onPress={() => setDataImage(cropperRef.current?.getCanvas()?.toDataURL())}
            />
          </footer>
        </form>
      ) : (
        <>
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
              type='file'
              className='aspect-square w-[2rem] opacity-0'
              accept='image/*'
              onChange={handleInputImage}
            />
          </label>
        </>
      )}
    </section>
  )
}
