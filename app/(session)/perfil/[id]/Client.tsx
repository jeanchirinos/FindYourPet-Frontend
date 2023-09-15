'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import Image from 'next/image'
import { BiSolidCamera } from 'react-icons/bi'
import { HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi'
import { useRef, useState, useEffect } from 'react'

import { CropperRef, Cropper, CircleStencil } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import { User } from './page'
import { SetState } from '@/types'
import { useUpdateUser, useUser } from '@/services/user'
import { useRouter, useParams } from 'next/navigation'

export function Client(props: { user: User | undefined }) {
  const params = useParams()

  const { user } = useUser({ id: params.id as string, initialData: props.user! })
  const { email, image, isUser, mobile, name, username } = user || {}

  // useEffect(() => {
  //   mutate()
  // }, [params, mutate])

  // REF
  const cropperRef = useRef<CropperRef>(null)

  // STATES
  const [isEditable, setIsEditable] = useState(false)
  const [isImageEditable, setIsImageEditable] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  // FUNCTIONS

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
    // const canvas = cropperRef.current?.getCanvas()?.toDataURL()

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
              src={image}
              width='600'
              height='600'
              alt='Lechonk aesthetic'
            />

            {isUser && (
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
            )}
          </>
        )}
      </section>
      {!isEditable && (
        <section className='flex flex-col gap-3'>
          <div>
            <div className='text-center'>
              <h1 className='text-2xl font-bold leading-none'>{name}</h1>
              <span>{params.id}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineMail />
              <span>Correo: {email}</span>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineDeviceMobile />
              <span>Celular: {mobile}</span>
            </div>
          </div>
          {props.user?.isUser && (
            <Button className='bg-primary text-white' onPress={() => setIsEditable(true)}>
              Editar
            </Button>
          )}
        </section>
      )}

      {isEditable && <EditableForm user={user} setIsEditable={setIsEditable} />}
    </div>
  )
}

// user/update

function EditableForm(props: { user: User | undefined; setIsEditable: SetState<boolean> }) {
  const { setIsEditable, user } = props

  const { trigger, isMutating } = useUpdateUser(user!.username)

  const [editableUser, setEditableUser] = useState<Partial<User> | undefined>(user)

  const router = useRouter()

  // FUNCTIONS
  function handleCancel() {
    setIsEditable(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    trigger(editableUser!, {
      onSuccess() {
        setIsEditable(false)
        router.replace(`/perfil/${editableUser?.username}`)
      },
      // revalidate: false,
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setEditableUser(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <Input
          type='text'
          label='Nombre'
          isRequired={false}
          value={editableUser?.name}
          name='name'
          onChange={handleChange}
        />
        <Input
          type='text'
          label='Usuario'
          value={editableUser?.username}
          name='username'
          onChange={handleChange}
        />
        {/* <Input type="text" label="Correo" isRequired={false}/> */}
        <Input
          type='text'
          label='Móvil'
          isRequired={false}
          value={editableUser?.mobile}
          name='mobile'
          onChange={handleChange}
        />
        <div className='flex w-full gap-2 child:w-1/2'>
          <Button type='button' onPress={handleCancel}>
            Cancelar
          </Button>
          <Button type='submit' className='bg-primary text-white' safeIsLoading={isMutating}>
            Guardar
          </Button>
        </div>
      </form>
    </section>
  )
}
